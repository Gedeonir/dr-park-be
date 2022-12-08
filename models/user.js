"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({Role,Notification }) {
      this.belongsTo(Role, { foreignKey: "roleId", as: "role" });
      this.hasMany(Notification, {foreignKey: 'receiver',as: 'notifications',onDelete: 'CASCADE',onUpdate: 'CASCADE'});
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        passwordResetToken: undefined,
        accountActivationToken:undefined,
        updatedAt: undefined,
        createdAt: undefined,
        password: undefined,
      };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a name" },
          notEmpty: { msg: "Role must not be empty" },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a gender" },
          notEmpty: { msg: "Gender must not be empty" },
        },
      },

      district: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a District" },
          notEmpty: { msg: "District must not be empty" },
        },
      },
      sector: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a Sector" },
          notEmpty: { msg: "Sector must not be empty" },
        },
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have Cell" },
          notEmpty: { msg: "Cell must not be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have an Email" },
          notEmpty: { msg: "Email must not be empty" },
          isEmail: { msg: "Provide a valid email address" },
        },
        unique: true
      },
      telNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have Telephone Number" },
          notEmpty: { msg: "Telephone must not be empty" },
        },
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      roleId: {
        type: DataTypes.STRING,
      },
      roleName: {
        type: DataTypes.STRING,
      },
      passwordResetToken: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      profilePicture: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      accountActivationToken:{
        type: DataTypes.STRING,
        defaultValue: "",
      },
      active:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
      }
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};