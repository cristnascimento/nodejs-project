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
  /* await sequelize.sync({ force: true });  
  console.log("Create models finished."); */
})();

module.exports = Employee;
