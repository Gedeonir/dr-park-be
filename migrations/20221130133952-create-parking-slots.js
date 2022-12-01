"use strict"
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("parkingSlots", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      slotCode: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"-"
      },
      slotSize:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"-"
      },
      parking:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"-"
      },
      parkingName:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"-"
      },
      status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"Available"
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
    await queryInterface.dropTable("parkingSlots")
  },
}