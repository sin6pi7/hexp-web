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
            movie_period
          } = models;

          period.belongsToMany(movie, { through: movie_period });
        }
      }
    }
  );
};