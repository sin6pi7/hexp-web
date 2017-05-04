const { Router } = require('express');
const { VOTABLE_TYPES } = require('../models/movie_votable');

const ACTION_TYPES = [
  'upvote',
  'downvote',
];
const MAX_LIMIT = 100;

const knownVotableType = (votableType) => Object.keys(VOTABLE_TYPES).find((k) => VOTABLE_TYPES[k] === votableType);

module.exports = (models) => {
  const router = Router();

  router.get('/', (req, res, next) => {
    const {
      query: {
        movieId,
        votableType,
        page,
        limit,
        }
      } = req;

    const options = {
      where: {},
    };

    if (movieId) {
      options.where.movieId = movieId;
    }
    if (votableType && knownVotableType(votableType)) {
      options.where.votableType = votableType;
    }

    if(!isNaN(Number(limit))) {
      options.offset = !isNaN(Number(page)) ? Number(page) * Math.min(Number(limit), MAX_LIMIT) : 0;
    } else {
      options.offset = !isNaN(Number(page)) ? Number(page) * MAX_LIMIT : 0;
    }

    options.limit = !isNaN(Number(limit)) ? Math.min(Number(limit), MAX_LIMIT) : MAX_LIMIT;
    options.subQuery = false;

    return models.movie_votable.findAndCountAll(options)
      .then(({ rows, count }) => {
        res.send({
          rows,
          count,
          pageSize: MAX_LIMIT,
        });
      })
      .catch(next);
  });
  router.patch('/', (req, res, next) => {
    const {
      body: {
        action,
        movieId,
        votableId,
        votableType,
      }
    } = req;

    if (!(action && ACTION_TYPES.indexOf(action) !== -1)
      || !(votableType && knownVotableType(votableType))
      || !movieId
      || !votableId) {
      return res.status(422).send();
    }

    return models.movie_votable.find({
      movieId,
      votableId,
      votableType
    })
      .then((votable) => {
        if (!votable) {
          return res.status(404).send();
        }
        const oldScore = votable.get('score');
        const score = action === 'upvote' ? oldScore + 1 : oldScore - 1;

        return votable
          .update({ score })
          .then(() => res.status(200).send());
      })
      .catch(next);
  });

  return router;
};
