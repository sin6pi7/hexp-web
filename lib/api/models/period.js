const { STRING } = require('sequelize');

module.exports = (db) => {
  return db.define(
    'period',
    {
      name: {
        type: STRING,
        unique: true,
      },
    },
    {
      classMethods: {
        associate: (models) => {
          const {
            movie,
            period,
            movie_votable
          } = models;

          period.belongsToMany(movie, {
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