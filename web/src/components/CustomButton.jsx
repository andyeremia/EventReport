import React from "react";
import { withRouter } from "react-router-dom";

import "./CustomButton.css";

const CustomButton = ({ history, event }) => (
  <button
    className="marker-btn"
    onClick={() => history.push(`event/${event._id}`)}
  >
    <img
      src="https://www.flaticon.com/svg/vstatic/svg/564/564619.svg?token=exp=1611331551~hmac=927f1f9908e7f3ddfd5bb498da3f6d48"
      alt="event"
    />
  </button>
);

export default withRouter(CustomButton);
