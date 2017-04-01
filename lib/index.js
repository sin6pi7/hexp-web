const express = require('express');

const createApi = require('./api');
module.exports = () => {
  const app = express();

  app.set('view engine', 'pug');
  app.set('views', __dirname + "/../views");
  app.use('/public', express.static(__dirname + "/../public"));
  app.use('/pure', express.static(__dirname + "/../node_modules/purecss/build"));
  app.use('/leaflet', express.static(__dirname + "/../node_modules/leaflet/dist"));

  app.use('/api', createApi());

  app.get('/admin', (req, res) => {
  	res.render('admin');
  });

  // This is set to '*' because the application uses react-router.
  // This means that we can do page 404 and the like in the client side
  // but also, that the user can start the page at something like
  // <server_url>/movie/Titanic, and the SPA will still work, because this is handled client-side, and not server side
  app.get('/*', (req, res) => {
  	res.render('user');
  });

  app.use((err, req, res, next) => {
  	console.log(err.stack);
  	res.status(500).send("ERROR 500: There was an error... look at the console log (Update this page later)");
  });

  return app;
};
