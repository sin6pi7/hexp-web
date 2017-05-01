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
            movie_tag
          } = models;

          tag.belongsToMany(movie, { through: movie_tag });
        }
      }
    }
  );
};