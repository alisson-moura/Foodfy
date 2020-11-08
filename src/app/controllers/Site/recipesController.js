const Recipe = require('../../models/Recipe');
const File = require('../../models/File');
const { createArrayFromStringPG } = require('../../../lib/createArrayFromString');

module.exports = {
  async index(req, res) {
    const { search } = req.query;

    let results = await Recipe.all(search);
    let recipes = results.rows;

    let recipesImagePromise = recipes.map(recipe => Recipe.getImageRecipe(recipe.id));
    results = await Promise.all(recipesImagePromise);
    let recipeImages = results.map(result => result.rows[0]);
    recipeImages = recipeImages.map(recipeImage => {
      return recipeImage = {
        ...recipeImage,
        src: `${req.protocol}://${req.headers.host}${recipeImage.path.replace("public", "")}`
      }
    });

    recipes = recipes.map(recipe => {
      recipe = {
        ...recipe,
        image: recipeImages.find(recipeImage => recipeImage.recipe_id == recipe.id),
      };
      return recipe;
    });
    return res.render('Site/index', { recipes });
  },
  async list(req, res) {
    let { filter, page } = req.query;
    let pagination = {};

    let results = await Recipe.allWithPagination(filter, page, 10);
    let recipes = results.rows;
    if (recipes.length != 0) {
      pagination = {
        total: Math.ceil(recipes[0].total / 2),
        page: page ? page : 1,
      }
    }

    let recipesImagePromise = recipes.map(recipe => Recipe.getImageRecipe(recipe.id));
    results = await Promise.all(recipesImagePromise);
    let recipeImages = results.map(result => result.rows[0]);
    recipeImages = recipeImages.map(recipeImage => {
      return recipeImage = {
        ...recipeImage,
        src: `${req.protocol}://${req.headers.host}${recipeImage.path.replace("public", "")}`
      }
    });

    recipes = recipes.map(recipe => {
      recipe = {
        ...recipe,
        image: recipeImages.find(recipeImage => recipeImage.recipe_id == recipe.id),
      };
      return recipe;
    });

    return res.render('Site/recipes.njk', { recipes, filter, pagination });
  },
  async show(req, res) {
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
    return res.render('Site/show.njk', { recipe, images });

  },
  about(req, res) {
    return res.render('Site/about.njk');
  }
}