const { INTEGER } = require('sequelize');

module.exports = (db) => {
  return db.define(
    'movie_region',
    {
      score: {
        type: INTEGER,
        defaultValue: 1,
      },
    }
  );
};