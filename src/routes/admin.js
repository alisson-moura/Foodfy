const express = require('express');
const { upload } = require('../config/uploadFile');
const sessionController = require('../app/middlewares/session');
const recipeController = require('../app/controllers/Admin/recipeController');
const chefController = require('../app/controllers/Admin/chefController');

const adminRoutes = express.Router();

adminRoutes.get('/', (req, res) => (res.redirect('/admin/recipes')));

//recipes
adminRoutes.get('/recipes', recipeController.index);

adminRoutes.get('/recipes/create', recipeController.create);
adminRoutes.post('/recipes', upload.array("images", 5), recipeController.post);

adminRoutes.get('/recipes/:id', recipeController.show);

adminRoutes.get("/recipes/:id/edit", recipeController.edit);
adminRoutes.put("/recipes", upload.array("images", 5), recipeController.put);

adminRoutes.delete("/recipes", recipeController.delete);

//chefs
adminRoutes.get('/chefs', chefController.index);

adminRoutes.get('/chefs/create', sessionController.onlyAdmins, chefController.create);
adminRoutes.post('/chefs', sessionController.onlyAdmins, upload.single('avatar'), chefController.post);

adminRoutes.get('/chefs/:id', chefController.show);

adminRoutes.get('/chefs/:id/edit', sessionController.onlyChefs, chefController.edit);
adminRoutes.put('/chefs', sessionController.onlyChefs, upload.single('avatar'), chefController.put);

adminRoutes.delete("/chefs", sessionController.onlyAdmins, chefController.delete);

module.exports = adminRoutes;