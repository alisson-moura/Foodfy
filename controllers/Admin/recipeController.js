const fs = require('fs');
const data = require('../../data.json');

exports.index = (req,res) => {
  return res.render('Admin/index', {recipes: data.recipes});
}

exports.create = (req, res) => {
  return res.render('Admin/create');
}
exports.post = (req, res) => {
  const {image, title, ingredients, preparation, information} = req.body;
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (!req.body[key])
      return res.send('Por favor, preencha todos os campos.');
  }

  let id = 1;
  const lastId = data.recipes[data.recipes.length - 1];
  if(lastId){
    id = lastId.id + 1;
  }

  data.recipes.push({id, image, title, ingredients, preparation, information, author: 'Alisson Moura' });
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Erro ao escrever no arquivo');

    return res.send(data.recipes);
  });
}

exports.show = (req, res) => {
  const {id} = req.params;

  const findRecipe = data.recipes.find(recipe => recipe.id === Number(id));



  return res.render('Admin/show', {recipe: findRecipe});
}