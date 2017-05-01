const { STRING } = require('sequelize');

module.exports = (db) => {
  return db.define(
    'movie_image',
    {
      url: STRING,
    }
  );
};