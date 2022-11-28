"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "receiver", as: "Receiver" });
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
  Notification.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Notification must have title" },
          notEmpty: { msg: "Title must not be empty" },
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Notification must have content message" },
          notEmpty: { msg: "Content must not be empty" },
        },
      },
      receiver: {
        type: DataTypes.STRING,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "notifications",
      modelName: "Notification",
    }
  );
  return Notification;
};