"use strict";
import mongoose, { Schema } from "mongoose";
const Locations = mongoose.model(
  "locations",
  new Schema({
    Location: {
      type: String,
      required:true
    },
    Street:{
        type: String,
        required:true
    }
  })
);
export {Location};