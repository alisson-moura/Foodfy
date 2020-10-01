const express = require('express');
const recipeController = require('../controllers/Admin/recipeController');

const adminRoutes = express.Router();

adminRoutes.get('/', recipeController.index);
adminRoutes.get('/recipes', recipeController.index);

adminRoutes.get('/recipes/create', recipeController.create);
adminRoutes.post('/recipes', recipeController.post);

adminRoutes.get('/recipes/:id', recipeController.show);

adminRoutes.get("/recipes/:id/edit", recipeController.edit);
adminRoutes.put("/recipes", recipeController.put);

adminRoutes.delete("/recipes", recipeController.delete);

module.exports = adminRoutes;