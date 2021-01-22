import React from "react";
import { Link } from "react-router-dom";

const Map = () => {
  return (
    <div>
      Map
      <Link to="/event/new">EventReport</Link>
      <Link to={{ pathname: `/event/${1}` }}>EventDetails</Link>
    </div>
  );
};

export default Map;
