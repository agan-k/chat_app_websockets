'use strict';

const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
      modelName: 'User',
      // Hooks allow us to run certain functions at different times in the models lifecycle
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword
    }
  });
  return User;
};

// This hook allows us to hash the password before the new user is created
const hashPassword = async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }
  return user
}