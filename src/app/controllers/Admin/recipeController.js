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

exports.create = async (req, res) => {
  let results = await Recipe.listChefs();
  let chefs = results.rows;
  return res.render('Admin/Recipes/create', { chefs });
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

    imagesId.forEach(async imageId => await RecipeFiles.create(imageId, recipeId))

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

  if (!recipe) {
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

exports.put = async (req, res) => {
  const keys = Object.keys(req.body);
  const data = req.body;

  for (key of keys) {
    if (req.body[key] == "" && key != "removed_files") {
      return res.send('Por favor preencher todos os campos');
    }
  }

  try {
    if (req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(',');
      const lastIndex = removedFiles.length - 1;
      removedFiles.splice(lastIndex, 1);
  
  
      const removeRecipesFilesPromise = removedFiles.map(id => RecipeFiles.delete(id));
      const removedFilesPromise = removedFiles.map(id => File.delete(id));
      await Promise.all(removeRecipesFilesPromise);
      await Promise.all(removedFilesPromise);
    }
  
    if (req.files.length != 0) {
      const filesPromise = req.files.map(async file => {
        let result = await File.create({ name: file.filename, path: file.path })
        return result.rows[0];
      });
  
      let results = await Promise.all(filesPromise);
      let files_id = results.map(result => result.id);
  
      const recipeFilesPromise = files_id.map(file => RecipeFiles.create(file, req.body.id));
      await Promise.all(recipeFilesPromise);
    }
  
    await Recipe.update(data);
    return res.redirect(`/Admin/recipes/${req.body.id}`);
  } catch (error) {
    console.log(error);
    return res.send('Algo deu errado');
  }

}

exports.delete = (req, res) => {
  const { id } = req.body;
  Recipe.delete(id, () => {
    return res.redirect('/admin');
  });
}