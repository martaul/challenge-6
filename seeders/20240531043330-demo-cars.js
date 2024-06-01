'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('cars', [{
    id: 5,
    name: 'Honda',
    harga: '1.000.000',
    image: '1716995530224-download (8).jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'marte',
    updatedBy: 'marti',
    deletedBy: 0,
    userId: null
  },
  {
    id: 6,
    name: 'kawasaki',
    harga: '5.000.000',
    image: '1716995347605-download (5).jpeg',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'marte',
    updatedBy: '0',
    deletedBy: 0,
    userId: null
  }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
    
  }
};
