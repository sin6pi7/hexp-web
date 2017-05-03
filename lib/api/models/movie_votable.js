const { INTEGER, STRING, ENUM } = require('sequelize');

const VOTABLE_TYPES = {
  TAG: 'tag',
  PERIOD: 'period',
  REGION: 'region',
};

module.exports = (db) => {
  return db.define(
    'movie_votable',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      movieId: {
        type: INTEGER,
        unique: 'movie_votable',
      },
      votableType: {
        type: ENUM(
          VOTABLE_TYPES.PERIOD,
          VOTABLE_TYPES.REGION,
          VOTABLE_TYPES.TAG
        ),
        allowNull: false,
        unique: 'movie_votable',
      },
      votableId: {
        type: INTEGER,
        unique: 'movie_votable',
        references: null,
      },
      score: {
        type: INTEGER,
        defaultValue: 1,
      },
    }
  );
};
module.exports.VOTABLE_TYPES = VOTABLE_TYPES;