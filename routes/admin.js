const express = require('express');
const recipeController = require('../controllers/Admin/recipeController');

const adminRoutes = express.Router();

adminRoutes.get('/', recipeController.index);
adminRoutes.get('/recipes', recipeController.index);

module.exports = adminRoutes;