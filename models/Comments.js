// Importing necessary modules
const { Model, DataTypes } = require('sequelize');

// Importing database connection instance
const sequelize = require('../config/connection');

// Defining Post model class
class Comment extends Model {}

// Initializing Comment model with properties and options
Comment.init({}, {});
