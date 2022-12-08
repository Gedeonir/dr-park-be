"use strict";
const { Model } = require("sequelize");
const parkingSlot = require("./parkingSlot");
module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model {
    static associate({ParkingSlot,Parking}) {
      this.belongsTo(ParkingSlot, { foreignKey: "Slot", as: "parkingSlot" });
      this.belongsTo(Parking, { foreignKey: "parking", as: "Parking" })
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
  Assignment.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      parking:{
        type: DataTypes.STRING,
      },
      parkingName:{
        type: DataTypes.STRING,
      },
      slotId:{
        type: DataTypes.STRING,
      },
      Slot:{
        type: DataTypes.STRING,
      },
      vehiclePlateNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Vehicle plate number must have a District" },
          notEmpty: { msg: "Vehicle plate number must not be empty" },
        },
        unique:true
      },
      parkedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      leftAt: {
        type: DataTypes.DATE,
      },
      totalParkedTimeMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      totalPriceToPay: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
    },
    {
      sequelize,
      tableName: "assignments",
      modelName: "Assignment",
    }
  );
  return Assignment;
};