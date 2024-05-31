'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('People', [{
      id: 1,
      name: 'marti',
      email: 'marti@gmail.com',
      role : 'admin',
      password :'123456',
      refresh_token: null,
      createdAt: null,
      updatedAt: null
    },
    {
      id: 2,
      name: 'marto',
      email: 'marto@gmail.com',
      role : 'member',
      password :'123456',
      refresh_token: null,
      createdAt: null,
      updatedAt: null
    },
    {
      id: 3,
      name: 'marta',
      email: 'marta@gmail.com',
      role : 'super admin',
      password :'123456',
      refresh_token: null,
      createdAt: null,
      updatedAt: null
    },
    {
      id: 4,
      name: 'marte',
      email: 'marte@gmail.com',
      role : 'admin',
      password :'123456',
      refresh_token: null,
      createdAt: null,
      updatedAt: null
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  }
};
