'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tenant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({property, users, tenant_details}) {
      this.hasMany(property, {foreignKey: 'tenant_id'})
      this.belongsTo(users, {foreignKey: 'users_id'})
      this.hasOne(tenant_details, {foreignKey: 'tenant_id'})
    }
  }
  tenant.init({
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
    picture_path: {
      type: DataTypes.TEXT,
      allowNull: true
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
    address: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(250),
      allowNullL: false,
      notEmpty: {msg: "User password must not be empty"},
      notNull: {msg: "User must have a password"}
    },
    phone_number: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "unconfirmed"
    },
    otp_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    otp_created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ktp_path: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "tenant"
    },
    users_id: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'tenant',
    freezeTableName: true,
  });
  return tenant;
};