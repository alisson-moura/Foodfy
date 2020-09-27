const data = require('../../data.js');

exports.index = (req,res) => {
  return res.render('Admin/index', {recipes: data});
}