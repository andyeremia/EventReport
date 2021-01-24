const db = require("../models");
const Photo = db.photo;
const Event = db.event;

exports.upload = async (req, res) => {
  console.log("file", req.file);
  //console.log("body", req.body);
  console.log("eventID", req.body.eventId);

  const photo = new Photo({
    name: req.file.filename,
    path: req.file.destination,
    type: req.file.mimetype,
    event: req.body.eventId,
  });

  photo.save(async (err, photo) => {
    if (err) {
      return res.status(500).send({ message: err });
    } else return res.status(200).send(photo);
  });
};

exports.findPhotoByEventId = async (req, res) => {
  try {
    await Photo.findOne({ event: req.params.id }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(404).send(err);
      }
      return res.status(200).send(doc);
    });
  } catch (error) {
    console.log(error);
    return res.status(503).send(error);
  }
};
