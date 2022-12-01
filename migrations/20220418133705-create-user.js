"use strict"
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("users", {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"-"
      },
      gender: {
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      roleId: {
        type: DataTypes.STRING,
        defaultValue:"-"
      },
      roleName: {
        type: DataTypes.STRING,
        defaultValue: "User",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      passwordResetToken: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      accountActivationToken: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      profilePicture: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      active:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
      }
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("users")
  },
}