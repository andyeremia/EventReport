import React from "react";
import { withRouter } from "react-router-dom";

import "./CustomButton.css";

const CustomButton = ({ history, event }) => (
  <button
    className="marker-btn"
    onClick={() => history.push(`event/${event._id}`)}
  >
    <img src={process.env.PUBLIC_URL + "/marker.svg"} alt="event" />
  </button>
);

export default withRouter(CustomButton);
