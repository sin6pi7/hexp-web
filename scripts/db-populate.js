const faker = require('faker');
const Sequelize = require('sequelize');
const { loadFixtures } = require('sequelize-fixtures');

const createModels = require('../lib/api/models');
const { VOTABLE_TYPES: { PERIOD, TAG, REGION } } = require('../lib/api/models/movie_votable');

require('dotenv').load();

// movies
const MOVIE_COUNT = 100;
const MOVIES = [];
for (let i = 1; i <= MOVIE_COUNT; i++) {
  MOVIES.push({
    id: i,
    model: 'movie',
    data: {
      title: faker.lorem.words(10),
      description: faker.lorem.words(20),
      release_date: faker.date.past(),
      director: faker.name.findName(),
      cast: `${faker.name.findName()}, ${faker.name.findName()}, ${faker.name.findName()}`,
      country: faker.address.country(),
      poster: faker.image.imageUrl(),
      producer: faker.name.findName(),
      trailer: faker.internet.url(),
    },
  });
}
// movie images
const IMAGE_PER_MOVIE_COUNT = 5;
const MOVIE_IMAGES = [];
MOVIES.forEach((movie) => {
  for (let i = 0; i < IMAGE_PER_MOVIE_COUNT; i++) {
    MOVIE_IMAGES.push({
      model: 'movie_image',
      data: {
        url: faker.image.imageUrl(),
        movieId: movie.id,
      },
    });
  }
});
// tags
const TAG_COUNT = 50;
const TAGS = [];
for (let i = 0; i < TAG_COUNT; i++) {
  const start = faker.random.number({
    min: 0,
    max: MOVIES.length - 1,
  });
  const end = faker.random.number({
    min: start + 1,
    max: MOVIES.length,
  });
  const movies = MOVIES
    .slice(start, end)
    .map(({ id }) => ({
      id,
      _through: {
        score: faker.random.number(1000),
        votableType: TAG,
      }
    }));

  TAGS.push({
    model: 'tag',
    data: {
      name: faker.random.word(),
      movies,
    },
  });
}
// periods
const PERIODS = require('../js/data/periods').map((name) => {
  const start = faker.random.number({
    min: 0,
    max: MOVIES.length - 1,
  });
  const end = faker.random.number({
    min: start + 1,
    max: MOVIES.length,
  });
  const movies = MOVIES
    .slice(start, end)
    .map(({ id }) => ({
      id,
      _through: {
        score: faker.random.number(1000),
        votableType: PERIOD,
      }
    }));

  return {
    model: 'period',
    data: {
      name,
      movies,
    },
  };
});
// regions
const REGIONS = Object.keys(require('../js/data/regions')).map((code) => {
  const start = faker.random.number({
    min: 0,
    max: MOVIES.length - 1,
  });
  const end = faker.random.number({
    min: start + 1,
    max: MOVIES.length,
  });
  const movies = MOVIES
    .slice(start, end)
    .map(({ id }) => ({
      id,
      _through: {
        score: faker.random.number(1000),
        votableType: REGION,
      }
    }));

  return {
    model: 'region',
      data: {
        code,
        movies,
      },
  };
});

const db = new Sequelize(process.env.DATABASE_URI);
const models = createModels(db);

db.sync({ force: true })
  .then(() => {
    loadFixtures(
      [].concat(
        MOVIES,
        MOVIE_IMAGES,
        PERIODS,
        REGIONS,
        TAGS
      ),
      models
    );
  })
  .catch(console.error);
