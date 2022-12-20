"use strict";
import mongoose, { Schema } from "mongoose";
const Role = mongoose.model(
  "roles",
  new Schema({
    roleName: {
      type: String,
      required:true
    }
  })
);
export {Role};