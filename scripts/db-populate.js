const Sequelize = require('sequelize');
const createModels = require('../lib/api/models');
const MOVIES = require('../data/movies_base_data[2017-06-01-12-29-41].json');

require('dotenv').load();
const db = new Sequelize(process.env.DATABASE_URI);
const models = createModels(db);

db
  .sync({ force: true })
  .then(() => {
    return Promise.all(
      MOVIES.map(({
        release_date,
        title,
        poster,
        producer,
        cast,
        director,
        plot_desc, // description
        epoch, // region
        cc, // country codes
        plot_desc_tags, // tags
        images,
        tmdb_id,
      }) => {
        return models.movie.create({
          title,
          producer,
          cast,
          director,
          description: plot_desc,
          release_date,
          poster,
          tmdb_id,
        }).then((movie) => {
          const addPeriodToMovie = (name, movie) => {
            return models.period.findOrCreate({
              where: {
                name,
              },
            }).then(([period]) => movie.addPeriod(period));
          };
          const createAddRegionToMovie = (movie) => {
            return (code) => {
              return models.region.findOrCreate({
                where: {
                  code,
                },
              }).then(([region]) => movie.addRegion(region));
            };
          };
          const createAddTagToMovie = (movie) => {
            return (name) => {
              return models.tag.findOrCreate({
                where: {
                  name,
                },
              }).then(([tag]) => movie.addTag(tag));
            };
          };
          const createAddImageToMovie = (movie) => {
            return (url) => {
              return models.movie_image.create({
                url,
              }).then((image) => movie.addImage(image));
            };
          };
          return Promise.all([
            epoch
              ? addPeriodToMovie(epoch, movie)
              : Promise.resolve(),
            cc && cc.length > 0
              ? Promise.all(cc.map(createAddRegionToMovie(movie)))
              : Promise.resolve(),
            plot_desc_tags && plot_desc_tags.length > 0
              ? Promise.all(plot_desc_tags.map(createAddTagToMovie(movie)))
              : Promise.resolve(),
            images && images.length > 0
              ? Promise.all(images.map(createAddImageToMovie(movie)))
              : Promise.resolve(),
          ]);
        });
      })
    );
  })
  .catch(console.error);
