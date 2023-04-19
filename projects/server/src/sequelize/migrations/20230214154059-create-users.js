'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      first_name: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: "unconfirmed"
      },
      email: {
        type: Sequelize.STRING(250),
        unique: {msg: "Email already registered"},
        allowNull: false,
        validate: {
          isEmail: {msg : "Enter a valid email address"},
          notEmpty: {msg: "Field cannot blank"},
          notNull: {msg: " User must have an email"},
        }
      },
      password: {
        type: Sequelize.STRING(250),
        allowNullL: false,
        notEmpty: {msg: "User password must not be empty"},
        notNull: {msg: "User must have a password"}
      },
      phone_number: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      otp_code: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      otp_created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: "user"
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};