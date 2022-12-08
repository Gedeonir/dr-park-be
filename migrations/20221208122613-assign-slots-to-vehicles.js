"use strict"
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("assignments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
      },
      parkedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      leftAt: {
        allowNull:true,
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("assignments")
  },
}