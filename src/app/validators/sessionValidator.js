const { compare, hash } = require('bcryptjs')
const User = require('../models/User');
const Chef = require('../models/Chef');

async function login(req, res, next) {
    const { email, password } = req.body;

    const chef = await Chef.getChefByEmail(email);
    if (chef) {
        const passwordCheck = await compare(password, chef.password);
        if (!passwordCheck) {
            return res.render('Admin/Session/login', {
                error: 'Usuário ou senha inválidos!',
                email: req.body
            });
        }
        req.chef = chef;
    }

    const user = await User.getAdminByEmail(email);
    if (user) {
        const passwordCheck = await compare(password, user.password);
        if (!passwordCheck) {
            return res.render('Admin/Session/login', {
                error: 'Usuário ou senha inválidos!',
                email,
            });
        }
        req.user = user;
    }

    if (!user && !chef) {
        return res.render('Admin/Session/login', {
            error: 'Usuário ou senha inválidos!',
            email: req.body
        });
    }

    next();
}

module.exports = { login }