const controller = require("../controllers/event.controller");
const upload = require("../config/photo.config");

module.exports = function (app) {
  app.post("/event", controller.createEvent);
  app.get("/events", controller.findAllEvents);
  app.get("/events/:id", controller.findEventById);
};
