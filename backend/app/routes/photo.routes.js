const controller = require("../controllers/photo.controller");
const upload = require("../config/photo.config");

module.exports = function (app) {
  app.post("/photo", upload.single("photo"), controller.upload);
  app.get("/photo/:id", controller.findPhotoByEventId);
};
