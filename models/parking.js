"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parking extends Model {
    static associate({ParkingSlot,Assignment }) {
      this.hasMany(ParkingSlot, {foreignKey: 'parking',as: 'parkingSlot',onDelete:'CASCADE',onUpdate:'CASCADE'});
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        updatedAt: undefined,
        createdAt: undefined,
      };
    }
  }
  Parking.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      parkingName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Slot must have a name" },
          notEmpty: { msg: "Slot must not be empty" },
        },
        unique: true,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Parking must have a District" },
          notEmpty: { msg: "District must not be empty" },
        },
      },
      sector: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Parking must have a Sector" },
          notEmpty: { msg: "Sector must not be empty" },
        },
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Parking must have Cell" },
          notEmpty: { msg: "Cell must not be empty" },
        },
      },
      location:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Parking must have a exact Location" },
          notEmpty: { msg: "Location must not be empty" },
        },
      },
      status:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"Available",
        validate:{
          notNull:{msg:"Slot must have status"},
          notEmpty:{msg:"status must not be empty"}
        }
      }
    },
    {
      sequelize,
      tableName: "parkings",
      modelName: "Parking",
    }
  );
  return Parking;
};