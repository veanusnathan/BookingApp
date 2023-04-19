'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, room, transactions_history}) {
      this.belongsTo(users, {foreignKey: 'users_id'})
      this.belongsTo(room, {foreignKey: 'room_id'})
      this.hasMany(transactions_history, {foreignKey: 'transactions_id'})
    }
  }
  transactions.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    users_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 4
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    check_in: {
      type: DataTypes.DATE,
      allowNull: false
    },
    check_out: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expired: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    image_path: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    total_guest: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'transactions',
    freezeTableName: true
  });
  return transactions;
};