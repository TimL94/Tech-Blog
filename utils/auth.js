
//checks for the session variable loggedIn, if true than the midle where passes to the next function
const auth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        next()
    }
};

module.exports = auth;