const db = require('../../config/database');

module.exports = {
    create({name, path}){
        const query = `INSERT INTO files (name, path) VALUES($1, $2) RETURNING id`;
        return db.query(query, [name, path]);
    },
}