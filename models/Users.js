// Importing necessary modules
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Importing database connection instance
const sequelize = require('../config/connection');

// Defining User class which extends Model
class User extends Model {
  // Method to check if the provided password matches the hashed password stored for the user
  checkPassword(userPass) {
    // Using bcrypt's compareSync method to compare the provided password with the hashed password
    return bcrypt.compareSync(userPass, this.password);
  }
}

// Initializing User model with properties and options
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        try {
          newUserData.email = await newUserData.email.toLowerCase();

          newUserData.password = await bcrypt.hash(newUserData.password, 15);
          return newUserData;
        } catch (err) {
          console.error(err);
        }
      },

      beforeUpdate: async (updateUserData) => {
        try {
          if (updateUserData.email) {
            updateUserData.email = await updateUserData.email.toLowerCase();
          }

          if (updateUserData.password) {
            updateUserData.password = await bcrypt.hash(
              updateUserData.password,
              15,
            );
          }
          return updateUserData;
        } catch (err) {
          console.error(err);
        }
      },
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  },
);

module.exports = User;
