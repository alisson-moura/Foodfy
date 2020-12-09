const express = require('express');
const sessionController = require('../app/controllers/Admin/sessionController');
const sessionValidator = require('../app/validators/sessionValidator');
const routes = express.Router();

routes.get('/', sessionController.loginForm);
routes.post('/', sessionValidator.login, sessionController.login);

module.exports = routes;