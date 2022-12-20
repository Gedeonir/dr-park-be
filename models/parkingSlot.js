"use strict";
import mongoose, { Schema } from "mongoose";
const ParkingSlot = mongoose.model(
  "parkingSlot",
  new Schema({
    slotCode: {
      type: String,
      required:true,
      unique: true,
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
export {ParkingSlot};