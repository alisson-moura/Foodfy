module.exports = {
    loginForm(req, res) {
        return res.render('Admin/Session/login');
    },
    async login(req, res) {
        const { email, password } = req.body;
        return res.redirect('/admin');
    }
}