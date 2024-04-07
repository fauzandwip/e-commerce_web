'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'Email is required' },
          notEmpty: { msg: 'Email is required' },
          isEmail: { msg: 'Invalid email format' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Password is required' },
          notEmpty: { msg: 'Password is required' },
          len: {
            args: [5, 15],
            msg: 'Password must be between 5 to 15 characters',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'buyer',
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );

  User.beforeCreate((instance) => {
    instance.password = hashPassword(instance.password);
  });
  return User;
};