var multer = require("multer");

var storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "../web/public");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});
var upload = multer({ storage: storage });

module.exports = upload;
