// Importing necessary modules
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Importing database connection instance
const sequelize = require('../config/connection');

// Defining User model class
class User extends Model {}

// Initializing User model with properties and options
User.init({}, {});
