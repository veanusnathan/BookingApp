'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_connector extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({room, room_accommodation}) {
      // define association here
      this.belongsTo(room, {foreignKey: "room_id"})
      this.belongsTo(room_accommodation, {foreignKey: "room_accommodation_id"})
    }
  }
  room_connector.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    sequelize,
    modelName: 'room_connector',
    freezeTableName: true,
    timestamps: false
  });
  return room_connector;
};