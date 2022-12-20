"use strict";
import mongoose, { Schema } from "mongoose";
const Parking = mongoose.model(
  "parkings",
  new Schema({
    parkingName: {
      type: String,
      required:true,
      unique: true,
    },
    district: {
      type: String,
      required:true
    },
    sector: {
      type: String,
      rewuired:true
    },
    province: {
      type: String,
      required:true
    },
    location:{
      type: String,
     required:true
    },
  })
);

export {Parking};