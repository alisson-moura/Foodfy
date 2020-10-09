const Chef = require('../../models/Chef');

module.exports = {
  list(req, res) {
    Chef.all((chefs) => {
      console.log(chefs)
      return res.render('Site/chefs', { chefs });
    });
  },
}