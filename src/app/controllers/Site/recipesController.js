const Recipe = require('../../models/Recipe');

module.exports = {
  index(req, res) {
    const { search } = req.query;
    Recipe.all(search, function(recipes) {
      return res.render('Site/index', { recipes });
    });
  },
  list(req, res) {
    let { filter, page } = req.query;

    Recipe.allWithPagination(filter, page, 2, (recipes) => {
      pagination = {}
      if(recipes.length != 0) {
       pagination = {
          total: Math.ceil(recipes[0].total / 2),
          page: page ? page : 1,
        }
      }
      return res.render('Site/recipes.njk', { recipes, filter, pagination });
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