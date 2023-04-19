'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tenants', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        allowNull: false,
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
      picture_path: {
        type: Sequelize.TEXT,
        allowNull: true
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
      address: {
        type: Sequelize.STRING(250),
        allowNull: true,
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
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: "unconfirmed"
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
        defaultValue: "tenant"
      },
      ktp_path: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      users_id: {
        type: Sequelize.UUID,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tenants');
  }
};