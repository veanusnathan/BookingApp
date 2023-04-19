'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({transactions, status, review}) {
      this.belongsTo(transactions, {foreignKey: 'transactions_id'})
      this.belongsTo(status, {foreignKey: 'status_id'})
    }
  }
  transactions_history.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    transactions_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status_id:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 4
    }
  }, {
    sequelize,
    modelName: 'transactions_history',
    freezeTableName: true
  });
  return transactions_history;
};