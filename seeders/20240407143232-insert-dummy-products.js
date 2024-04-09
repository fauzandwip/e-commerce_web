'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products = require('../data_dummy/products.json').map((product) => {
      product.createdAt = product.updatedAt = new Date();
      return product;
    });

    await queryInterface.bulkInsert('Products', products);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
  },
};
