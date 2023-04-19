'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({room}) {
      this.belongsTo(room, {foreignKey: 'room_id'})
    }
  }
  room_image.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'room_image',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    timestamps: false
  });
  return room_image;
};