'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, { foreignKey: 'user_id', as: 'profile' });
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
            args: [5],
            msg: 'Password must be less than or equal to 5 characters',
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

  User.beforeUpdate((instance) => {
    instance.password = hashPassword(instance.password);
  });
  return User;
};
