const { Router } = require('express');

const MAX_LIMIT = 100;

module.exports = (models) => {
  const router = Router();

  /**
   * @api {get} /periods Request periods list
   * @apiName GetPeriods
   * @apiGroup Periods
   *
   * @apiParam {String} [name] Filter periods by name.
   * @apiParam {Number} [page] Page number for pagination support.
   * @apiParam {Number} [limit] Number of periods to return (max 100).
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
            rows: [
              {
                "id": 1,
                "name": "Films set in Antiquity (until the fall of the Roman Empire in the West)",
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