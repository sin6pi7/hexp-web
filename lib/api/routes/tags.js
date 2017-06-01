const { Router } = require('express');

const MAX_LIMIT = 100;

module.exports = (models) => {
  const router = Router();

  /**
   * @api {get} /tags Request tags list
   * @apiName GetTags
   * @apiGroup Tags
   *
   * @apiParam {String} [name] Filter tags by name.
   * @apiParam {Number} [page] Page number for pagination support.
   * @apiParam {Number} [limit] Number of tags to return (max 100).
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
            rows: [
              {
                "id": 1,
                "name": "Pharaoh Khufu",
                "createdAt": "2017-06-01T12:10:21.926Z",
                "updatedAt": "2017-06-01T12:10:21.926Z"
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
        name,
        page,
        limit,
      }
    } = req;

    const options = {
      where: {},
    };

    if (name) {
      options.where = {
        name: {
          $like: `%${name}%`,
        },
      };
    }
    if(!isNaN(Number(limit)))
      options.offset = !isNaN(Number(page)) ? Number(page) * Math.min(Number(limit), MAX_LIMIT) : 0;
    else
      options.offset = !isNaN(Number(page)) ? Number(page) * MAX_LIMIT : 0;

    options.limit = !isNaN(Number(limit)) ? Math.min(Number(limit), MAX_LIMIT) : MAX_LIMIT;
    options.subQuery = false;

    return models.tag.findAndCountAll(options)
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
   * @api {get} /tags/:id Request tag information
   * @apiName GetTag
   * @apiGroup Tags
   *
   * @apiParam {Number} id Id of requested tag.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "id": 1,
            "name": "Pharaoh Khufu",
            "createdAt": "2017-06-01T12:10:21.941Z",
            "updatedAt": "2017-06-01T12:10:21.941Z"
   *     }
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   */
  router.get('/:id', (req, res, next) => {
    const { params: { id } } = req;

    return models.tag
      .find({
        where: {
          id
        },
      })
      .then((tag) => {
        if (!tag) {
          return res.status(404).send();
        }
        return res.status(200).send(tag);
      })
      .catch(next);
  });
  /**
   * @api {post} /tags Create a tag
   * @apiName PostTag
   * @apiGroup Tags
   *
   * @apiParam {Number} movieId Id of the movie the tag should be assign to.
   * @apiParam {String} name Name of the tag.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 201 Created
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 422 Unprocessable Entity
   */
  router.post('/', (req, res, next) => {
    const {
      body: {
        movieId,
        name,
      }
    } = req;

    return models.movie
      .find({
        where: {
          id: movieId,
        },
      })
      .then((movie) => {
        if (!movie) {
          return res.status(404).send();
        }

        return models.tag.create({
          name,
        }).then((tag) => movie.addTag(tag));
      })
      .then(() => res.status(201).send())
      .catch(next);
  });
  /**
   * @api {put} /tags/:id Update a tag
   * @apiName PutTag
   * @apiGroup Tags
   *
   * @apiParam {Number} movieId Id of the movie the tag should be assign to.
   * @apiParam {String} name Name of the tag.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 422 Unprocessable Entity
   */
  router.put('/:id', (req, res, next) => {
    const {
      body: {
        movieId,
        name,
      },
      params: {
        id,
      },
    } = req;

    return models.movie
      .find({
        where: {
          id: movieId,
        },
      })
      .then((movie) => {
        if (!movie) {
          return res.status(422).send();
        }

        return models.tag.update(
          {
            name,
          },
          {
            where: {
              id,
            }
          }).then((tag) => movie.addTag(tag));
      })
      .then(() => res.status(200).send())
      .catch(next);

  });
  /**
   * @api {delete} /tags/:id Delete a tag
   * @apiName DeleteTag
   * @apiGroup Tags
   *
   * @apiParam {Number} id Id of the tag to delete.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 20o OK
   */
  router.delete('/:id', (req, res, next) => {
    const {
      params: {
        id,
      }
    } = req;

    return models.tag.destroy({
        where: {
          id,
        },
      })
      .then(() => res.status(200).send())
      .catch(next);
  });

  return router;
};