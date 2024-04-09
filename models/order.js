'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasMany(models.OrderItem, { foreignKey: 'order_id', as: 'items' });
      Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }
  Order.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'User Id is required' },
          notEmpty: { msg: 'User Id is required' },
        },
      },
      total_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Total Amount is required' },
          notEmpty: { msg: 'Total Amount is required' },
        },
      },
      status: {
        type: DataTypes.ENUM('pending', 'processing', 'delivered'),
        allowNull: false,
        defaultValue: 'pending',
        validate: {
          isIn: {
            args: [['pending', 'processing', 'delivered']],
            msg: 'Invalid order status. Allowed values are: pending, processing, delivered.',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
