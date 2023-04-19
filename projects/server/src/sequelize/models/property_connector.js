'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class property_connector extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({property_accommodation, property}) {
      // define association here
      this.belongsTo(property_accommodation, {foreignKey: "property_accommodation_id"})
      this.belongsTo(property, {foreignKey: "property_id"})
    }
  }
  property_connector.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    sequelize,
    modelName: 'property_connector',
    freezeTableName: true,
    timestamps: false
  });
  return property_connector;
};