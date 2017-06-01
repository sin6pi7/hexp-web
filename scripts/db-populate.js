const Sequelize = require('sequelize');
const createModels = require('../lib/api/models');
const MOVIES = [].concat(
  require('../data/movies_base_data[2017-05-31-03-17-13].json'),
  require('../data/movies_base_data[2017-06-01-11-29-51].json')
);

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
        plot_desc, // description
        epoch, // region
        cc, // country codes
        plot_desc_tags, // tags
      }) => {
        return models.movie.create({
          title,
          description: plot_desc,
          release_date,
          poster,
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
          ]);
        });
      })
    );
  })
  .catch(console.error);
