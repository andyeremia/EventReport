const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

// Insert all models here like:
//
// db.user = require("./user.model")
//
// asa poti sa le folosesti si in alte fisiere
// ca sa nu importi de ex user.model.js in toate fisierele in care l folosesti (e bad practice)
// importi fisierul asta si apelezi db.user (spre exemplu)
//

db.admin = require("./admin.model");
db.event = require("./event.model");
db.code = require("./code.model");
db.tag = require("./tag.model");
db.photo = require("./photo.model");

db.CODES = [1, 2, 3];
db.TAGS = ["minor", "periculos", "dezastruos"];

module.exports = db;
