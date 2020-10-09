const express = require('express');
const chefsController = require('../app/controllers/Site/chefsController');
const recipesController = require('../app/controllers/Site/recipesController');

const siteRoutes = express.Router();

//recipes
siteRoutes.get('/', recipesController.index);
siteRoutes.get('/recipes', recipesController.list);
siteRoutes.get('/recipes/:id', recipesController.show);
siteRoutes.get('/about', recipesController.about);


//chefs
siteRoutes.get('/chefs', chefsController.list);

module.exports = siteRoutes;