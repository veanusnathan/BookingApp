'use strict';
const {
  Model, UUIDV4, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({transactions, review, tenant, users_details}) {
      this.hasMany(transactions, {foreignKey: 'users_id'})
      this.hasMany(review, {foreignKey: 'users_id'})
      this.hasOne(tenant, {foreignKey: 'users_id'})
      this.hasOne(users_details, {foreignKey: 'users_id'})
    }
  }
  users.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4
    },
    first_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "unconfirmed"
    },
    email: {
      type: DataTypes.STRING(250),
      unique: {msg: "Email already registered"},
      allowNull: false,
      validate: {
        isEmail: {msg : "Enter a valid email address"},
        notEmpty: {msg: "Field cannot blank"},
        notNull: {msg: " User must have an email"},
      }
    },
    password: {
      type: DataTypes.STRING(250),
      allowNullL: true,
      notEmpty: {msg: "User password must not be empty"},
      notNull: {msg: "User must have a password"}
    },
    phone_number: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    otp_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    otp_created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "user"
    },
    google_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isFromGoogle: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, 
  {
    sequelize,
    modelName: 'users',
    freezeTableName: true,
  });
  return users;
};