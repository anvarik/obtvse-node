dev-obtvse-node
========
[Obtvse](http://github.com/NateW/obtvse) nodejs implementation. 

## About
[Obtvse] (https://github.com/natew/obtvse) is developed by [@natew](https://github.com/natew) with Ruby&Rails. I am trying to convert it to nodejs with the help of @gorekee.

## Configuration
Configuration file is `config.json`. It looks as following:
```
{
    "database": "mysql",  ( mysql | postgre | herokupg )    
    "user": "root",
    "password": "1234",
    "DB": "dev_test",
    "TABLE_POST": "dev_posts",
    "HOST":"localhost",
    "PORT": "3000",
    "env": "dev",
    "postPerPage": 10,
    "login": {
        "user": "admin",
        "password": "1234"
    }
}

```
You can either run this on your own server, or use heroku. For now there are only two options: mysql and postgre. 
You need to modify `config.json` accordingly. If you want to run your own server `database` must be either 
`mysql` or `postgre`; and for heroku it must be `herokupg`.

`user` - `password` are your database credentials, 
`DB` is the database name(if you run your own server you can modify it, if you run heroku however, it will be given to you), 
`TABLE_POST` is the table name in your database, 
`HOST` is the address your server running (i.e. localhost if you run on local) or if you prefer to run on heroku it will be given, 
`PORT` is the port that this application will be running, note that it is not database port. MySql and Postgre ports are hardcoded by default, 5432 and 3306
`postPerPage` is the number of blog posts to be displayed on a page, 
`login.user` and `login.password` are the credentials that you will need to access to the blog administration.

First run `npm install` for dependencies, then run `node app.js`. You should see on your console:

```
Listening on port: 3000
```

## Screenshots
This is the window where user have drafts and completed ideas. If you come up with a new idea, you save it as a draft, and it will be located on the left side of the window. You can modify them whenever you want, and when you think they are ready, you can publish them. Published ones appear on the right.

![Drafts](http://i.imgur.com/RPFkkyF.png)



Here is an example of how to write a blog post. As you see, all distractions are removed.

![Post](http://i.imgur.com/KhNPqQY.png)



Here how your main page looks like at the end.

![Mainpage](http://i.imgur.com/DcB7GRP.png)


Note: Not working with the new updates of Jade and Express
