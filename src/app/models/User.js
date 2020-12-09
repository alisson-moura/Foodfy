const db = require('../../config/database');

module.exports = {
    async getAdminByEmail(email) {
        const query = `SELECT * FROM users WHERE email = $1`;
        let results = await db.query(query, [email]);
        return results.rows;
    },
}