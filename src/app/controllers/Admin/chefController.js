const Chef = require('../../models/Chef');
const File = require('../../models/File');
const { objectIsValid } = require('../../../lib/checkData');
const { date } = require('../../../lib/dates');
const { chefFile } = require('../../models/Chef');
const { head } = require('../../../routes');

module.exports = {
  async index(req, res) {
    try {
      let results = await Chef.all();
      let chefs = results.rows;

      for (let i = 0; i < chefs.length; i++) {
        let result = await Chef.chefFile(chefs[i].file_id);
        let file = result.rows[0];
        file = {
          ...file,
          src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }
        chefs[i].file = file;
      }

      return res.render('Admin/Chefs/chefs', { chefs });
    } catch (error) {
      console.log(error);
    }
  },

  create(req, res) {
    return res.render('Admin/Chefs/create');
  },

  async post(req, res) {
    let data = req.body;
    const { filename, path } = req.file;

    if (!objectIsValid(data)) {
      return res.render('Admin/Chefs/create', { error: 'Por favor preencha os campos corretamente' });
    }

    try {
      const result = await File.create({ name: filename, path });
      const file_id = result.rows[0].id;
      data = {
        ...data,
        file_id
      }
      Chef.create(data, (chef) => {
        return res.redirect('/admin/chefs');
      });
    } catch (error) {
      console.log(error)
      return res.send('Algo deu errado');
    }

  },

  async show(req, res) {
    const data = req.params;

    try {
      let result = await Chef.getById(data.id);
      const chef = result.rows[0];

      result = await Chef.chefFile(chef.file_id);
      let file = result.rows[0];
      file = {
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }
      console.log(file);

      result = await Chef.chefRecipes(chef.id);
      const recipes = result.rows;

      return res.render('Admin/Chefs/show', { chef, recipes, file });
    } catch (error) {
      console.log(error);
      alert('Algo deu errado');
      return res.redirect('/admin/chefs');
    }

  },

  edit(req, res) {
    const data = req.params;
    Chef.getById(data.id, (chef) => {
      return res.render('Admin/Chefs/edit', { chef });
    });
  },
  put(req, res) {
    const data = req.body;
    if (!objectIsValid(data)) {
      return res.render('Admin/Chefs/edit', { error: 'Por favor preencha os campos corretamente' });
    }
    Chef.update(data, (chef) => {
      return res.redirect(`/admin/chefs/${data.id}`);
    });
  },
  delete(req, res) {
    const { id } = req.body;
    Chef.chefRecipes(id, (recipes) => {
      if (recipes.length !== 0) {
        console.log(recipes.length);
        return res.send('Chefs que possuem receitas cadastradas, não podem ser deletados.');
      } else {
        Chef.delete(id, () => {
          return res.redirect('/admin/chefs');
        });
      }
    });
  }
}