// Importing necessary modules
const { Model, DataTypes } = require('sequelize');

// Importing database connection instance
const sequelize = require('../config/connection');

// Defining User model class
class Post extends Model {}

// Initializing Post model with properties and options
Post.init({}, {});
