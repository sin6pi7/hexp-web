const { Router } = require('express');

const MAX_LIMIT = 100;

module.exports = (models) => {
  const router = Router();

  router.get('/', (req, res, next) => {
    const {
      query: {
        code,
        page,
        limit,
      }
    } = req;

    const options = {
      where: {},
    };

    if (code) {
      options.where = {
        code: {
          $like: `%${code}%`,
        },
      };
    }
    options.offset = !isNaN(Number(page)) ? Number(page) * MAX_LIMIT : 0;
    options.limit = !isNaN(Number(limit)) ? Number(limit) : MAX_LIMIT;

    return models.period.findAndCountAll(options)
      .then(({ rows, count }) => {
        res.send({
          rows,
          count,
          pageSize: MAX_LIMIT,
        });
      })
      .catch(next);
  });

  return router;
};