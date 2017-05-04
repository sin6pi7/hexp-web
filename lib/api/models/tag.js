const { STRING } = require('sequelize');

module.exports = (db) => {
  return db.define(
    'tag',
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
            tag,
            movie_votable
          } = models;

          tag.belongsToMany(movie, {
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