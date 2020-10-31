const db = require('../../config/database');

module.exports = {
  create(data, callback) {
    const query = `INSERT INTO chefs (name, file_id, description)
                   VALUES ($1, $2, $3)
                   RETURNING id`;
    const values = [
      data.name,
      data.file_id,
      data.description,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;
      return callback(results.rows[0]);
    });
  },
  all() {
    const query = `SELECT chefs.*, count(recipes.id) AS total
                   FROM chefs
                   LEFT JOIN recipes
                   ON chefs.id = recipes.chef_id
                   GROUP BY chefs.id
                   `;
    return db.query(query);
  },
  getById(id, callback) {
    const query = `SELECT chefs.*, count(recipes.id)  AS total
                    FROM chefs
                    LEFT JOIN recipes
                    ON chefs.id = recipes.chef_id
                    WHERE chefs.id = $1
                    GROUP BY chefs.id`;
   return db.query(query, [id])
  },
  update(data, callback) {
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
  delete(id, callback) {
    const query = `DELETE FROM chefs WHERE id = $1`;
    db.query(query, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`;
      return callback();
    });
  },
  chefRecipes(id, callback) {
    const query = `SELECT title,image, recipes.id, chefs.name  
                   FROM recipes
                   LEFT JOIN chefs
                   ON recipes.chef_id = chefs.id
                   WHERE chefs.id = $1`;
   return db.query(query, [id])
  },
  chefFile(file_id){
    const query = `SELECT * FROM files WHERE id = $1`;
    return db.query(query, [file_id]);
  }
}