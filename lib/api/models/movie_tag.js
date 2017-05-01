const { INTEGER } = require('sequelize');

module.exports = (db) => {
  return db.define(
    'movie_tag',
    {
      score: {
        type: INTEGER,
        defaultValue: 1,
      },
    }
  );
};