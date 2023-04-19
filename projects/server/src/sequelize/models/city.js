'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class city extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({location}) {
      this.hasOne(location, {foreignKey: 'city_id'})
    }
  }
  city.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false, 
      autoIncrement: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'city',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    timestamps: false
  });
  return city;
};