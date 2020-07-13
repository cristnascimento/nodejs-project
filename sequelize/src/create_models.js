const sequelize = require("./dbconnection");

(async () => {
  await sequelize.sync({ force: true });  
  console.log("Create models finished.")
})();