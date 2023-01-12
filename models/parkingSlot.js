"use strict";
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const ParkingSlot = mongoose.model(
  "parkingSlot",
  new Schema({
    slotCode: {
      type: String,
      required:true,
    },
    slotSize: {
      type: String,
      required:true
    },
    parking:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"parkings",
      required:true
    },
    parkingName:{
      type: String,
    },
    status:{
      type:String,
      required:true,
      default:"Available",
    },
    sensor:{
      type:String,
      required:true,
    }
  })
);
module.exports = ParkingSlot;