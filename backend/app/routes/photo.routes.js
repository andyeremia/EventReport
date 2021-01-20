const controller = require("../controllers/photo.controller");

module.exports = function (app) {
  app.post("/photo", controller.upload);
};
