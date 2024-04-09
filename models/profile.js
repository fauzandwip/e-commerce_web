'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: 'user_id', as: 'profile' });
    }
  }
  Profile.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'First Name is required' },
          notEmpty: { msg: 'First Name is required' },
        },
      },
      lastName: DataTypes.STRING,
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Address is required' },
          notEmpty: { msg: 'Address is required' },
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'User Id is required' },
          notEmpty: { msg: 'User Id is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Profile',
    },
  );
  return Profile;
};
