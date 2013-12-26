// ------------------------------------------------------- //
//              mysql driver implementation                //
// ------------------------------------------------------- //

// calling node modules
var options = require('./options');
var mysql = require('mysql');

// config
var DB = options.storageConfig.DB;
var TABLE_POST = options.storageConfig.TABLE_POST;        
var TABLE_PUBLISH = options.storageConfig.TABLE_PUBLISH;
var TABLE_COMMENT = options.storageConfig.TABLE_COMMENT;    

// connection to mysql
var loginData = {
            host: options.storageConfig.HOST,
            user: options.storageConfig.user,
            password: options.storageConfig.password
    };
var client = mysql.createConnection(loginData);
client.connect();

// create the database and tables if they are not there
client.query('CREATE DATABASE IF NOT EXISTS' + DB, function() {
    client.query(
        'CREATE TABLE IF NOT EXISTS ' + TABLE_POST +
        '(id INT(11) AUTO_INCREMENT, ' +
        'title_html VARCHAR(255), ' +
        'title_markup VARCHAR(255), ' +
        'content_html TEXT, ' +
        'content_markup TEXT, ' +
        'created VARCHAR(255), ' +
        'PRIMARY KEY (id))');
    client.query(
        'CREATE TABLE IF NOT EXISTS ' + TABLE_PUBLISH +
        '(id INT(11) AUTO_INCREMENT, ' +
        'post_id INT(11), ' +
        'PRIMARY KEY (id))');
});

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
                if (err)
                    console.log(err);
                next(result);
            }
    );
};

// get all publish post ids
this.MySql.prototype.getPubPostIds = function(next) {
    client.query(
            'SELECT * FROM ' + TABLE_PUBLISH + ' ',
            function(err, result) {
                if (err)
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
                if (err)
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