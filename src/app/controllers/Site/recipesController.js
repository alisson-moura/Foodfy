const Recipe = require('../../models/Recipe');
const { objectIsValid } = require('../../../lib/checkData');

module.exports = {
  index(req, res) {
    Recipe.all((recipes) => {
      return res.render('Site/index', { recipes });
    });
  },
  list(req, res) {
    Recipe.all((recipes) => {
      return res.render('Site/recipes.njk', { recipes });
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