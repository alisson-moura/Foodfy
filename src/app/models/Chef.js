const db = require('../../config/database');

module.exports = {
  create(data, callback) {
    const query = `INSERT INTO chefs (name, avatar_url,description, created_at)
                   VALUES ($1, $2, $3, $4)
                   RETURNING id`;
    const values = [
      data.name,
      data.avatar_url,
      data.description,
      data.created_at
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;
      return callback(results.rows[0]);
    });
  }
}