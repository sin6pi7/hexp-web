const { Router } = require('express');

const MAX_LIMIT = 100;

module.exports = (models) => {
  const router = Router();

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
    options.offset = !isNaN(Number(page)) ? Number(page) * MAX_LIMIT : 0;
    options.limit = !isNaN(Number(limit)) ? Number(limit) : MAX_LIMIT;

    return models.tag.findAndCountAll(options)
      .then(({ rows, count }) => {
        res.send({
          rows,
          count,
        });
      })
      .catch(next);
  });
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

  return router;
};