import React from "react";
import { Link } from "react-router-dom";

import Map from "../components/Map.jsx";

import "./MapPage.css";

const MapPage = () => {
  return (
    <div className="map-page">
      <h1>Event Report App</h1>
      <Link
        to="/event/new"
        style={{ textDecoration: "none", color: "red", fontWeight: "bold" }}
      >
        REPORT AN EVENT
      </Link>
      <Map />
    </div>
  );
};

export default MapPage;
