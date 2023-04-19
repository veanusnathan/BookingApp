'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({transactions_history, event}) {
      this.hasMany(transactions_history, {foreignKey: 'status_id'})
      this.hasMany(event, {foreignKey: 'status_id'})
    }
  }
  status.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'status',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    timestamps: false
  });
  return status;
};