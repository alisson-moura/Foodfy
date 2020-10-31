const express = require('express');
const {upload} = require('../config/uploadFile');
const recipeController = require('../app/controllers/Admin/recipeController');
const chefController = require('../app/controllers/Admin/chefController');

const adminRoutes = express.Router();

adminRoutes.get('/', (req, res) => (res.redirect('/admin/recipes')));

//recipes
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
adminRoutes.post('/chefs', upload.single('avatar'), chefController.post);

adminRoutes.get('/chefs/:id', chefController.show);

adminRoutes.get('/chefs/:id/edit', chefController.edit);
adminRoutes.put('/chefs', chefController.put);

adminRoutes.delete("/chefs", chefController.delete);

module.exports = adminRoutes;