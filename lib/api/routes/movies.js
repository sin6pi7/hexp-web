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
        required: true,
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
        required: true,
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
        required: true,
        where: {
          code: {
            $in: regions.split(','),
          },
        },
      });
    }
    
    if(!isNaN(Number(limit)))
      options.offset = !isNaN(Number(page)) ? Number(page) * Math.min(Number(limit), MAX_LIMIT) : 0;
    else
      options.offset = !isNaN(Number(page)) ? Number(page) * MAX_LIMIT : 0;

    options.limit = !isNaN(Number(limit)) ? Math.min(Number(limit), MAX_LIMIT) : MAX_LIMIT;
    options.subQuery = false;

    return models.movie.findAndCountAll(options)
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
    return models.movie.find({
      where: {
        id: {
          $eq: id,
        },
      },
      include: [
        {
          model: models.tag,
        },
        {
          model: models.region,
        },
        {
          model: models.period,
        },
        {
          model: models.movie_image,
        },
      ]
    })
      .then((movie) => {
        if (!movie) {
          return res.status(404).send();
        }
        return res.send(movie);
      })
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