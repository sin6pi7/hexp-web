const express = require('express');
const path = require('path');

module.exports = () => {
  const app = express();

  app.use('/public', express.static('/public'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/index.html`));
  });

  return app;
};
