const { Router } = require('express');

const MAX_LIMIT = 100;

module.exports = (models) => {
  const router = Router();

  /**
   * @api {get} /movies Request movies list
   * @apiName GetMovies
   * @apiGroup Movies
   *
   * @apiParam {String} [title] Filter movies by title.
   * @apiParam {Number} [page] Page number for pagination support.
   * @apiParam {Number} [limit] Number of movies to return (max 100).
   * @apiParam {String} [tag] Filter movies by tag.
   * @apiParam {String[]} [periods] Filter movies by periods.
   * @apiParam {String[]} [regions] Filter movies by regions.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
            rows: [
              {
                id: 6,
                title: "The Last Legion",
                description: "connecting (in heavily fictionalized fashion) the deposition of the last Roman emperor Romulus Augustus by Odoacer with the Battle of Mount Badon",
                release_date: "2007-01-01T00:00:00.000Z",
                producer: "Tarak Ben Ammar, Raffaella De Laurentiis, Dino De Laurentiis, Martha De Laurentiis, ",
                director: "Doug Lefler",
                cast: "Colin Firth, Ben Kingsley, Aishwarya Rai Bachchan, Peter Mullan, Kevin McKidd, John Hannah, Iain Glen, Thomas Brodie-Sangster, Rupert Friend, Nonso Anozie, Owen Teale, Alexander Siddig, Robert Pugh, James Cosmo, Harry Van Gorkum, Murray McArthur, ",
                country: null,
                poster: "http://image.tmdb.org/t/p/w185/8K4WWwFew1CzCGVkgmKdamCA6kz.jpg",
                trailer: null,
                tmdb_id: "9703",
                createdAt: "2017-06-01T12:10:21.256Z",
                updatedAt: "2017-06-01T12:10:21.256Z",
                deletedAt: null,
                regions: [
                  {
                    id: 11,
                    code: "PT",
                    createdAt: "2017-06-01T12:10:22.129Z",
                    updatedAt: "2017-06-01T12:10:22.129Z",
                    movie_votable: {
                    id: 26,
                    movieId: 6,
                    votableType: "region",
                    votableId: 11,
                    score: 1,
                    createdAt: "2017-06-01T12:10:24.303Z",
                    updatedAt: "2017-06-01T12:10:24.303Z"
                  }
                ]
              },
            ],
            count: 5,
            pageSize: 100
         }
   *
   */
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
  /**
   * @api {get} /movies/:id Request movie information
   * @apiName GetMovie
   * @apiGroup Movies
   *
   * @apiParam {Number} id Id of requested movie.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
            id: 51,
            title: "Iron Jawed Angels",
            description: "American women's suffrage movement during the 1910s",
            release_date: "2004-01-01T00:00:00.000Z",
            producer: "",
            director: "Katja von Garnier",
            cast: "Hilary Swank, Anjelica Huston, Molly Parker, Margo Martindale, Frances O'Connor, Lois Smith, Vera Farmiga, Brooke Smith, Adilah Barnes, Laura Fraser, Julia Ormond, Patrick Dempsey, Joseph Adams, Bob Gunton, ",
            country: null,
            poster: "http://image.tmdb.org/t/p/w185/q7OTC8AoUEsOj9fgRA1FYIExbhB.jpg",
            trailer: null,
            tmdb_id: "49007",
            createdAt: "2017-06-01T12:10:21.273Z",
            updatedAt: "2017-06-01T12:10:21.273Z",
            deletedAt: null,
            tags: [
              {
              id: 58,
              name: "Women%27s suffrage in the United States",
              createdAt: "2017-06-01T12:10:23.676Z",
              updatedAt: "2017-06-01T12:10:23.676Z",
              movie_votable: {
              id: 388,
              movieId: 51,
              votableType: "tag",
              votableId: 58,
              score: 1,
              createdAt: "2017-06-01T12:10:24.747Z",
              updatedAt: "2017-06-01T12:10:24.747Z"
              }
            ],
            regions: [
              {
                id: 44,
                code: "CF",
                createdAt: "2017-06-01T12:10:23.660Z",
                updatedAt: "2017-06-01T12:10:23.660Z",
                movie_votable: {
                id: 385,
                movieId: 51,
                votableType: "region",
                votableId: 44,
                score: 1,
                createdAt: "2017-06-01T12:10:24.746Z",
                updatedAt: "2017-06-01T12:10:24.746Z"
              },
            ],
            periods: [
              {
                id: 7,
                name: "Films set in the early/mid 20th century",
                createdAt: "2017-06-01T12:10:23.613Z",
                updatedAt: "2017-06-01T12:10:23.613Z",
                movie_votable: {
                id: 381,
                movieId: 51,
                votableType: "period",
                votableId: 7,
                score: 1,
                createdAt: "2017-06-01T12:10:24.742Z",
                updatedAt: "2017-06-01T12:10:24.742Z"
              }
            ],
            movie_images: [
              {
                url: "https://url.com/123"
              }
            ]
          }
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   */
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
  /**
   * @api {post} /movies Create a movie
   * @apiName PostMovie
   * @apiGroup Movies
   *
   * @apiParam {String} title Title of the movie.
   * @apiParam {String} description Description of the movie.
   * @apiParam {String} release_date Release date of the movie.
   * @apiParam {String} producer Producer of the movie.
   * @apiParam {String} director Director of the movie.
   * @apiParam {String[]} cast Cast of the movie.
   * @apiParam {String} country Country of the movie.
   * @apiParam {String} poster URL of the poster of the movie.
   * @apiParam {String} trailer URL of the trailer of the movie.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 201 Created
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 422 Unprocessable Entity
   */
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
  /**
   * @api {patch} /movies/:id Update partial information about a movie
   * @apiName PatchMovie
   * @apiGroup Movies
   *
   * @apiParam {Number} id Id of the movie to patch.
   * @apiParam {String} [title] Title of the movie.
   * @apiParam {String} [description] Description of the movie.
   * @apiParam {String} [release_date] Release date of the movie.
   * @apiParam {String} [producer] Producer of the movie.
   * @apiParam {String} [director] Director of the movie.
   * @apiParam {String[]} [cast] Cast of the movie.
   * @apiParam {String} [country] Country of the movie.
   * @apiParam {String} [poster] URL of the poster of the movie.
   * @apiParam {String} [trailer] URL of the trailer of the movie.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   * @apiErrorExample SemanticallyWrongParams-Response:
   *     HTTP/1.1 422 Unprocessable Entity
   * @apiErrorExample ResourceNotFound-Response:
   *     HTTP/1.1 404 Not Found
   */
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
  /**
   * @api {delete} /movies/:id Delete a movie
   * @apiName DeleteMovie
   * @apiGroup Movies
   *
   * @apiParam {Number} id Id of the movie to patch.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   */
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