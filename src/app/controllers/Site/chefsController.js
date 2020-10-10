const Chef = require('../../models/Chef');

module.exports = {
  list(req, res) {
    Chef.all((chefs) => {
      return res.render('Site/chefs', { chefs });
    });
  },
}