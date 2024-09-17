'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Cards', 'order', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, // Provide a default value if needed
    });
    await queryInterface.removeColumn('Cards', 'content');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Cards', 'order');
    await queryInterface.addColumn('Cards', 'content', {
      type: Sequelize.TEXT,
     
    });
  }
};
