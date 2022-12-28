"use strict";
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Role = mongoose.model(
  "roles",
  new Schema({
    roleName: {
      type: String,
      required:true
    }
  })
);
module.exports = Role;