// ------------------------------------------------------- //
//              postgre driver implementation              //
// ------------------------------------------------------- //
var pg = require('pg');
var options = require('./options');

var dbName = options.storageConfig.DB;
var tableName = options.storageConfig.TABLE_POST;
var host = options.storageConfig.HOST;
var username = options.storageConfig.user;
var password = options.storageConfig.password;

// TODO: couldn't manage to check whether the dabase present 
// before prototype calls, so copied and pasted into each of the methods
// sucks i know, but almost impossible with asynchronous nature and pg driver implementation 
var conStringPri = 'postgres://' + username + ':' + password + '@' + host + '/' + username;
var conStringPost = 'postgres://' + username + ':' + password + '@' + host + '/' + dbName;

this.Postgre = function() {
};

// add a post
this.Postgre.prototype.add = function(obj, next, err) {
    pg.connect(conStringPri, function(err, clientSin, done) {
        clientSin.query('CREATE DATABASE ' + dbName, function(err) {
            if (err)
                console.log('database : ' + dbName + ' already exists');
            clientSin.end();
            pg.connect(conStringPost, function(err, client, done) {
                client.query('CREATE TABLE IF NOT EXISTS ' + tableName +
                        ' ' +
                        '(id SERIAL, ' +
                        'title_html VARCHAR(255), ' +
                        'title_markup VARCHAR(255), ' +
                        'content_html TEXT, ' +
                        'content_markup TEXT, ' +
                        'created VARCHAR(255), ' +
                        'published SMALLINT, ' +
                        'PRIMARY KEY (id))', function(err) {
                            client.query(
                                    'INSERT INTO ' + tableName + ' ' +
                                    'VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)',
                                    [obj.titleHtml, obj.titleMarkup, obj.contentMarkup, obj.contentHtml, obj.created, obj.published]
                                    );
                        });
            });
        });
    });
};

// find all posts
this.Postgre.prototype.getAll = function(next) {
    pg.connect(conStringPri, function(err, clientSin, done) {
        clientSin.query('CREATE DATABASE ' + dbName, function(err) {
            if (err)
                console.log('database : ' + dbName + ' already exists');
            clientSin.end();
            pg.connect(conStringPost, function(err, client, done) {
                client.query('CREATE TABLE IF NOT EXISTS ' + tableName +
                        ' ' +
                        '(id SERIAL, ' +
                        'title_html VARCHAR(255), ' +
                        'title_markup VARCHAR(255), ' +
                        'content_html TEXT, ' +
                        'content_markup TEXT, ' +
                        'created VARCHAR(255), ' +
                        'published SMALLINT, ' +
                        'PRIMARY KEY (id))', function(err) {
                            client.query(
                                    'SELECT * FROM ' + tableName + ' ' +
                                    'ORDER BY id DESC',
                                    function(err, result) {
                                        if (err)
                                            console.log(err);
                                        next(result.rows);
                                    }
                            );
                        });
            });
        });
    });
};

// get all publish post ids
this.Postgre.prototype.getPublishedPosts = function(next) {

    pg.connect(conStringPri, function(err, clientSin, done) {
        clientSin.query('CREATE DATABASE ' + dbName, function(err) {
            if (err)
                console.log('database : ' + dbName + ' already exists');
            clientSin.end();
            pg.connect(conStringPost, function(err, client, done) {
                client.query('CREATE TABLE IF NOT EXISTS ' + tableName +
                        ' ' +
                        '(id SERIAL, ' +
                        'title_html VARCHAR(255), ' +
                        'title_markup VARCHAR(255), ' +
                        'content_html TEXT, ' +
                        'content_markup TEXT, ' +
                        'created VARCHAR(255), ' +
                        'published SMALLINT, ' +
                        'PRIMARY KEY (id))', function(err) {
                            client.query(
                                    'SELECT * FROM ' + tableName + ' where published = 1 ' +
                                    'ORDER BY id DESC',
                                    function(err, result) {
                                        if (err)
                                            console.log(err);
                                        next(result.rows);
                                    }
                            );
                        });
            });
        });
    });
};

