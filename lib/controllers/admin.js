var options = require('../models/options');
var driver = '../models/' + options.storageConfig.database;

var storageClient = require(driver);
var storage = new (storageClient.Adapter)();
        
// GET login page
this.index = function(req, res, next) {
    storage.getAll(function(posts) {
        console.log('admin.index is called');
        console.log('admin.index total ' + posts.length + ' posts');
        var publishedPosts = [];
        var draftPosts = [];
        posts.forEach(function(value) {
            if (value.published === 1) {
                publishedPosts.push(value);
            } else {
                draftPosts.push(value);
            }
        });

        res.render('admin-backend', {
            drafts: draftPosts,
            publish: publishedPosts,
            layout: 'admin-layout'
        });
    });
};

// GET login form
this.login = function(req, res) {
    res.render('admin-login', {
        layout: 'admin-layout'
    });
};

// GET logout page and redirect
this.logout = function(req, res) {
    req.logout();
    res.redirect('/admin');
};

// POST login
this.postLoginData = function(req, res) {
    var usr = options.storageConfig.login.user,
            pw = options.storageConfig.login.password;

    if (req.param('username') === usr && req.param('password') === pw) {
        req.login();
        res.redirect('/admin');
    } else {
        res.render('admin-login', {
            error: 'Bad login'
        });
    }
};
