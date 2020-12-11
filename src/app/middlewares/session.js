function onlyAdmins(req, res, next) {
    if(!req.session.userId) return res.redirect('/accounts');

    next();
}

function onlyChefs(req,res, next) {
    if(!req.session.chefId ||!req.session.userId ) return res.redirect('/accounts');

    next();
}

function isLoggedRedirectToAdmin(req, res, next) {
    if(req.session.userId || req.session.chefId) return res.redirect('/admin');

    next();
}

module.exports = {
    onlyAdmins,
    onlyChefs,
    isLoggedRedirectToAdmin
}