const express = require('express');
const adminRoutes = require('./admin');
const siteRoutes = require('./site');

const routes = express.Router();

routes.use('/', siteRoutes);
routes.use('/admin', adminRoutes);

module.exports = routes;