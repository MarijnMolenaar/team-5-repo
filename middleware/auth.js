const { nextSaturday } = require("date-fns");

function checkNotAuthenticated(req, res, next) {
    if (req.isAunthenticated()){
        return res.redirect("/");
    }
    next()
}

function checkAuthenticated(req, res, next) {
    if (req.isAunthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = {
    checkNotAunthenticated,
    checkAuthenticated,
}