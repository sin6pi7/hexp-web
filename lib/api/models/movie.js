const { STRING, TEXT, INTEGER, DATE } = require('sequelize');

module.exports = (db) => {
  return db.define(
    'movie',
    {
      title: STRING,
      description: TEXT,
      release_date: DATE,
      producer: STRING,
      director: STRING,
      cast: STRING,
      country: STRING,
      poster: TEXT,
      trailer: TEXT,
    },
    {
      classMethods: {
        associate: (models) => {
          const {
            movie,
            movie_image,
            tag,
            movie_tag,
            period,
            movie_period,
            region,
            movie_region,
          } = models;

          movie.hasMany(movie_image);
          movie.belongsToMany(tag, { through: movie_tag });
          movie.belongsToMany(period, { through: movie_period });
          movie.belongsToMany(region, { through: movie_region });
        }
      },
    }
  );
};