const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const db = require('./database');

module.exports = session({
    store: new pgSession({
        pool: db
    }),
    secret: '6666d531330bdcd87bdcb9c3d7245ba5',
    resave: false,
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 }, // 1 days
    saveUninitialized: false
});

