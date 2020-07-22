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