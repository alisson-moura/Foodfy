const express = require('express');
const recipeController = require('../app/controllers/Admin/recipeController');
const chefController = require('../app/controllers/Admin/chefController');

const adminRoutes = express.Router();

adminRoutes.get('/', (req,res) => (res.redirect('/admin/recipes')));
adminRoutes.get('/recipes', recipeController.index);

adminRoutes.get('/recipes/create', recipeController.create);
adminRoutes.post('/recipes', recipeController.post);

adminRoutes.get('/recipes/:id', recipeController.show);

adminRoutes.get("/recipes/:id/edit", recipeController.edit);
adminRoutes.put("/recipes", recipeController.put);

adminRoutes.delete("/recipes", recipeController.delete);

//chefs
adminRoutes.get('/chefs', chefController.index);

adminRoutes.get('/chefs/create', chefController.create);
adminRoutes.post('/chefs', chefController.post);

module.exports = adminRoutes;