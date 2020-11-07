const Recipe = require('../../models/Recipe');
const File = require('../../models/File');
const RecipeFiles = require('../../models/RecipeFiles');

const { objectIsValid } = require('../../../lib/checkData');
const { createArrayFromStringPG } = require('../../../lib/createArrayFromString');


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

exports.show = async (req, res) => {
  const { id } = req.params;

  let result = await Recipe.getById(id);
  let recipe = result.rows[0];

  if(!recipe) {
    return res.send(`Error 404
                    Receita não encontrada`)
  }

  result = await Recipe.getImagesRecipe(id);
  let imagesId = result.rows;

  let files = await Promise.all(imagesId.map(async image => {
    let rows = await File.getById(image.file_id);
    image = rows.rows[0];
    return image;
  }));

  let images = files.map(file => {
    return file = {
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }
  });

  recipe.ingredients = createArrayFromStringPG(recipe.ingredients);
  recipe.preparation = createArrayFromStringPG(recipe.preparation);

  return res.render('Admin/Recipes/show', { recipe, images });
}

exports.edit = async (req, res) => {
  const { id } = req.params;

  let results = await Recipe.getById(id);
  let recipe = results.rows[0];
  results = await Recipe.listChefs();
  let chefs = results.rows;
 

  result = await Recipe.getImagesRecipe(id);
  let imagesId = result.rows;
  
  let files = await Promise.all(imagesId.map(async image => {
    let rows = await File.getById(image.file_id);
    image = rows.rows[0];
    return image;
  }));

  let images = files.map(file => {
    return file = {
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }
  });

  recipe.ingredients = createArrayFromStringPG(recipe.ingredients);
  recipe.preparation = createArrayFromStringPG(recipe.preparation);
  
  return res.render('Admin/Recipes/edit', { recipe, chefs, images });
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