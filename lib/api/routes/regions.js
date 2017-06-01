const { Router } = require('express');

const MAX_LIMIT = 100;

module.exports = (models) => {
  const router = Router();

  /**
   * @api {get} /regions Request regions list
   * @apiName GetRegions
   * @apiGroup Regions
   *
   * @apiParam {String} [code] Filter regions by code.
   * @apiParam {Number} [page] Page number for pagination support.
   * @apiParam {Number} [limit] Number of regions to return (max 100).
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
            rows: [
              {
                "id": 1,
                "code": "PT",
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

    return models.region.findAndCountAll(options)
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