const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bikeSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  image: {
    type: String,
    unique: true,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  terrain: {
    type: String,
    required: true
  },
  biketype: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
  
});

module.exports = model("Bike", bikeSchema);