'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event_rates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({event}) {
      this.hasMany(event, {foreignKey: 'event_rates_id'})
    }
  }
  event_rates.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true, 
      autoIncrement: true
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    markup: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'event_rates',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    timestamps: false
  });
  return event_rates;
};