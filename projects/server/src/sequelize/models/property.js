'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({tenant, property_image, room, location, type, property_connector}) {
      this.belongsTo(tenant, {foreignKey: 'tenant_id'})
      this.hasMany(property_image, {foreignKey: 'property_id'})
      this.hasMany(room, {foreignKey: 'property_id'})
      this.hasMany(location, {foreignKey: 'property_id'})
      this.belongsTo(type, {foreignKey: 'type_id'})
      this.hasMany(property_connector, {foreignKey: "property_id"})
    }
  }
  property.init({
    id: {
      type: DataTypes.INTEGER(50),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    tenant_id:{
      type: DataTypes.UUID,
      allowNull: false
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'property',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    timestamps: false
  });
  return property;
};