module.exports = {
    loginForm(req,res) {
        return res.render('Admin/Session/login');
    },
    async login(req, res) {
        const {email, password} = req.body;
        console.log(email, password);
        return res.redirect('/');
    }
}