'use strict';

const { hashPassword } = require('../helpers/bcrypt');

require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = {
      email: process.env.ADMIN_EMAIL,
      password: hashPassword(process.env.ADMIN_PASSWORD),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await queryInterface.bulkInsert('Users', [user]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
