const db = require('../../config/database');
const { date } = require('../../lib/dates');

module.exports = {
  create(data) {
    const query = `INSERT INTO recipes 
                  (title, chef_id, ingredients, preparation, information, created_at)
                   VALUES ($1, $2, $3, $4, $5, $6)
                   RETURNING id`;
    const values = [
      data.title,
      data.chef,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso
    ];

    return db.query(query, values);
  },

  listChefs() {
    const query = `SELECT name, id FROM chefs`;
    return db.query(query);
  },

  all(filter) {
    let query = `SELECT recipes.*, chefs.name AS chef_name 
                   FROM recipes
                   LEFT JOIN chefs
                   ON recipes.chef_id = chefs.id`;
    if (filter) {
      query = `${query}
              WHERE recipes.title ILIKE '%${filter}%'`;
    }
    return db.query(query);
  },

  getImageRecipe(recipe_id) {
    let query = `SELECT recipes_files.*, files.path
                  FROM recipes_files
                  LEFT JOIN files
                  ON recipes_files.file_id = files.id
                  WHERE recipes_files.recipe_id = $1
                  LIMIT 1`;
    return db.query(query, [recipe_id]);
  },

  getById(id) {
    const query = `SELECT recipes.*, chefs.name AS chef_name 
                   FROM recipes
                   LEFT JOIN chefs
                   ON recipes.chef_id = chefs.id
                   WHERE recipes.id = $1`;
    return db.query(query, [id]);
  },

  getImagesRecipe(recipe_id) {
    const query = ` SELECT * FROM recipes_files WHERE recipe_id = $1`;
    return db.query(query, [recipe_id]);
  },
  
  update(data) {
    const query = `UPDATE recipes SET
                   title=($1),  
                   chef_id=($2), 
                   ingredients=($3), 
                   preparation=($4), 
                   information=($5)
                   WHERE id = $6
                   RETURNING id`;

    const values = [
      data.title,
      data.chef,
      data.ingredients,
      data.preparation,
      data.information,
      data.id
    ];

    return db.query(query, values);
  },

  delete(id, callback) {
    const query = `DELETE FROM recipes WHERE id = $1`;
    db.query(query, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`;
      return callback();
    });
  },

  allWithPagination(filter, page = 1, limit) {
    let offset = limit * (page - 1);

    let query = `SELECT recipes.*, chefs.name AS chef_name, 
    (SELECT count(*) FROM recipes) AS total
    FROM recipes
    LEFT JOIN chefs
    ON recipes.chef_id = chefs.id`;
    if (filter) {
      query = `SELECT recipes.*, chefs.name AS chef_name, 
      (SELECT count(*) FROM recipes  WHERE recipes.title ILIKE '%${filter}%') AS total
      FROM recipes
      LEFT JOIN chefs
      ON recipes.chef_id = chefs.id
      WHERE recipes.title ILIKE '%${filter}%'`;
    }
    query = `${query}
             OFFSET $1
             LIMIT $2`
    return db.query(query, [offset, limit]);
  },
}