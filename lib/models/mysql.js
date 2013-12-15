// mysql implementation
require('console-trace');

var abstract = require('./abstract'),
        mysql = require('mysql'),
        DB = abstract.config.DB,
        TABLE_POST = abstract.config.TABLE_POST,
        TABLE_PUBLISH = abstract.config.TABLE_PUBLISH,
        TABLE_COMMENT = abstract.config.TABLE_COMMENT,
        loginData = {
            host: 'localhost',
            user: abstract.config.user,
            password: abstract.config.password
        },
        client = mysql.createConnection(loginData);

 client.connect();
 
// set db
client.query('USE ' + DB);

// constructor
this.MySql = function() {};

// add a new item
this.MySql.prototype.add = function(obj, next) {
    client.query(
        'INSERT INTO ' + TABLE_POST + ' ' +
        'SET title_html = ?, title_markup = ?, content_markup = ?, content_html = ?, created = ?',
        [obj.titleHtml, obj.titleMarkup, obj.contentMarkup, obj.contentHtml, obj.created],
        next
    );
};

// find all items
this.MySql.prototype.getAll = function(next) {
    client.query(
        'SELECT * FROM ' + TABLE_POST + ' ' +
        'ORDER BY id DESC',
        function(err, result) {
            if(err) 
                console.t.log(err);
            next(result);
        }
    );
};

// get all publish post ids
this.MySql.prototype.getPubPostIds = function(next) {
    client.query(
        'SELECT * FROM ' + TABLE_PUBLISH + ' ',
        function(err, result) {
            if(err) 
                return next(err);
            next(result);
        }
    );
};

//update post
this.MySql.prototype.update = function(obj, next) {
    client.query(
        'UPDATE ' + TABLE_POST + ' ' +
        'SET title_html = ?, title_markup = ?, content_markup = ?, content_html = ?, created = ? ' +
        'WHERE id = ?',
        [obj.titleHtml, obj.titleMarkup, obj.contentMarkup, obj.contentHtml, obj.created, obj.id],
        next
    );
};

// remove an item
this.MySql.prototype.remove = function(id, next) {
    client.query(
        'DELETE FROM ' + TABLE_POST + ' ' +
        'WHERE id = ?',
        [id],
        function(err) {
            if(err) 
                throw err;
            next();
        }
    );
};

// search for a post
this.MySql.prototype.lookup = function(id, next) {
    client.query(
        'SELECT post.*, pub.post_id ' +
        'FROM ' + TABLE_POST + ' post ' +
        'LEFT OUTER JOIN ' + TABLE_PUBLISH + ' pub ON post.id = pub.post_id ' +
        'WHERE post.id = ?',
        [id],
        function(err, obj) {
            next(err, obj[0]);
        }
    );
};

// get last post by id
this.MySql.prototype.getLast = function(next) {
    client.query(
        'SELECT * FROM ' + TABLE_POST + ' ' +
        'ORDER BY id DESC ' +
        'LIMIT 1',
        function(err, obj) {
            next(err, obj[0]);
        }
    );
};

// insert post id into publish table
this.MySql.prototype.publishPost = function(id) {
    this.unpublishPost(id);
    client.query(
        'INSERT INTO ' + TABLE_PUBLISH + ' ' +
        'SET post_id = ?',
        [id]
    );
};

// remove post id from publish table
this.MySql.prototype.unpublishPost = function(id) {
    client.query(
        'DELETE FROM ' + TABLE_PUBLISH + ' ' +
        'WHERE post_id = ?',
        [id]
    );
};