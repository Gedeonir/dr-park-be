"use strict";
import mongoose, { Schema } from "mongoose";
const Assignment = mongoose.model(
    "assignments",
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
      Slot:{
        type: String,
        required:true
      },
      vehiclePlateNumber: {
        type: String,
        required:true,
        unique:true
      },
      parkedAt: {
        type: String,
      },
      leftAt: {
        type: String,
      },
      totalParkedTimeMinutes: {
        type: String,
      },
      totalPriceToPay: {
        type: String
      },
    })
  );
  export {Assignment};