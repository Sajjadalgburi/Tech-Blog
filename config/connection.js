// Importing Sequelize library
const Sequelize = require('sequelize');

// Importing dotenv for environment variables
require('dotenv').config();

// Creating a new Sequelize instance with environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: 'localhost', // Database host
    dialect: 'mysql', // Database dialect (MySQL in this case)
    port: 3306, // Database port
  },
);

// Exporting the sequelize instance
module.exports = sequelize;
