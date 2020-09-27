const express = require('express');
const adminRoutes = require('./admin');


const data = require('../data');

const routes = express.Router();

routes.get('/', function(req, res) {
  return res.render('index.njk', {recipes: data});
});

routes.use('/admin', adminRoutes);

routes.get('/recipes', function(req, res) {
  return res.render('recipes.njk', {recipes: data});
});

routes.get('/recipe/:id', function(req, res) {
  const id = req.params.id;
  const recipe = data[id];

  if(!recipe){
    return res.send('Error 404');
  }
  return res.render('detailRecipe', {recipe});
})

routes.get('/about', function(req, res) {
  return res.render('about.njk');
});

module.exports = routes;