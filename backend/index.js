const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

// pt request din client
app.use(function (err, req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const dbConfig = require("./app/config/db.config");
const db = require("./app/models");

// MongoDB Connection
// Add event codes and tags

db.mongoose
  .connect(
    `mongodb+srv://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@cluster0.cfe91.mongodb.net/${dbConfig.BD}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// ruta test
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EreX!" });
});

// routes
require("./app/routes/event.routes")(app);
require("./app/routes/photo.routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const Admin = db.admin;
const injectAdmins = (lname, fname, phone, email) => {
  Admin.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Admin({
        lname: lname,
        fname: fname,
        phone: phone,
        email: email,
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log(`added ${lname} ${fname} to admins collection`);
      });
    }
  });
};
