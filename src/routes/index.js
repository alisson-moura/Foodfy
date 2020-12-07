const express = require('express');
const adminRoutes = require('./admin');
const siteRoutes = require('./site');
const sessionRoutes = require('./session');

const routes = express.Router();

routes.use('/', siteRoutes);
routes.use('/accounts', sessionRoutes);
routes.use('/admin', adminRoutes);

module.exports = routes;