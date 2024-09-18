'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Decks', 'Decks_userId_fkey');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Decks', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'Decks_userId_fkey',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'NO ACTION',
    });
  }
};





