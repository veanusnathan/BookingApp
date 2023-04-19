'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({event_rates, status, room}) {
      this.belongsTo(status, {foreignKey: 'status_id'})
      this.belongsTo(event_rates, {foreignKey: 'event_rates_id'})
      this.belongsTo(room, {foreignKey: 'room_id'})
    }
  }
  event.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNullL: true
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNullL: true
    },
    total_rooms: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    event_rates_id:  {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    room_id:  {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'event',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    timestamps: false
  });
  return event;
};