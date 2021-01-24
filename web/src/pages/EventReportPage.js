import React, { useState } from "react";

import "./EventReportPage.css";
import { createEvent } from "../services";

const EventReportPage = () => {
  const [desc, setDesc] = useState("");
  const [code, setCode] = useState(1);
  const [tag, setTag] = useState("Minor");
  const [location, setLocation] = useState(null);
  const [locationErr, setLocationErr] = useState(null);
  const [photo, setPhoto] = useState(null);

  const getLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        const myPosition = {
          lat: position.coords.latitude.toFixed(2),
          lng: position.coords.longitude.toFixed(2),
        };
        setLocation(myPosition);
        alert("We located you successfully!");
      },
      (err) => setLocationErr(err)
    );
  };

  const formValidation = () => {
    let flag = true;
    if (desc === "") {
      alert("You must write a description for the event!");
      flag = false;
    } else if (!code) {
      alert("You must choose a code for the event!");
      flag = false;
    } else if (!tag) {
      alert("You must choose a tag for the event!");
      flag = false;
    } else if (!location || locationErr) {
      alert("You must enable location for this app!");
      flag = false;
    } else if (!photo) {
      alert("You must choose a photo for the event!");
      flag = false;
    }

    return flag;
  };

  const clearForm = () => {
    setDesc("");
    setCode(null);
    setTag(null);
    setPhoto(null);
  };

  const handleSubmit = () => {
    if (formValidation()) {
      const obj = {
        time: Date.now(),
        location: {
          lat: location.lat,
          lng: location.lng,
        },
        code: parseInt(code),
        desc: desc,
        tag: tag,
      };
      createEvent(obj, photo);
      clearForm();
    } else {
      alert("Something went wrong... Please try again!");
      clearForm();
    }
  };

  return (
    <div className="report-page">
      <h2> Report an event here: </h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Description:
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </label>

        <label>Please select the event's alert code from below: </label>
        <select
          defaultValue={null}
          onChange={(e) => setCode(e.target.value)}
          value={code}
        >
          <option value="1" label="1: Cutremur" />
          <option value="2" label="2: Tsunami" />
          <option value="3" label="3: Bombardament" />
        </select>

        <label>Please select the event's tag from below: </label>
        <select onChange={(e) => setTag(e.target.value)} value={tag}>
          <option value="Minor">Minor</option>
          <option value="Periculos">Periculos</option>
          <option value="Dezastruos">Dezastruos</option>
        </select>

        <button onClick={() => getLocation()}>Get my current location</button>
        <input
          type="file"
          name="photo"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <input type="submit" value="Submit" onClick={() => handleSubmit()} />
      </form>
    </div>
  );
};

export default EventReportPage;
