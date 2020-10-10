const Recipe = require('../../models/Recipe');

module.exports = {
  index(req, res) {
    const {search} = req.query;
    Recipe.all(search, (recipes) => {
      return res.render('Site/index', { recipes });
    });
  },
  list(req, res) {
    const {search} = req.query;
    Recipe.all(search, (recipes) => {
      return res.render('Site/recipes.njk', { recipes, search });
    });
  },
  show(req, res){
    const data = req.params;
    Recipe.getById(data.id, (recipe) =>{
      if(!recipe) return res.send('Receita não encontrada');

      return res.render('Site/show.njk', {recipe});
    });
  },
  about(req, res) {
    return res.render('Site/about.njk');
  }
}