import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import CustomButton from "./CustomButton.jsx";

import API_KEY from "../constants";
import { getAllEvents } from "../services";

const Map = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents().then((response) => {
      console.log(response.data);
      setEvents(response.data);
    });
  }, []);
  const [viewport, setViewport] = useState({
    latitude: 44.439663,
    longitude: 26.096306,
    width: "70vw",
    height: "75vh",
    zoom: 13,
  });

  const eventMarkers = events.map((event) => {
    return (
      <Marker
        key={event._id}
        latitude={event.location.lat}
        longitude={event.location.lng}
      >
        <CustomButton event={event} />
      </Marker>
    );
  });

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={API_KEY}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {eventMarkers}
      </ReactMapGL>
    </div>
  );
};

export default Map;
