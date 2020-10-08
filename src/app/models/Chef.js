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
  },
  all(callback) {
    const query = `SELECT * FROM chefs`;
    db.query(query, (err, results) => {
      if (err) throw `Database Error! ${err}`;
      return callback(results.rows);
    });
  },
  getById(id, callback) {
    const query = `SELECT * FROM chefs
                   WHERE id = $1`;
    db.query(query, [id], function(err, results){
      if (err) throw `Database Error! ${err}`;
      return callback(results.rows[0]);
    });
  },
  update(data, callback){
    const query = `UPDATE chefs SET
                   avatar_url=($1),
                   name=($2),
                   description=($3)
                   WHERE id = $4`;
    const values = [
      data.avatar_url,
      data.name,
      data.description,
      data.id
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;
      return callback(results.rows[0]);
    });
  }, 
  delete(id, callback){
    const query = `DELETE FROM chefs WHERE id = $1`;
    db.query(query, [id], (err, results)=> {
      if (err) throw `Database Error! ${err}`;
      return callback();
    });
  }
}