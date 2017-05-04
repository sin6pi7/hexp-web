const { Router } = require('express');
const { VOTABLE_TYPES } = require('../models/movie_votable');

const ACTION_TYPE_UPVOTE = 'upvote';
const ACTION_TYPE_DOWNVOTE = 'downvote';
const ACTION_TYPES = {
  ACTION_TYPE_UPVOTE,
  ACTION_TYPE_DOWNVOTE,
};
const MAX_LIMIT = 100;

const knownVotableType = (votableType) => Object.keys(VOTABLE_TYPES).find((k) => VOTABLE_TYPES[k] === votableType);
const knownActionType = (actionType) => Object.keys(ACTION_TYPES).find((k) => VOTABLE_TYPES[k] === actionType);
const operatorFromActionType = (actionType) => {
  switch (actionType) {
    case ACTION_TYPE_DOWNVOTE:
      return (score) => score - 1;
    case ACTION_TYPE_UPVOTE:
      return (score) => score + 1;
    default:
      return (score) => score;
  }
};

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
  router.post('/', (req, res, next) => {
    const {
      body: {
        movieId,
        votableId,
        votableType,
        }
      } = req;

    if (
      !movieId
      || !votableId
      || !(votableType && knownVotableType(votableType))
    ) {
      return res.status(400).send();
    }

    return Promise.all([
      models.movie.find({ id: movieId }),
      models[votableType].find({ id: votableId }),
    ])
      .then(([movie, votable]) => {
        if (!movie || !votable) {
          return res.status(422).send();
        }
        return models.movie_votable.create({
          movieId,
          votableId,
          votableType,
        });
      })
      .then(() => res.status(201).send())
      .catch(next);
  });
  router.put('/', (req, res, next) => {
    const {
      body: {
        votableId,
        movieId,
        votableType,
        score,
      },
    } = req;

    if (
      !(votableType && knownVotableType(votableType))
      || !movieId
      || !votableId
      || !(score && !isNaN(Number(score)))
    ) {
      return res.status(400).send();
    }

    return models.movie_votable.find({
      where: {
        votableId,
        movieId,
        votableType,
      }
    })
      .then((votable) => {
        if (!votable) {
          return res.status(404).send();
        }
        return votable.update({
          score,
        });
      })
      .then(() => res.status(200).send())
      .catch(next);
  });
  router.delete('/', (req, res, next) => {
    const {
      body: {
        votableId,
        movieId,
        votableType,
      },
    } = req;

    if (
      !(votableType && knownVotableType(votableType))
      || !movieId
      || !votableId
    ) {
      return res.status(400).send();
    }

    return models.movie_votable.find({
      where: {
        votableId,
        movieId,
        votableType,
      }
    })
      .then((votable) => {
        if (!votable) {
          return res.status(404).send();
        }
        return votable.destroy();
      })
      .then(() => res.status(200).send())
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

    if (
      !(action && knownActionType(action))
      || !(votableType && knownVotableType(votableType))
      || !movieId
      || !votableId
    ) {
      return res.status(422).send();
    }

    return models.movie_votable.find({
      where: {
        movieId,
        votableId,
        votableType
      },
    })
      .then((votable) => {
        if (!votable) {
          return res.status(404).send();
        }
        const oldScore = votable.get('score');
        const score = operatorFromActionType(action)(oldScore);

        return votable
          .update({ score })
          .then(() => res.status(200).send());
      })
      .catch(next);
  });

  return router;
};
