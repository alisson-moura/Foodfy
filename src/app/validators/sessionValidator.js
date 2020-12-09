const User = require('../models/User');
const Chef = require('../models/Chef');

async function login(req, res, next) {
    const { email, password } = req.body;

    const chef = await Chef.getChefByEmail(email);
    if (chef.length != 0) {
        console.log(chef);
        next();
    }

    const user = await User.getAdminByEmail(email);
    if (user.length != 0) {
        next();
    }
    return res.render('Admin/Session/login');
}

module.exports = { login }