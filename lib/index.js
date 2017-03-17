const express = require('express');

const createApi = require('./api');
const createFront = require('./front');

module.exports = () => {
  const app = express();

  app.use('/api', createApi());
  app.use(createFront());

  return app;
};
