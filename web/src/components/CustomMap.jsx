import React, { useState } from "react";
import ReactMapGL, {Marker} from "react-map-gl";

const CustomMap = ({event}) => {
  const [viewport, setViewport] = useState({
    latitude: event.lat,
    longitude: event.long,
    width: "35vw",
    height: "35vh",
    zoom: 14
  });
    
  return (
    <div>
      <ReactMapGL 
        {...viewport} 
        mapboxApiAccessToken="pk.eyJ1IjoiYWRpYjE0IiwiYSI6ImNrazc3M3hpNzA5enEyeG8yd3J6ZDMyOXkifQ.aaJmJI5oUkX-n-l7hZN6eA"
        onViewportChange = {viewport => {
          setViewport(viewport);
        }} 
      >
      <Marker key = {event.id} latitude={event.lat} longitude={event.long}> 
          <button className='marker-btn'><img src='https://www.flaticon.com/svg/vstatic/svg/564/564619.svg?token=exp=1611331551~hmac=927f1f9908e7f3ddfd5bb498da3f6d48' alt="event" /></button>
      </Marker>
      </ReactMapGL>
    </div>
  );
}

export default CustomMap;
