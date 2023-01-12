"use strict";
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Booking = mongoose.model(
    "bookings",
    new Schema({
      parking:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"parkings",
        required:true
      },
      parkingName:{
        type: String,
        required:true
      },
      slotId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"parkingSlots",
        required:true
      },
      slot:{
        type: String,
        required:true
      },
      vehiclePlateNumber: {
        type: String,
        required:true,
      },
      email: {
        type: String,
      },
      names: {
        type: String,
      },
      checkInDate: {
        type: String,
      },
      checkoutDate: {
        type: String
      },
      checkInTime: {
        type: String,
      },
      checkoutTime: {
        type: String
      },
      phoneNumber:{
        type:String,
      },
      status:{
        type:String,
        default:"pending"
      },
      type:{
        type:String,
        default:"reservation"
      }
    })
  );
  module.exports = Booking;