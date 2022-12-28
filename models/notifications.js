"use strict";
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Notification = mongoose.model(
    "notifications",
    new Schema({
      title: {
        type: String,
        required:true
      },
      content: {
        type: String,
        required:true
      },
      receiverID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
      },
      receiver: {
        type: String,
      },
      isRead: {
        type: Boolean,
        default: false,
      },
    })
  );
  module.exports = Notification;