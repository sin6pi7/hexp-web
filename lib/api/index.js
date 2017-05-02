const express = require('express');
const bodyParser = require('body-parser');

const createMoviesRouter = require('./routes/movies');
const createTagsRouter = require('./routes/tags');
const createPeriodsRouter = require('./routes/periods');
const createRegionsRouter = require('./routes/regions');
const createVotesRouter = require('./routes/votes');

module.exports = ({ models }) => {
  const app = express();

  app.use(bodyParser.json());

  const moviesRouter = createMoviesRouter(models);
  app.use('/movies', moviesRouter);
  const tagsRouter = createTagsRouter(models);
  app.use('/tags', tagsRouter);
  const periodsRouter = createPeriodsRouter(models);
  app.use('/periods', periodsRouter);
  const regionsRouter = createRegionsRouter(models);
  app.use('/regions', regionsRouter);
  const votesRouter = createVotesRouter(models);
  app.use('/votes', votesRouter);

  return app;
};
