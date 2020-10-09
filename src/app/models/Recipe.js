const db = require('../../config/database');
const { date } = require('../../lib/dates');

module.exports = {
  create(data, callback) {
    const query = `INSERT INTO recipes (title, image, chef_id, ingredients, preparation, information, created_at)
                   VALUES ($1, $2, $3, $4, $5, $6, $7)
                   RETURNING id`;
    const values = [
      data.title,
      data.image,
      data.chef,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;
      return callback(results.rows[0]);
    });
  },

  listChefs(callback) {
    const query = `SELECT name, id FROM chefs`;
    db.query(query, function (err, results) {
      if (err) throw `Database Error! ${err}`;
      return callback(results.rows);
    });
  },

  all(callback) {
    const query = `SELECT recipes.*, chefs.name AS chef_name 
                   FROM recipes
                   LEFT JOIN chefs
                   ON recipes.chef_id = chefs.id`;
    db.query(query, (err, results) => {
      if (err) throw `Database Error! ${err}`;
      return callback(results.rows);
    });
  },

  getById(id, callback) {
    const query = `SELECT recipes.*, chefs.name AS chef_name 
                   FROM recipes
                   LEFT JOIN chefs
                   ON recipes.chef_id = chefs.id
                   WHERE recipes.id = $1`;
    db.query(query, [id], function (err, results) {
      if (err) throw `Database Error! ${err}`;
      return callback(results.rows[0]);
    });
  },

  update(data, callback) {
    const query = `UPDATE recipes SET
                   title=($1), 
                   image=($2), 
                   chef_id=($3), 
                   ingredients=($4), 
                   preparation=($5), 
                   information=($6)
                   WHERE id = $7
                   RETURNING id`;
                   
    const values = [
      data.title,
      data.image,
      data.chef,
      data.ingredients,
      data.preparation,
      data.information,
      data.id
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;
      return callback(results.rows[0]);
    });
  },

  delete(id, callback) {
    const query = `DELETE FROM recipes WHERE id = $1`;
    db.query(query, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`;
      return callback();
    });
  }
}