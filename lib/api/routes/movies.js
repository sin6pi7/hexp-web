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
  router.post('/', (req, res, next) => {
    const {
      body: {
        title,
        description,
        release_date,
        producer,
        director,
        cast,
        country,
        poster,
        trailer,
      }
    } = req;

    if (!title
      || !description
      || !(release_date && !isNaN(Number(release_date)))
      || !producer
      || !director
      || !cast
      || !country
      || !poster
      || !trailer
    ) {
      return res.status(422).send();
    }

    return models.movie.create({
      title,
      description,
      release_date,
      producer,
      director,
      cast,
      country,
      poster,
      trailer,
    }).then(() => res.status(201).send())
      .catch(next);
  });
  router.patch('/:id', (req, res, next) => {
    const {
      params: {
        id
      },
    } = req;

    const attributesToChange = [
      'title',
      'description',
      'release_date',
      'producer',
      'director',
      'cast',
      'country',
      'poster',
      'trailer',
    ]
      .filter((name) => typeof req.body[name] !== 'undefined')
      .map((name) => ({ name: req.body[name] }));

    if (attributesToChange.length === 0) {
      return res.status(422).send();
    }

    const resource = attributesToChange.reduce((obj, a) => Object.assign({}, obj, a), {});

    return models.movie.findById(id)
      .then((movie) => {
        if (!movie) {
          return res.status(404).send();
        }
        return movie.update(resource);
      })
      .then(() => res.status(200).send())
      .catch(next);
  });
  router.delete('/:id', (req, res, next) => {
    const { params: { id } } = req;

    return models.movie.destroy({
      where: {
        id,
      },
    })
      .then(() => res.status(200).send())
      .catch(next);
  });

  return router;
};