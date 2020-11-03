const Recipe = require('../../models/Recipe');
const File = require('../../models/File');
const { objectIsValid } = require('../../../lib/checkData');
const RecipeFiles = require('../../models/RecipeFiles');

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

exports.post = async (req, res) => {
  let data = req.body;
  const files = req.files;

  if (!objectIsValid(data)) {
    return res.send('Por favor preencha os campos corretamente');
  }

  try {
    let imagesId = await Promise.all(files.map(file => {
      let imageId = File.create({ name: file.filename, path: file.path })
        .then(result => {
          return result.rows[0].id
        });
      return imageId;
    }));

    let result = await Recipe.create(data);
    const recipeId = result.rows[0].id;

    imagesId.forEach(async imageId => RecipeFiles.create(imageId, recipeId))

    return res.redirect(`/admin/recipes/${recipeId}`);
  } catch (error) {
    alert('Algo deu errado');
    return res.redirect(`/admin/recipes`);
  }
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