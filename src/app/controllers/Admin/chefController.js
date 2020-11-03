const Chef = require('../../models/Chef');
const File = require('../../models/File');
const { objectIsValid } = require('../../../lib/checkData');

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

      result = await Chef.chefRecipes(chef.id);
      const recipes = result.rows;

      return res.render('Admin/Chefs/show', { chef, recipes, file });
    } catch (error) {
      console.log(error);
      alert('Algo deu errado');
      return res.redirect('/admin/chefs');
    }

  },

  async edit(req, res) {
    const { id } = req.params;
    let result = await Chef.getById(id);
    const chef = result.rows[0];
    if (!chef) {
      alert('Nenhum chef encontrado');
      return res.redirect('/admin');
    }
    result = await Chef.chefFile(chef.file_id);
    let file = result.rows[0];
    file = {
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }
    return res.render('Admin/Chefs/edit', { chef, file });

  },
  
  async put(req, res) {
    let data = req.body;
    let file = req.file;

    if (!objectIsValid(data)) {
      return res.render('Admin/Chefs/create', { error: 'Por favor preencha os campos corretamente' });
    }

    let result = await Chef.getById(data.id);
    let chef = result.rows[0];

    try {
      if (!file) {
        data = {
          ...data,
          file_id: chef.file_id
        }
        let chefUpdated = await Chef.update(data);
        return res.redirect(`/admin/chefs/${chef.id}`);
      }
      else {
        const result = await File.create({ name: file.filename, path: file.path });
        const file_id = result.rows[0].id;
        data = {
          ...data,
          file_id
        }
        let chefUpdated = await Chef.update(data);
        return res.redirect(`/admin/chefs/${chef.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async delete(req, res) {
    const { id } = req.body;

    let results = await Chef.chefRecipes(id);
    let recipes = results.rows;
    if (recipes.length !== 0) {
      return res.send('Chefs que possuem receitas cadastradas, não podem ser deletados.');
    }
    await Chef.delete(id);
    return res.redirect('/admin/chefs');
  }
}