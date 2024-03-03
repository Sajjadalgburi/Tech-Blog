// Import necessary modules and dependencies
const bcrypt = require('bcrypt'); // Module for hashing passwords
const sequelize = require('../config/connection'); // Sequelize connection
const { User, Post, Comment } = require('../models'); // Importing Sequelize models
const userData = require('./userData.json'); // Sample user data
const postData = require('./postData.json'); // Sample post data
const commentData = require('./commentData.json'); // Sample comment data

// Define a function to seed the database
const seedDatabase = async () => {
  // Syncing the Sequelize Database
  await sequelize.sync({ force: true });

  // Hashing User Passwords
  const hashedUserData = await Promise.all(
    userData.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10); // Hash password with bcrypt
      return { ...user, password: hashedPassword }; // Return updated user object with hashed password
    }),
  );

  // Seeding Users with Hashed Passwords
  const users = await User.bulkCreate(hashedUserData, { returning: true }); // Insert hashed user data into database

  // Seeding Posts
  const posts = await Post.bulkCreate(postData, { returning: true }); // Insert post data into database

  // Seeding Comments
  await Comment.bulkCreate(commentData); // Insert comment data into database

  // Log success message
  console.log('Database seeded successfully!');

  // Exit the process
  process.exit(0);
};
