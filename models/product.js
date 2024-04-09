'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.OrderItem, {
        foreignKey: 'product_id',
        as: 'product',
      });
    }
  }
  Product.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Title is required' },
          notEmpty: { msg: 'Title is required' },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Description is required' },
          notEmpty: { msg: 'Description is required' },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Price is required' },
          notEmpty: { msg: 'Price is required' },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Stock is required' },
          notEmpty: { msg: 'Stock is required' },
        },
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Brand is required' },
          notEmpty: { msg: 'Brand is required' },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Category is required' },
          notEmpty: { msg: 'Category is required' },
        },
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Thumbnail is required' },
          notEmpty: { msg: 'Thumbnail is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
