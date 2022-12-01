"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ParkingSlot extends Model {
    static associate({Parking }) {
      this.belongsTo(Parking, {foreignKey: 'parking',as: 'Parking'});
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
  ParkingSlot.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      slotCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Slot must have a unique code" },
          notEmpty: { msg: "slotCode must not be empty" },
        },
        unique: true,
      },
      slotSize: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Slot must have size" },
          notEmpty: { msg: "SlotSize must not be empty" },
        },
      },
      parking:{
        type: DataTypes.STRING,
      },
      parkingName:{
        type: DataTypes.STRING,
      },
      status:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"Available",
        validate:{
          notNull:{msg:"Slot must have status"},
          notEmpty:{msg:"status must not be empty"}
        }
      },
    },
    {
      sequelize,
      tableName: "parkingSlots",
      modelName: "ParkingSlot",
    }
  );
  return ParkingSlot;
};