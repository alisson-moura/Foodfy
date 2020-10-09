const Chef = require('../../models/Chef');
const { objectIsValid } = require('../../../lib/checkData');
const { date } = require('../../../lib/dates');

module.exports = {
  index(req, res) {
    Chef.all((chefs) => {
      return res.render('Admin/Chefs/chefs', { chefs });
    });
  },
  create(req, res) {
    return res.render('Admin/Chefs/create');
  },
  post(req, res) {
    let data = req.body;
    if (!objectIsValid(data)) {
      return res.render('Admin/Chefs/create', { error: 'Por favor preencha os campos corretamente' });
    }
    data = {
      ...data,
      created_at: date(Date.now()).iso
    }
    Chef.create(data, (chef) => {
      return res.redirect('/admin/chefs');
    });
  },
  show(req, res) {
    const data = req.params
    Chef.getById(data.id, (chef) => {
      Chef.chefRecipes(data.id, (recipes) => {
        return res.render('Admin/Chefs/show', { chef, recipes });
      });
    });
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
    Chef.delete(id, () => {
      return res.redirect('/admin/chefs');
    });
  }
}