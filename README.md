nodeblog
========
[Obtvse](http://github.com/NateW/obtvse) nodejs implementation. 

## About
[Obtvse] (https://github.com/natew/obtvse) is developed by [@natew](https://github.com/natew) with Ruby&Rails. I am trying to convert it to nodejs with the help of @gorekee.

## Configuration
Configuration file is `config.json`. It looks as following:
```
  {
      "user": "mysql_username",
      "password": "mysql_password",
      "DB": "mysql_db_name", 
      "TABLE_POST": "posts",
      "TABLE_PUBLISH": "publish",
      "TABLE_COMMENT": "comment",
      "PORT": "3000",
      "env": "dev",
      "postPerPage": 10,
      "login": {
          "user": "obtvse_admin_username",
          "password": "obvtse_admin_password"
      }
  }
```
`user` - `password` are your database credentials (for now only mysql), `DB` is the database name, some table names are `TABLE_*`,`PORT` is the port your node server is running, `postPerPage` is the number of blog posts to be displayed on a page, `login.user` and `login.password` are the credentials that you will need to access to the blog administration.

First to run `npm install` for dependencies, then run `node app.js`. You should see on your console:
```
Listening on port: 3000
```

## Screenshots
This is the window where user have work in progress and completed ideas. If you come up with a new idea, you save it as a draft, and it will be located on the left side of the window. You can modify them whenever you want, and when you think they are ready, you can post them. Posted ones appear on the right:
![Drafts](http://i.imgur.com/ValJNob.png)


Here you write your post: 
![Post](http://i.imgur.com/1oaUg5d.png)


Here how your main page looks like:
![Mainpage](http://i.imgur.com/i5oywWM.png)


Note: Not working with the new updates of Jade and Express
