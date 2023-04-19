'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class property_accommodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({property_connector}) {
      // define association here
      this.hasMany(property_connector, {foreignKey: "property_accommodation_id"})
    }
  }
  property_accommodation.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'property_accommodation',
    freezeTableName: true,
    timestamps: false
  });
  return property_accommodation;
};