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