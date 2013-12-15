// security middleware
module.exports = function(req, res, next) {
    if(req.session.authenticated) {
        next();
    } else {
        res.redirect('/admin/login');
    }
};

// Extend Request to provide logging in capabilities
require('http').IncomingMessage.prototype.login = function() {
    this.session.authenticated = true;
};

// Extend Request ot provide logging out capabilities
require('http').IncomingMessage.prototype.logout = function() {
    this.session.authenticated = false;
};
