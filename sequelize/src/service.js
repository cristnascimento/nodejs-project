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
