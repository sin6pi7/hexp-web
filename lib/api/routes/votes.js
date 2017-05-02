const { Router } = require('express');

const VOTABLE_TYPES = [
  'tag',
  'period',
  'region',
];
const ACTION_TYPES = [
  'upvote',
  'downvote',
];

const updateScore = (res, models, action, votableType, movieId, votableId) => {
  const modelName = `movie_${votableType}`;
  const votableAttributeName = `${votableType}Id`;

  return models[modelName]
    .find({
      where: {
        movieId,
        [votableAttributeName]: votableId,
      },
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
    });
};

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
      || !(votableType && VOTABLE_TYPES.indexOf(votableType) !== -1)
      || !movieId
      || !votableId) {
      return res.status(422).send();
    }

    return updateScore(res, models, action, votableType, movieId, votableId).catch(next);
  });

  return router;
};
