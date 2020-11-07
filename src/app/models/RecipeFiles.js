const db = require('../../config/database');

module.exports = {
  create(file_id, recipe_id) {
    const query = `INSERT INTO recipes_files (file_id, recipe_id)
                   VALUES ($1, $2)`;

    return db.query(query, [file_id, recipe_id]);
  },
  delete(file_id) {
    const query = `DELETE FROM recipes_files WHERE file_id = $1`;
    return db.query(query, [file_id]);
  }
}