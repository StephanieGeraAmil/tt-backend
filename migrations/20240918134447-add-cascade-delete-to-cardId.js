'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Notes', {
      fields: ['cardId'],
      type: 'foreign key',
      name: 'Notes_cardId_fkey',
      references: {
        table: 'Cards',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  
    await queryInterface.addConstraint('Verses', {
      fields: ['cardId'],
      type: 'foreign key',
      name: 'Verses_cardId_fkey',
      references: {
        table: 'Cards',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Notes', 'Notes_cardId_fkey');
    await queryInterface.removeConstraint('Verses', 'Verses_cardId_fkey');
  }
};
