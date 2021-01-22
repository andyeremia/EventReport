const mongoose = require("mongoose");

//  Alert Code:
//  1: Cutremur
//  2: Tsunami
//  3: Bombardament

//  Tag:
//  Minor
//  Periculos
//  Dezastruos

const Event = mongoose.model(
  "Event",
  new mongoose.Schema({
    time: Date,
    location: {
      lat: Number,
      lng: Number,
    },
    code: Number,
    desc: String,
    photo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo",
    },
    tag: String,
  })
);

module.exports = Event;
