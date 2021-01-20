const db = require("../models");
const Tag = db.tag;
const Code = db.code;

exports.initial = () => {
  Tag.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Tag({
        name: "minor",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'minor' to tags collection");
      });

      new Tag({
        name: "periculos",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'periculos' to tags collection");
      });

      new Tag({
        name: "dezastruos",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'dezastruos' to tags collection");
      });
    }
  });

  Code.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Code({
        alert: 1,
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added '1' to codes collection");
      });

      new Code({
        alert: 2,
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added '2' to codes collection");
      });

      new Code({
        alert: 3,
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added '3' to codes collection");
      });
    }
  });
};
