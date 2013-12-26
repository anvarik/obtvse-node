
// var storage = new (require('../lib/storage/fs'))({ dir: __dirname + '/../data'})
// var storage = new (require('../lib/storage/redis'))()
var storageClient = require('../models/mysql'),
        storage = new (storageClient.MySql)(),
        options = require('../models/options'),
        // source: https://github.com/chjj/marked
        marked = require('marked'),
        abstractController = require('./abstract'),
        date = require('../helpers/date');

marked.setOptions({
    gfm: true
    , pedantic: false
    , sanitize: true
});

// GET home page
this.index = function(req, res, next) {
    storage.getAll(function(posts) {
        console.log('index is called');
        var pagingLeft = false;
        var pagingRight = false;
        var page = parseInt(req.param('count'), 10) || 1;
        var ppp = parseInt(options.storageConfig.postPerPage, 10);
        var articleCount = posts.length;
        console.log(articleCount + ' posts have been found');
        var postsTmp = posts;

        // paging
        if (ppp < articleCount) {
            postsTmp = postsTmp.splice((page - 1) * ppp);
            postsTmp.splice(ppp);
        }

        if (page * ppp < articleCount) {
            pagingRight = true;
        }

        if (page > 1) {
            pagingLeft = true;
        }

        res.render('post-index', {
            posts: postsTmp,
            isAuth: req.session.authenthicated,
            paging: {
                l: pagingLeft,
                r: pagingRight
            },
            page: {
                next: page + 1,
                prev: page - 1
            },
            layout: 'post-layout',
            date: date.getDate()
        });
    });
};

// GET post page
this.single = function(req, res, next) {
    storage.lookup(req.param('id'), function(err, post) {
        if (err)
            return next(err);
        if (post.post_id === null) {
            res.redirect('/');
        } else {
            res.render('post-single', {
                post: post,
                isAuth: req.session.authenticated,
                layout: 'post-layout'
            });
        }
    });
};

// GET preview of a page
this.preview = function(req, res, next) {
    storage.lookup(req.param('id'), function(err, post) {
        if (err)
            return next(err);
        res.render('post-single', {
            post: post
            , isAuth: true
            , layout: 'post-layout'
        });
    });
};

// remove post
this.remove = function(req, res, next) {
    storage.remove(req.param('id'), function(err) {
        if (err)
            return next(err);
        res.redirect('back');
    });
};

// GET form to create new post
this.create = function(req, res, next) {
    res.render('post-create', {
        layout: 'admin-layout'
        , title: req.param('title') || ''
    });
};

// GET form to create new post
this.edit = function(req, res, next) {
    storage.lookup(req.param('id'), function(err, post) {
        res.render('post-edit', {
            layout: 'admin-layout'
            , post: post
        });
    });
};

// POST | update a blog post
this.update = function(req, res, next) {
    var id = req.param('id');
    var obj = {};
    obj.titleMarkup = req.param('title');
    obj.titleHtml = marked(req.param('title'));
    obj.contentMarkup = req.param('markup');
    obj.contentHtml = marked(req.param('markup'));
    obj.created = 'POSTED ' + date.getDate();
    obj.id = id;
    if (req.param('draft')===1) {
        obj.published = 0;
    } else {
        obj.published = 1;
    }
    storage.update(obj);
    if (req.param('draft')===1) {
        res.redirect('/post/preview/' + id);
    } else {
        res.redirect('/post/single/' + id);
    }
};

// POST | create a new blog post
this.save = function(req, res, next) {
    var obj = {};
    obj.titleMarkup = req.param('title');
    obj.titleHtml = marked(req.param('title'));
    obj.contentMarkup = req.param('markup');
    obj.contentHtml = marked(req.param('markup'));
    obj.created = 'POSTED ' + date.getDate();
    // if you select draft it will publish, otherwise drafts
    if (req.param('draft')===1) {
        obj.published = 0;
    } else {
        obj.published = 1;
    }
    storage.add(obj);
    res.redirect('/admin/');
};