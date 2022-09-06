const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bikeFinderSchema = new Schema({
  terrain: {
    type: String,
    enum: ['light', 'intense', 'all road'],
    required: true
  },
  biketype: {
    type: String,
    enum: ['normal', 'electric'],
    required: true
  },
  material: {
    type: String,
    enum: ['carbon', 'aluminum'],
    required: true
  },
  price: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  }
  
});

module.exports = model("BikeFinder", bikeFinderSchema);