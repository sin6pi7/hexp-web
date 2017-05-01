const { Router } = require('express');

const MAX_LIMIT = 100;

module.exports = (models) => {
  const router = Router();

  router.get('/', (req, res, next) => {
    const {
      query: {
        title,
        page,
        limit,
        tag,
        periods,
        regions,
        release_date,
      }
    } = req;

    const options = {
      where: {},
      include: [],
    };

    if (title) {
      options.where.title = {
        $like: `%${title}%`,
      };
    }
    if (!isNaN(Number(release_date))) {
      options.where.release_date = {
        $gt: new Date(Number(release_date))
      };
    }
    if (tag) {
      options.include.push({
        model: models.tag,
        where: {
          name: {
            $like: tag,
          },
        },
      });
    }
    if (periods && periods.split(',').length > 0) {
      options.include.push({
        model: models.period,
        where: {
          name: {
            $in: periods.split(','),
          },
        },
      });
    }
    if (regions && regions.split(',').length > 0) {
      options.include.push({
        model: models.region,
        where: {
          name: {
            $in: regions.split(','),
          },
        },
      });
    }
    options.offset = !isNaN(Number(page)) ? Number(page) * MAX_LIMIT : 0;
    options.limit = !isNaN(Number(limit)) ? Number(limit) : MAX_LIMIT;

    return models.movie.findAndCountAll(options)
      .then(({ rows, count }) => {
        res.send({
          rows,
          count,
        });
      })
      .catch(next);
  });
  router.get('/:id', (req, res, next) => {
    const { params: { id } } = req;
    return models.movie.find({
      where: {
        id: {
          $eq: id,
        },
      },
    })
      .then((movie) => res.send(movie))
      .catch(next);
  });

  return router;
};