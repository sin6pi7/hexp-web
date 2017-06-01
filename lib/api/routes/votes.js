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

  /**
   * @api {get} /votes Request votes list
   * @apiName GetVotes
   * @apiGroup Votes
   *
   * @apiParam {Number} [movieId] Id of the movie to find votes for.
   * @apiParam {String} [votableType] Type of votable resource (tag|period|region).
   * @apiParam {Number} [page] Page number for pagination support.
   * @apiParam {Number} [limit] Number of votes to return (max 100).
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
            rows: [
              {
                "id": 1,
                "movieId": 1,
                "votableType": "period",
                "votableId": 1,
                "score": 1,
                "createdAt": "2017-06-01T12:10:24.262Z",
                "updatedAt": "2017-06-01T12:10:24.262Z"
              }
            ],
            count: 1,
            pageSize: 100
         }
   *
   */
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
  /**
   * @api {post} /votes Create a vote with default score
   * @apiName PostVotes
   * @apiGroup Votes
   *
   * @apiParam {Number} movieId Id of the movie to append votable to.
   * @apiParam {Number} votableId Id of the votable type to append to the movie.
   * @apiParam {String} votableType Type of votable resource (tag|period|region).
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 201 Created
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 400 Bad Request
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 422 Unprocessable Entity
   *
   */
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
  /**
   * @api {put} /votes Update a vote
   * @apiName PutVotes
   * @apiGroup Votes
   *
   * @apiParam {Number} movieId Id of the movie to append votable to.
   * @apiParam {Number} votableId Id of the votable type to append to the movie.
   * @apiParam {String} votableType Type of votable resource (tag|period|region).
   * @apiParam {Number} score A number that should be assigned as score of this vote.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 400 Bad Request
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *
   */
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
  /**
   * @api {delete} /votes Delete a vote
   * @apiName DeleteVotes
   * @apiGroup Votes
   *
   * @apiParam {Number} movieId Id of the movie vote refers to.
   * @apiParam {Number} votableId Id of the votable type.
   * @apiParam {String} votableType Type of votable resource (tag|period|region).
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 400 Bad Request
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *
   */
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
  /**
   * @api {patch} /votes Patch a vote
   * @apiName PatchVotes
   * @apiGroup Votes
   *
   * @apiParam {String} action Action to perform (upvote|downvote). Upvote adds 1 to the score, downvote subtracts 1 from the score.
   * @apiParam {Number} movieId Id of the movie vote refers to.
   * @apiParam {Number} votableId Id of the votable type.
   * @apiParam {String} votableType Type of votable resource (tag|period|region).
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 422 Unprocessable Entity
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *
   */
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
