"use strict"
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("parkings", {
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
      parkingName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"-"
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"-"
      },
      sector: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"-"
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"-"
      },
      location:{
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
    await queryInterface.dropTable("parkings")
  },
}