# Node and MySQL tutorial

In this quick tutorial we will show the most common operations with [mysql package](https://github.com/mysqljs/mysql) for [Node].

For more examples read [this tutorial](https://www.w3schools.com/nodejs/nodejs_mysql.asp) from W3Schools and also the [documentation from mysql package](https://www.w3schools.com/nodejs/nodejs_mysql.asp).

## Create a database

```sql
mysql> CREATE DATABASE nodedb;
```

## Create a user

```sql
mysql> CREATE USER 'node'@'localhost' IDENTIFIED BY 'node';
mysql> GRANT ALL PRIVILEGES ON nodedb . * TO 'node'@'localhost';
mysql> FLUSH PRIVILEGES;
```

## Create table
```sql
mysql> use nodedb;
```

```sql
mysql> CREATE TABLE workers (name VARCHAR(50), category VARCHAR(10), salary FLOAT);
```

## Load data into table

select database
```sql
mysql> use nodedb;
```

Load data from csv file

```sql
mysql> LOAD DATA LOCAL INFILE '/path/workers.txt' INTO TABLE workers FIELDS TERMINATED BY ',';
```

workers.txt
```txt
John,Python,10500
Peter,Javascript,11200
Mark,Ruby,13000
Anne,PHP,11400
Sammy,Javascript,12800
Alicia,Ruby,17000
Mary,Python,11400
Tina,PHP,9500
Bob,PHP,8000
Kirst,Python,12000
```

or
```sql
mysql> INSERT INTO workers VALUES ('John', 'Python', 10500);
mysql> INSERT INTO workers VALUES ('Peter', 'Javascript', 11200);
mysql> INSERT INTO workers VALUES ('Mark', 'Ruby', 13000);
mysql> INSERT INTO workers VALUES ('Anne', 'PHP', 11400);
mysql> INSERT INTO workers VALUES ('Sammy', 'Javascript', 12800);
mysql> INSERT INTO workers VALUES ('Alicia', 'Ruby', 17000);
mysql> INSERT INTO workers VALUES ('Mary', 'Python', 11400);
mysql> INSERT INTO workers VALUES ('Tina', 'PHP', 9500);
mysql> INSERT INTO workers VALUES ('Bob', 'PHP', 8000);
mysql> INSERT INTO workers VALUES ('Kirst', 'Python', 12000);
```

## Install mysql package

```
$ npm install mysql --save
```

## Connect

connect.js
```javascript
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "node"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
```
run
```
$ node connect
```
## Select

select.js
```javascript
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "node",
  database: "nodedb"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM workers", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
```
run
```
$ node select
```
## Insert

insert.js
```javascript
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "node",
  database: "nodedb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = "INSERT INTO workers (name, category, salary) VALUES ?";
  var values = [
    ['Ben', 'C++', 13000],
    ['William', 'Perl', 11800],
    ['Tiffany', 'C++', 14000],
    ['Viola', 'C++', 13400]
  ];

  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});
```
run
```
$ node insert
```
## Update

update.js
```javascript
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "node",
  database: "nodedb"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "UPDATE workers SET salary = 13100 WHERE name = 'Bob'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});
```
run
```
$ node update
```
## Delete

delete.js
```javascript
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "node",
  database: "nodedb"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "DELETE FROM workers WHERE name = 'Viola'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
});
```
run
```
$ node delete
```
## Create a module as service

service.js
```javascript
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "node",
  database: "nodedb"
});

const getWorkers = function (callback) {
  con.query("SELECT * FROM workers", function (err, result, fields) {
    if (err) throw err;
    callback(result);
  });
}

const getWorker = function (name, callback) {
  con.query("SELECT * FROM workers where name = ?", name, function (err, result, fields) {
    if (err) throw err;
    callback(result);
  });
}

...

service = {
    getWorkers: getWorkers,
    getWorker: getWorker,
};

module.exports = service;
```

## Use module

client.js
```javascript
const service = require("./service");

service.getWorkers(function(result) {
    console.log("Client");
    console.log(result);
});

service.getWorker("Mark", function(result) {
    console.log("Client");
    console.log(result);
});
```
run
```
$ node client
```