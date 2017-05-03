const { Router } = require('express');
const { VOTABLE_TYPES } = require('../models/movie_votable');

const ACTION_TYPES = [
  'upvote',
  'downvote',
];

module.exports = (models) => {
  const router = Router();

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
      || !(votableType && Object.keys(VOTABLE_TYPES).find((k) => VOTABLE_TYPES[k] === votableType))
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
