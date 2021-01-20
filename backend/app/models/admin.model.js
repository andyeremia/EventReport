const mongoose = require("mongoose");

const Admin = mongoose.model(
  "Admin",
  new mongoose.Schema({
    lname: String,
    fname: String,
    phone: String,
    email: String,
  })
);

module.exports = Admin;
