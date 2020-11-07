const db = require('../../config/database');
const fs = require('fs')

module.exports = {
    create({ name, path }) {
        const query = `INSERT INTO files (name, path) VALUES($1, $2) RETURNING id`;
        return db.query(query, [name, path]);
    },
    getById(id) {
        const query = `SELECT * FROM files WHERE id = $1`;
        return db.query(query, [id]);
    },
    async delete(id) {
        try {
            let result = await db.query(`SELECT * FROM files WHERE id = $1`, [id]);
            const file = result.rows[0];
            fs.unlinkSync(file.path);

            const query = `DELETE FROM files WHERE id = $1`;
            return db.query(query, [id]);
        } catch (error) {
            console.error(error);
        }

    }
}