// Import necessary modules and dependencies
const bcrypt = require('bcrypt'); // Module for hashing passwords
const sequelize = require('../config/connection'); // Sequelize connection
const { User, Post, Comment } = require('../models'); // Importing Sequelize models
const userData = require('./userData.json'); // Sample user data
const postData = require('./postData.json'); // Sample post data
const commentData = require('./commentData.json'); // Sample comment data

// Define a function to seed the database
const seedDatabase = async () => {};
