"use strict";
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
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
    capacity: {
      type: String,
      required:true,
      default:0
    },
    slotAvailable: {
      type: String,
      required:true,
      default:0
    },

    slotOccupied: {
      type: String,
      required:true,
      default:0
    },
    
    location:{
      type: String,
      required:true
    },
    prices:{
      type: String,
      required:true
    },
  })
);

module.exports = Parking;