// Importing necessary modules
const { Model, DataTypes } = require('sequelize');

// Importing database connection instance
const sequelize = require('../config/connection');

// Defining Post model class
class Post extends Model {}

// Initializing Post model with properties and options
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Post',
  },
);

module.exports = Post;
