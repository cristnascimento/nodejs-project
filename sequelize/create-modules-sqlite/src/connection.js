const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './janedoe.sqlite',
  logging: false
});

module.exports.sequelize = sequelize;
