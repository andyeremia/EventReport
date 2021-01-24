const nodemailer = require("nodemailer");
const axios = require("axios");
const smsAxios = axios.create();

const env = require("./env.json");
const db = require("../models");
const Event = db.event;
const Admin = db.admin;

const renderDate = (data) => {
  var date = new Date(data);
  const dateString = date.toString();
  const dateArray = dateString.split(" ");
  if (dateArray.length > 4) {
    const dateArrayTime = dateArray[4].split(":");
    const messageTime = dateArrayTime[0] + ":" + dateArrayTime[1];
    const messageDate =
      dateArray[2] +
      " " +
      dateArray[1] +
      " " +
      dateArray[3] +
      "  " +
      messageTime;

    return messageDate;
  } else {
    return;
  }
};

function sendEmail(to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.EMAIL,
      pass: env.PASSWORD,
    },
  });

  let mailOptions = {
    from: env.EMAIL,
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("Error occured: ", err);
    }
    console.log("Email successfully sent to: ", to);
  });
}

async function getId() {
  var id;
  await smsAxios
    .get(env.HTTP_HOST + env.SENDERS_PATH, {
      headers: {
        "X-Authorization": env.API_KEY,
      },
    })
    .then((response) => {
      id = response.data[0].id;
    })
    .catch((error) => console.log(error));
  return id;
}

async function sendSMS(phoneNumber, message) {
  var id = await getId();
  await smsAxios
    .post(
      env.HTTP_HOST + env.SEND_PATH,
      {},
      {
        headers: {
          "X-Authorization": env.API_KEY,
        },
        params: {
          to: phoneNumber,
          sender: id,
          body: message,
        },
      }
    )
    .then((response) => {
      console.log("Sms successfully sent to: ", phoneNumber);
      //console.log(response)
    })

    .catch((error) => console.log(error));
}

const notifyAdmins = async (email, phone, subject, message) => {
  sendEmail(email, subject, message);
  sendSMS(phone, message);
};

exports.createEvent = (req, res) => {
  const event = new Event({
    time: req.body.time,
    location: {
      lat: req.body.location.lat,
      lng: req.body.location.lng,
    },
    code: req.body.code,
    desc: req.body.desc,
    tag: req.body.tag,
  });

  event.save(async (err, event) => {
    if (err) {
      return res.status(500).send({ message: err });
    } else {
      let decod;
      if (event.code === 1) {
        decod = "cutremur";
      } else if (event.code == 2) {
        decod = "tsunami";
      } else if (event.code == 3) {
        decod = "bombardament";
      }

      let messageToAdmins =
        "La " +
        renderDate(event.time) +
        " s-a produs un " +
        decod +
        " " +
        event.tag +
        " la coordonatele: " +
        req.body.location.lat +
        " latitudine" +
        " " +
        req.body.location.lng +
        " longitudine!";
      Admin.find((err, admins) => {
        if (err) {
          return res.status(500).send({ message: err });
        } else {
          admins.forEach((admin) => {
            console.log(admin);
            notifyAdmins(
              admin.email,
              admin.phone,
              "Event Report",
              messageToAdmins
            );
          });
        }
      });
      return res.status(200).send(event);
    }
  });
};

exports.findEventById = async (req, res) => {
  try {
    await Event.findById(req.params.id, (err, doc) => {
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

exports.findAllEvents = async (req, res) => {
  try {
    await Event.find((err, docs) => {
      if (err) {
        console.log(err);
        return res.status(404).send(err);
      }
      return res.status(200).send(docs);
    });
  } catch (error) {
    console.log(error);
    return res.status(503).send(error);
  }
};
