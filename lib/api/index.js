const express = require('express');

module.exports = () => {
  const app = express();

  app.get('/hello', (req, res) => res.send('hello'));

  return app;
};
