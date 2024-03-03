// Importing necessary modules
const { Model, DataTypes } = require('sequelize');

// Importing database connection instance
const sequelize = require('../config/connection');

// Defining Comment model class
class Comment extends Model {}

// Initializing Comment model with properties and options
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Post',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  },
);

module.exports = Comment;
