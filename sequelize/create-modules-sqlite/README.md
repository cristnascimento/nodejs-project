# Node, Sequelize and SQLite Tutorial

## Description

In this tutorial will show you a simple way of organizing your app with sequelize.

## Dependencies

* Ubuntu 18.04
* Node and Npm
* SQLite3
* Sequelize

## Install SQLite3

```
$ npm install sqlite3
```

## Install Sequelize

```
$ npm install sequelize
```

## Using Sequelize

The simplest way of using sequelize is putting everything in a single file like this
```javascript
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './janedoe.sqlite',
  logging: false
});

class User extends Model {}
User.init({
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, { sequelize, modelName: 'User' });

(async () => {
  await sequelize.sync();
  const jane = await User.create({
    firstName: 'Jane',
    lastName: 'Doe',
    username: 'janedoe',
    email: 'janedoe@gmail.com',
    password: 'janedoe',
  });
  console.log(jane.toJSON());
})();
```

In that code we are connecting to the database, declaring our model, creating the table on the database and inserting a record into the database.

## Organizing the code in different files

A good idea is splitting the different actions in different files. Thus, you can change a specific part of your app without interfering in other part.

You can organize it in the way you prefer. Here, we show a simple way of doing this.

For example, creating a module for the connection with the database, `connection.py`

```javascript
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './janedoe.sqlite',
  logging: false
});

module.exports.sequelize = sequelize;
```

A module for defining one of our models, `user.py`

```javascript
const { Sequelize, Model, DataTypes } = require('sequelize');
const { sequelize } = require('./connection');

class User extends Model {}
User.init({
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, { sequelize, modelName: 'User' });

module.exports.User = User;
```

A module for creating the tables on the database, `connection.js`

```javascript
const { sequelize } = require('./connection');
const { User } = require('./user');

(async () => {
  await sequelize.sync();
})();
```
In this module, we can import all of our defined models and create then on database.

Finally, we can use the models and insert data into the database, `insert.js`
```javascript
const { User } = require('./user');

(async () => {
  const jane = await User.create({
    firstName: 'Jane',
    lastName: 'Doe',
    username: 'janedoe',
    email: 'janedoe@gmail.com',
    password: 'janedoe',
  });
  console.log(jane.toJSON());
})();
```

Find the inserted record, `find.js`
```javascript
const { User } = require("./user");

const id = 1;

(async () => {
    const user = await User.findByPk(id);
    if (user == null) {
        console.log("Not found!");
    }
    else {
        console.log(user.toJSON());
    }
})();
```

We can also create a directory `models` and separate it from other parts of your code.

## Conclusion

It is a good idea create different files or modules with specific responsabilities in your app. Here we introduced you a simple idea for organizing your code but you can think what works best for your project.

Learn more:

* [Getting Started - Sequelize](https://sequelize.org/master/manual/getting-started.html)