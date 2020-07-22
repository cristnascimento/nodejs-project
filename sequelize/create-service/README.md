# Node and Sequelize (with MySQL) tutorial

## Description

In this quick tutorial we will show the most common operations with [Sequelize](https://sequelize.org) for [Node](https://nodejs.org).

For more detailed documentation read [this tutorial](https://sequelize.org/master/manual/getting-started.html) from [Sequelize](https://sequelize.org).

## Dependencies

* Ubuntu 18.04
* MySQL
* Sequelize

## Install Sequelize package

```
$ npm install --save sequelize
```

## Install MySQL package

```
$ npm install --save mysql2
```

Read [this quick start](https://sequelize.org/master/manual/getting-started.html) from Sequelize.
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

## Create connection

dbconnection.js
```javascript
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodedb', 'node', 'node', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
```

## Create model

employee.js
```javascript
const { DataTypes, Model } = require('sequelize');
const sequelize = require('./dbconnection');

class Employee extends Model {}

Employee.init({
  
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salary: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {  
  sequelize, 
  modelName: 'Employee' // We need to choose the model name
});

(async () => {
  await sequelize.sync({ force: true });  
  console.log("Create models finished."); 
})();

module.exports = Employee;
```

## Create table

```
$ node employee
```
The function below will destroy (if exists) and create a table for `Employee`
```javascript
(async () => {
  await sequelize.sync({ force: true });  
  console.log("Create models finished."); 
})();
```
Make sure it runs only once and then comment or remove from **_employee.js_**.

## Load data into `Employee`

```sql
mysql> LOAD DATA LOCAL INFILE '/path/workers.txt' INTO TABLE Employees 
  FIELDS TERMINATED BY ',' 
  (@col1, @col2, @col3) set name=@col1, category=@col2, salary=@col3,createdAt=now();
```

data/workers.txt
```
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

## Create a module as service

service.js
```javascript
const Employee = require("./employee");

const getEmployees = (async (callback) => {
  const employees = await Employee.findAll();
  callback(employees);
});

const getEmployee = (async (name, callback) => {
  const employee = await Employee.findOne({ where: { name: name } });
  callback(employee);
});

const createEmployee = ( async(employee, callback) => {
  const result = await Employee.create(employee);
  callback(result);
});

const updateEmployee = ( async(employee, callback) => {
  const toUpdate = await Employee.findOne({ where: {name: employee.name} });
  toUpdate.category = employee.category;
  toUpdate.salary = employee.salary;
  result = await toUpdate.save();
  callback(result);
});

const deleteEmployee = ( async(name, callback) => {
  const employee = await Employee.findOne({ where: {name: name} });
  result = await employee.destroy();
  callback(result);
});

const service = {
  getEmployees: getEmployees,
  getEmployee: getEmployee,
  createEmployee: createEmployee,
  updateEmployee: updateEmployee,
  deleteEmployee: deleteEmployee,
};

module.exports = service;
```

## Use service in your app

app.js
```javascript
const service = require("./service");

service.getEmployees(function(results) {
  console.log(JSON.stringify(results, null, 2));
});

service.getEmployee('Mark', function(result) {
  console.log(JSON.stringify(result, null, 2));
});

let employee = {name: 'Jean', category: 'C++', salary: 14300};
service.createEmployee(employee, function(result) {
  console.log(JSON.stringify(result, null, 2));
});

let employeeToUpdate = {name: 'John', category: 'C++', salary: 15000};
service.updateEmployee(employeeToUpdate, function(result) {
  console.log(JSON.stringify(result, null, 2));
});

service.deleteEmployee('Peter', function(result) {
  console.log(JSON.stringify(result, null, 2));
});
```
run
```
$ node app
```

## Congratulations

You have finished this Sequelize tutorial. Congratulations!

Learn more from Sequelize [Documentation](https://sequelize.org/master/manual/).