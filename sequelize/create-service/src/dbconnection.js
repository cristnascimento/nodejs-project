const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodedb', 'node', 'node', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;