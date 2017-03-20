const express = require('express');

const createApi = require('./api');
module.exports = () => {
  const app = express();

  app.set('view engine', 'pug');
  app.set('views', __dirname + "/../views");
  app.use('/public', express.static(__dirname + "/../public"));

  app.use('/api', createApi());
  
  app.get('/prototype/:page', (req, res) => {
  	res.render('./prototype/' + req.params.page, {
  		baseurl: process.env.NODE_BASEURL
  	});
  });

  app.get('/admin', (req, res) => {
  	res.render('admin', {message: "something for the admin", baseurl: process.env.NODE_BASEURL});
  });

  app.get('/', (req, res) => {
  	res.render('user', {message: "something for the user", baseurl: process.env.NODE_BASEURL});
  });

  app.use((err, req, res, next) => {
  	console.log(err.stack);
  	res.status(500).send("ERROR 500: There was an error... look at the console log (Update this page later)");
  });

  return app;
};
