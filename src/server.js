const express = require('express');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const routes = require('./routes');
const session = require('./config/session');

const port = 5000;
const app = express();

app.use(session);
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "njk");

nunjucks.configure('src/app/views', {
  express: app,
  autoescape: false,
  noCache: true
});

app.use(methodOverride('_method'));
app.use(routes)

app.listen(port, function () {
  console.log(`app is running on port: ${port}`);
});