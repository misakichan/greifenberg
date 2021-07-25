const mysql = require("mysql");
const { databaseConfig } = require("../greifenberg.config");

const createConnection = (config) => {
  return mysql.createConnection(config || databaseConfig);
};

module.exports = {
  createConnection,
};
