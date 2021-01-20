const mongoose = require("mongoose");

//  Alert Code:
//  1: Cutremur
//  2: Tsunami
//  3: Bombardament

const Code = mongoose.model(
  "Code",
  new mongoose.Schema({
    alert: Number,
  })
);

module.exports = Code;
