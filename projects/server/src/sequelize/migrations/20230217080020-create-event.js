'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      start_date: {
        type: Sequelize.DATE,
        allowNullL: true
      },
      end_date: {
        type: Sequelize.DATE,
        allowNullL: true
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      event_rates_id:  {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      room_id:  {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events');
  }
};