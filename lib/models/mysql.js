// ------------------------------------------------------- //
//              mysql driver implementation                //
// ------------------------------------------------------- //

// calling node modules
var options = require('./options');
var mysql = require('mysql');

// config
var DB = options.storageConfig.DB;
var TABLE_POST = options.storageConfig.TABLE_POST;      
// var TABLE_COMMENT = options.storageConfig.TABLE_COMMENT;    

// connection to mysql
var loginData = {
            host: options.storageConfig.HOST,
            user: options.storageConfig.user,
            password: options.storageConfig.password
    };
var client = mysql.createConnection(loginData);
client.connect();

// create the database and tables if they are not there
client.query('CREATE DATABASE IF NOT EXISTS ' + DB);
client.query('USE ' + DB);
client.query(
        'CREATE TABLE IF NOT EXISTS ' + TABLE_POST + ' ' +
        '(id INT(11) AUTO_INCREMENT, ' +
        'title_html VARCHAR(255), ' +
        'title_markup VARCHAR(255), ' +
        'content_html TEXT, ' +
        'content_markup TEXT, ' +
        'created VARCHAR(255), ' +
        'published TINYINT(1), ' + // 0:draft | 1:published
        'PRIMARY KEY (id))');

// constructor
this.Adapter = function() {};

// add a new item
this.Adapter.prototype.add = function(obj, next) {
    client.query(
            'INSERT INTO ' + TABLE_POST + ' ' +
            'SET title_html = ?, title_markup = ?, content_markup = ?, content_html = ?, created = ?, published = ?',
            [obj.titleHtml, obj.titleMarkup, obj.contentMarkup, obj.contentHtml, obj.created, obj.published],
            next
            );
};

// find all posts
this.Adapter.prototype.getAll = function(next) {
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
this.Adapter.prototype.getPublishedPosts =function(next){
    client.query(
            'SELECT * FROM ' + TABLE_POST + ' where published = 1 ' +
            'ORDER BY id DESC',
            function(err, result) {
                if (err)
                    console.log(err);
                next(result);
            }
    );
};

// get all publish post ids
this.Adapter.prototype.getDraftPosts =function(next){
    client.query(
            'SELECT * FROM ' + TABLE_POST + ' where published = 0 ' +
            'ORDER BY id DESC',
            function(err, result) {
                if (err)
                    console.log(err);
                next(result);
            }
    );
};


// Search for a post 
this.Adapter.prototype.lookup = function(id, next) {
    client.query(
            'SELECT * FROM ' + TABLE_POST + ' where id =?',
            [id],
            function(err, obj) {
                next(err, obj[0]);
            }
    );
};

//update post
this.Adapter.prototype.update = function(obj, next) {
    client.query(
            'UPDATE ' + TABLE_POST + ' ' +
            'SET title_html = ?, title_markup = ?, content_markup = ?, content_html = ?, created = ?, published = ? ' +
            'WHERE id = ?',
            [obj.titleHtml, obj.titleMarkup, obj.contentMarkup, obj.contentHtml, obj.created, obj.published, obj.id],
            next
            );
};

// remove an item
this.Adapter.prototype.remove = function(id, next) {
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
