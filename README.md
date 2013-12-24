nodeblog
========
[Obtvse](http://github.com/NateW/obtvse) nodejs implementation. 

## About
[Obtvse] (https://github.com/natew/obtvse) is developed by [@natew](https://github.com/natew) with Ruby&Rails.  
I am trying to convert it to nodejs.

## Configuration
Configuration file is `config.json`. It looks as following:

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

`user` & `password` are your database username & password. `DB` is the database that you will store your blog posts. Web site content
is stored in `TABLE_*`. `PORT` is the port your node server is running. `postPerPage` is modifiable as well. Finally set your admin login and password.

Set MySql database and login information into the config.json under user/password.
Set Admin module login information under login.user/login.password. 
First run `npm install` for dependencies, then run `node app.js` in order to start the server.

## Screenshots
![Admin](http://i.imgur.com/hfnm9.png)
![Draft](http://i.imgur.com/x4lXL.png)
![Live](http://i.imgur.com/wbVJN.png)

Note: Not working with the bew updates of Jade and Express!