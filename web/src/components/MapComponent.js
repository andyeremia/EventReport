import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import apiKey from "../constants";

const MapComponent = (props) => {
  console.log(props);
  return (
    <Map google={props.google} zoom={14}>
      <Marker position={{ lat: 44.18, lng: 28.63 }} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: apiKey,
})(MapComponent);
