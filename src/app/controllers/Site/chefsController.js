const Chef = require('../../models/Chef');

module.exports = {
  async list(req, res) {
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

      return res.render('Site/chefs', { chefs });
    } catch (error) {
      console.log(error);
    }
  },
}