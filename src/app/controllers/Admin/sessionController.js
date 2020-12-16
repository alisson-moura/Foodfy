module.exports = {
    loginForm(req, res) {
        return res.render('Admin/Session/login');
    },
    async login(req, res) {
        const { user, chef } = req;
        if (user) {
            req.session.userId = user.id;
        } else {
            req.session.chefId = chef.id;
        }
        return res.redirect('/admin/recipes');
    },
    async logout(req, res) {
        await req.session.destroy();
        return res.redirect("/accounts");
    }
}