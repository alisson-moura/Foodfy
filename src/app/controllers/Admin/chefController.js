const Chef = require('../../models/Chef');
const { objectIsValid } = require('../../../lib/checkData');
const {date} = require('../../../lib/dates');

module.exports = {
  index(req, res) {
    return res.render('Admin/Chefs/chefs');
  },
  create(req, res) {
    return res.render('Admin/Chefs/create');
  },
  post(req, res) {
    let data = req.body;
    if(!objectIsValid(data)){
      return res.render('Admin/Chefs/create', {error: 'Por favor preencha os campos corretamente'});
    }
    data = {
      ...data,
      created_at: date(Date.now()).iso
    }
    Chef.create(data, (chef) => {
      return res.redirect('/admin/chefs');
    });
    
  }
}