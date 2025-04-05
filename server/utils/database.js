const Sequelize = require("sequelize");

const sequelize = new Sequelize("blog", "root", "123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
