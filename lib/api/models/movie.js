const { STRING, TEXT, INTEGER, DATE } = require('sequelize');
const { VOTABLE_TYPES: { PERIOD, TAG, REGION } } = require('./movie_votable');


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
      paranoid: true,
      classMethods: {
        associate: (models) => {
          const {
            movie,
            movie_image,
            tag,
            period,
            region,
            movie_votable,
          } = models;

          movie.hasMany(movie_image);
          movie.belongsToMany(tag, {
            through: {
              model: movie_votable,
              unique: false,
              scope: {
                votableType: TAG,
              },
            },

            foreignKey: 'movieId',
            constraints: false,
          });
          movie.belongsToMany(period, {
            through: {
              model: movie_votable,
              unique: false,
              scope: {
                votableType: PERIOD,
              },
            },
            foreignKey: 'movieId',
            constraints: false,
          });
          movie.belongsToMany(region, {
            through: {
              model: movie_votable,
              unique: false,
              scope: {
                votableType: REGION,
              },
            },
            foreignKey: 'movieId',
            constraints: false,
          });
        }
      },
    }
  );
};