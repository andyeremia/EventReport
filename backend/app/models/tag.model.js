const mongoose = require("mongoose");

//  Tag:
//  Minor
//  Periculos
//  Dezastruos

const Tag = mongoose.model(
  "Tag",
  new mongoose.Schema({
    name: String,
  })
);

module.exports = Tag;
