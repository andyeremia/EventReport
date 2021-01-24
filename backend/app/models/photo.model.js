const mongoose = require("mongoose");

const Photo = mongoose.model(
  "Photo",
  new mongoose.Schema({
    name: String,
    path: String,
    type: String,
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  })
);

module.exports = Photo;
