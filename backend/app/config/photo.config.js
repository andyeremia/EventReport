const fs = require("fs");
var multer = require("multer");

var DIR = "./public/uploads/";

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    var path =
      DIR + req.params.file.replace(".", "_") + "/" + new Date().getTime();
    req.pathName = path;
    console.log("path: ", path);
    fs.mkdir(path, { recursive: true }, (err) => {
      callback(null, path);
    });
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

module.exports = upload;
