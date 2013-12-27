// ------------------------------------------------------- //
//              postgre driver implementation              //
// ------------------------------------------------------- //
var pg = require('pg');
var options = require('./lib/models/options');
var flow = require('./lib/externals/flow');

var dbName = options.storageConfig.DB;
var tableName = options.storageConfig.TABLE_POST;
var host = options.storageConfig.HOST;
var username = options.storageConfig.user;
var password = options.storageConfig.password;
// driver does not support create if exists selection; 
// it needs to reconnect and connect back again
// therefore I ASSUME THAT DATABASE IS ALREADY CREATED!!!
// TODO: change that
var conString = 'postgres://' + username + ':' + password + '@' + host + '/' + dbName;
var client = new pg.Client(conString);
client.connect();
// assumed that database is already created
client.query('CREATE TABLE IF NOT EXISTS ' + tableName + ' ' +
        '(id SERIAL, ' +
        'title_html VARCHAR(255), ' +
        'title_markup VARCHAR(255), ' +
        'content_html TEXT, ' +
        'content_markup TEXT, ' +
        'created VARCHAR(255), ' +
        'published SMALLINT, ' + // 0:draft | 1:published
        'PRIMARY KEY (id))', function(err) {
            if (err) {
                return console.error('error running create table', err);
            }
        });
        
this.Postgre = function() {};

this.Postgre.prototype.add = function(obj, next, err) {
    if(err)
        console.log('err at addition: ' + err);
    console.log('add');
    client.query(
            'INSERT INTO ' + tableName + ' ' +
            'VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)',
            [obj.titleHtml, obj.titleMarkup, obj.contentMarkup, obj.contentHtml, obj.created, obj.published]
            );
};

// find all posts
this.Postgre.prototype.getAll = function(next) {
    client.query(
            'SELECT * FROM ' + tableName + ' ' +
            'ORDER BY id DESC',
            function(err, result) {
                if (err)
                    console.log(err);
                next(result.rows);
            }
    );
};

// get all publish post ids
this.Postgre.prototype.getPublishedPosts =function(next){
    client.query(
            'SELECT * FROM ' + tableName + ' where published = 1 ' +
            'ORDER BY id DESC',
            function(err, result) {
                if (err)
                    console.log(err);
                next(result.rows);
            }
    );
};

// get all publish post ids
this.Postgre.prototype.getDraftPosts =function(next){
    client.query(
            'SELECT * FROM ' + tableName + ' where published = 0 ' +
            'ORDER BY id DESC',
            function(err, result) {
                if (err)
                    console.log(err);
                next(result.rows);
            }
    );
};

// Search for a post 
this.Postgre.prototype.lookup = function(id, next) {
    client.query(
            'SELECT * FROM ' + tableName + ' where id =$1',
            [id],
            function(err, obj) {
                next(err, obj.rows[0]);
            }
    );
};

//update post
this.Postgre.prototype.update = function(obj, next) {
    client.query(
            'UPDATE ' + tableName + ' ' +
            'SET' + ' ' +
                    'title_html = $1,' + ' ' +
                    'title_markup = $2,' + ' ' +
                    'content_markup = $3,' + ' ' +
                    'content_html = $4,' + ' ' +
                    'created = $5,' + ' ' +
                    'published = $6' + ' ' +
                    'WHERE id = $7',
            [obj.titleHtml, obj.titleMarkup, obj.contentMarkup, obj.contentHtml, obj.created, obj.published, obj.id]
            );
};

this.Postgre.prototype.remove = function(id, next) {
    client.query(
            'DELETE FROM ' + tableName + ' ' +
            'WHERE id = $1',
            [id],
            function(err) {
                if (err)
                    throw err;
            }
    );
};


// check whether db is already created, if not create
//client.query('SELECT datname from pg_database', function(err, result) {
//    if (err) {
//        return console.error('error running query', err);
//    }
//    var isDbExists = false;
//    for (var i = 0; i < result.rows.length; i++) {
//        if (result.rows[i].datname === dbName)
//            isDbExists = true;
//    }
//    if (!isDbExists)
//        client.query('CREATE DATABASE ' + dbName, function(err) {
//            if (err) {
//                return console.error('error running create db', err);
//            }
//
//
//
//        });
//
//
//});