// get all publish post ids
this.Postgre.prototype.getDraftPosts = function(next) {
    pg.connect(conStringPri, function(err, clientSin, done) {
        clientSin.query('CREATE DATABASE ' + dbName, function(err) {
            if (err)
                console.log('database : ' + dbName + ' already exists');
            clientSin.end();
            pg.connect(conStringPost, function(err, client, done) {
                client.query('CREATE TABLE IF NOT EXISTS ' + tableName +
                        ' ' +
                        '(id SERIAL, ' +
                        'title_html VARCHAR(255), ' +
                        'title_markup VARCHAR(255), ' +
                        'content_html TEXT, ' +
                        'content_markup TEXT, ' +
                        'created VARCHAR(255), ' +
                        'published SMALLINT, ' +
                        'PRIMARY KEY (id))', function(err) {
                            client.query(
                                    'SELECT * FROM ' + tableName + ' where published = 0 ' +
                                    'ORDER BY id DESC',
                                    function(err, result) {
                                        if (err)
                                            console.log(err);
                                        next(result.rows);
                                    }
                            );
                        });
            });
        });
    });
};

// Search for a post 
this.Postgre.prototype.lookup = function(id, next) {
    pg.connect(conStringPri, function(err, clientSin, done) {
        clientSin.query('CREATE DATABASE ' + dbName, function(err) {
            if (err)
                console.log('database : ' + dbName + ' already exists');
            clientSin.end();
            pg.connect(conStringPost, function(err, client, done) {
                client.query('CREATE TABLE IF NOT EXISTS ' + tableName +
                        ' ' +
                        '(id SERIAL, ' +
                        'title_html VARCHAR(255), ' +
                        'title_markup VARCHAR(255), ' +
                        'content_html TEXT, ' +
                        'content_markup TEXT, ' +
                        'created VARCHAR(255), ' +
                        'published SMALLINT, ' +
                        'PRIMARY KEY (id))', function(err) {
                            client.query(
                                    'SELECT * FROM ' + tableName + ' where id =$1',
                                    [id],
                                    function(err, obj) {
                                        next(err, obj.rows[0]);
                                    }
                            );
                        });
            });
        });
    });
};

//update post
this.Postgre.prototype.update = function(obj, next) {
    pg.connect(conStringPri, function(err, clientSin, done) {
        clientSin.query('CREATE DATABASE ' + dbName, function(err) {
            if (err)
                console.log('database : ' + dbName + ' already exists');
            clientSin.end();
            pg.connect(conStringPost, function(err, client, done) {
                client.query('CREATE TABLE IF NOT EXISTS ' + tableName +
                        ' ' +
                        '(id SERIAL, ' +
                        'title_html VARCHAR(255), ' +
                        'title_markup VARCHAR(255), ' +
                        'content_html TEXT, ' +
                        'content_markup TEXT, ' +
                        'created VARCHAR(255), ' +
                        'published SMALLINT, ' +
                        'PRIMARY KEY (id))', function(err) {
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
                        });
            });
        });
    });
};

this.Postgre.prototype.remove = function(id, next) {
    pg.connect(conStringPri, function(err, clientSin, done) {
        clientSin.query('CREATE DATABASE ' + dbName, function(err) {
            if (err)
                console.log('database : ' + dbName + ' already exists');
            clientSin.end();
            pg.connect(conStringPost, function(err, client, done) {
                client.query('CREATE TABLE IF NOT EXISTS ' + tableName +
                        ' ' +
                        '(id SERIAL, ' +
                        'title_html VARCHAR(255), ' +
                        'title_markup VARCHAR(255), ' +
                        'content_html TEXT, ' +
                        'content_markup TEXT, ' +
                        'created VARCHAR(255), ' +
                        'published SMALLINT, ' +
                        'PRIMARY KEY (id))', function(err) {
                            client.query(
                                    'DELETE FROM ' + tableName + ' ' +
                                    'WHERE id = $1',
                                    [id],
                                    function(err) {
                                        if (err)
                                            throw err;
                                    }
                            );
                        });
            });
        });
    });
};