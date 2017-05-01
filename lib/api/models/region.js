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
            movie_region
          } = models;

          region.belongsToMany(movie, { through: movie_region });
        }
      }
    }
  );
};