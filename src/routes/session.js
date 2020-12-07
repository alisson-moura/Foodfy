const express = require('express');
const sessionController = require('../app/controllers/Admin/sessionController');
const routes = express.Router();

routes.get('/', sessionController.loginFom);

module.exports = routes;