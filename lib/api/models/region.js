const { STRING } = require('sequelize');

module.exports = (db) => {
  return db.define(
    'region',
    {
      code: {
        type: STRING,
        unique: true,
      },
    },
    {
      classMethods: {
        associate: (models) => {
          const {
            movie,
            region,
            movie_votable
          } = models;

          region.belongsToMany(movie, {
            through: {
              model: movie_votable,
              unique: false,
            },
            foreignKey: 'votableId',
            constraints: false,
          });
        }
      }
    }
  );
};