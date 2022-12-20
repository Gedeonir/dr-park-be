"use strict";
import mongoose, { Schema } from "mongoose";
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
  export {Notification};