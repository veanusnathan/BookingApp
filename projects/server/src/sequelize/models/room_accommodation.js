'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_accommodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({room_connector}) {
      // define association here
      this.hasMany(room_connector,{foreignKey: "room_accommodation_id"})
    }
  }
  room_accommodation.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'room_accommodation',
    freezeTableName: true,
    timestamps: false,
  });
  return room_accommodation;
};