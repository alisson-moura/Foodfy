const Recipe = require('../../models/Recipe');
const { objectIsValid } = require('../../../lib/checkData');

exports.index = (req, res) => {
  const { search } = req.query;
  Recipe.all(search, function (recipes) {
    return res.render('Admin/index', { recipes });
  });
}

exports.create = (req, res) => {
  Recipe.listChefs((chefs) => {
    return res.render('Admin/Recipes/create', { chefs });
  });
}

exports.post = (req, res) => {
  let data = req.body;
  if (!objectIsValid(data)) {
    return res.render('Admin/Recipes/create', { error: 'Por favor preencha os campos corretamente' });
  }
  Recipe.create(data, (recipe) => {
    return res.redirect(`/admin/recipes/${recipe.id}`);
  });
}

exports.show = (req, res) => {
  const { id } = req.params;
  Recipe.getById(id, (recipe) => {
    return res.render('Admin/Recipes/show', { recipe });
  });
}

exports.edit = (req, res) => {
  const { id } = req.params;
  Recipe.getById(id, (recipe) => {
    Recipe.listChefs((chefs) => {
      return res.render('Admin/Recipes/edit', { recipe, chefs });
    })
  });

}

exports.put = (req, res) => {
  let data = req.body;
  if (!objectIsValid(data)) {
    return res.send('Por favor preencha os campos corretamente');
  }
  Recipe.update(data, (recipe) => {
    return res.redirect(`/admin/recipes/${recipe.id}`);
  });
}

exports.delete = (req, res) => {
  const { id } = req.body;
  Recipe.delete(id, () => {
    return res.redirect('/admin');
  });
}