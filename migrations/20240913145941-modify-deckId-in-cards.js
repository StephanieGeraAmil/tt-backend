'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Cards', 'deckId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Decks', 
        key: 'id',
      },
      onDelete: 'CASCADE', 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Cards', 'deckId', {
      type: Sequelize.INTEGER,
      allowNull: true, 
      references: null,
      onDelete: null,
    });
  }
};
