const User = require('../models/User');
const Chef = require('../models/Chef');

async function login(req, res, next) {
    const { email, password } = req.body;

    const chef = await Chef.getChefByEmail(email);
    if (chef) {
        req.session.chef = chef;
    }

    const user = await User.getAdminByEmail(email);
    if (user) {
        req.session.user = user;
    }

    if (user.length == 0 && chef.length == 0) {
        return res.render('Admin/Session/login', {
            error: 'Usuário ou senha inválidos',
            email: req.body
        });
    }

    next();
}

module.exports = { login }