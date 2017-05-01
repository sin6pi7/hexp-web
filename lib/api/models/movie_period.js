const { INTEGER } = require('sequelize');

module.exports = (db) => {
  return db.define(
    'movie_period',
    {
      score: {
        type: INTEGER,
        defaultValue: 1,
      },
    }
  );
};