const Recipe = require('../../models/Recipe');

module.exports = {
  index(req, res) {
    const { search } = req.query;
    Recipe.all(search, (recipes) => {
      return res.render('Site/index', { recipes });
    });
  },
  list(req, res) {
    let { search, page } = req.query;

    Recipe.allWithPagination(search, page, 2, (recipes) => {
      let pagination = {
        total: 5,
        page: page ? page : 1,
      }
      return res.render('Site/recipes.njk', { recipes, search, pagination });
    });
  },
  show(req, res) {
    const data = req.params;
    Recipe.getById(data.id, (recipe) => {
      if (!recipe) return res.send('Receita não encontrada');

      return res.render('Site/show.njk', { recipe });
    });
  },
  about(req, res) {
    return res.render('Site/about.njk');
  }
}