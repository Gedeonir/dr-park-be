"use strict";
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const User = mongoose.model(
  "users",
  new Schema({
    name: {
      type: String,
      required:true
    },
    gender: {
      type: String,
      required:true
    },

    district: {
      type: String,
      required:true,
    },
    sector: {
      type: String,
      required:true
    },
    province: {
      type: String,
      required:true
    },
    email: {
      type: String,
      required:true,
      unique: true
    },
    telNumber: {
      type: String,
      required:true,
    },
    password: {
      type: String,
      required:true
    },
    roleName: {
      type: String,
      default:'user'
    },
    passwordResetToken: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      defaultValue:"",
    },
    accountActivationToken:{
      type: String,
      default: "",
    },
    active:{
      type:Boolean,
      default:false
    }
  })
);
module.exports = User;