'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('properties', {
      id: {
        type: Sequelize.INTEGER(50),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      address: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(250),
        allowNull: true
      },
      tenant_id:{
        type: Sequelize.UUID,
        allowNull: false
      },
      type_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('properties');
  }
};