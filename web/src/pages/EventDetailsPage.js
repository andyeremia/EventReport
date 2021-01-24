import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CustomMap from "../components/CustomMap";
import "./EventDetailsPage.css";

import { getEventById } from "../services";

const EventDetailsPage = () => {
  const { id } = useParams(); //cu id-ul asta poti face get
  const [fetchedEvent, setFetchedEvent] = useState({});
  const [imgName, setImgName] = useState(null);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    getEventById(id).then((response) => {
      console.log(response);
      setImgName(response.photoRes.name);
      setFetchedEvent(response);
    });
  }, []);

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

  // ca props pt CustomMap trebuie pus event-ul sau un obiect cu id, lat, long
  return (
    <div className="event-details-page">
      {fetchedEvent.eventRes ? (
        <CustomMap
          event={{
            id: { id },
            lat: fetchedEvent.eventRes.location.lat,
            long: fetchedEvent.eventRes.location.lng,
          }}
        />
      ) : null}
      <button
        className="submit"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          setFlag(!flag);
        }}
      >
        {flag ? "Hide Details" : "Show Details"}
      </button>
      {fetchedEvent.eventRes && flag ? (
        <div className="event-info">
          <div className="event-details">
            <span>
              <span className="detail-name">Code:</span>{" "}
              <span className="detail-value">{fetchedEvent.eventRes.code}</span>
            </span>
            <span>
              <span className="detail-name">Tag:</span>{" "}
              <span className="detail-value">{fetchedEvent.eventRes.tag}</span>
            </span>
            <span>
              <span className="detail-name">Description:</span>{" "}
              <span className="detail-value">{fetchedEvent.eventRes.desc}</span>
            </span>
            <span>
              <span className="detail-name">Time:</span>{" "}
              <span className="detail-value">
                {renderDate(fetchedEvent.eventRes.time)}
              </span>
            </span>
            <span>
              <span className="detail-name">Photo:</span>
            </span>
          </div>
          {fetchedEvent.photoRes ? (
            <span className="event-photo">
              {imgName !== null ? (
                <img
                  src={
                    process.env.PUBLIC_URL + "/" + fetchedEvent.photoRes.name
                  }
                  alt="poza"
                />
              ) : null}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default EventDetailsPage;
