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
      },
      idNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false,
        default:"-"
      },
      sector: {
        type: DataTypes.STRING,
        allowNull: false,
        default:"-"
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
        default:"-"
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
        type: DataTypes.INTEGER,
      },
      roleName: {
        type: DataTypes.STRING,
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
      profilePicture: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("users")
  },
}