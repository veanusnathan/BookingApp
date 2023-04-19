'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_blocked_dates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({room}) {
      // define association here
      this.belongsTo(room, {foreignKey: "room_id"})
    }
  }
  room_blocked_dates.init({
    start_blocked_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    end_blocked_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'room_blocked_dates',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  });
  return room_blocked_dates;
};