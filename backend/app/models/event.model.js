const mongoose = require("mongoose");

const Event = mongoose.model(
  "Event",
  new mongoose.Schema({
    time: Date,
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    code: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Code",
    },
    desc: String,
    photo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo",
    },
    tag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  })
);

module.exports = Event;
