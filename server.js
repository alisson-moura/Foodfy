const express = require('express');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const data = require('./data');

const port = 5000;
const app = express();
app.use(express.static('public'));
app.set("view engine", "njk");
nunjucks.configure('views', {
  express: app,
  autoescape: false,
  noCache: true
});

app.use();

app.get('/', function(req, res) {
  return res.render('index.njk', {recipes: data});
});

app.get('/recipes', function(req, res) {
  return res.render('recipes.njk', {recipes: data});
});

app.get('/recipe/:id', function(req, res) {
  const id = req.params.id;
  const recipe = data[id];

  if(!recipe){
    return res.send('Error 404');
  }
  return res.render('detailRecipe', {recipe});
})

app.get('/about', function(req, res) {
  return res.render('about.njk');
});

app.listen(port, function () {
  console.log(`app running on port: ${port}`);
});