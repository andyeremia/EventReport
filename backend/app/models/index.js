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

module.exports = db;
