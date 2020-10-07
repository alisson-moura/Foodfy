const express = require('express');
const adminRoutes = require('./admin');


const data = require('../../data.json');

const routes = express.Router();

routes.get('/', function(req, res) {
  return res.render('index.njk', {recipes: data.recipes});
});

routes.use('/admin', adminRoutes);

routes.get('/recipes', function(req, res) {
  return res.render('recipes.njk', {recipes: data.recipes});
});

routes.get('/recipe/:id', function(req, res) {
  const { id } = req.params;
  const findRecipe = data.recipes.find(recipe => recipe.id === Number(id));

  if(!findRecipe){
    return res.send('Error 404');
  }
  return res.render('detailRecipe', {recipe: findRecipe});
})

routes.get('/about', function(req, res) {
  return res.render('about.njk');
});

module.exports = routes;