import event from "../api";

const createFormData = (photo, body) => {
  const formData = new FormData();
  formData.append("photo", photo);

  Object.keys(body).forEach((key) => {
    formData.append(key, body[key]);
  });

  return formData;
};

export const createEvent = async (obj, photo) => {
  let res = {
    eventResponse: {},
    photoResponse: {},
  };
  try {
    await event
      .post("/event", obj)
      .then((response) => {
        console.log(response);
        res.eventResponse = response.data;
        const eventId = response.data._id;
        event
          .post("/photo", createFormData(photo, { eventId: eventId }), {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response);
            res.photoResponse = response.data;
            alert("The event has been is successfully reported!");
          })
          .catch((error) => {
            console.log(error);
            alert("The image has a problem...");
          });
      })
      .catch((error) => {
        console.log(error);
        alert("There is a problem with your event");
      });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllEvents = async () => {
  try {
    const res = await event.get("/events");
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getEventById = async (id) => {
  try {
    let res = {
      eventRes: {},
      photoRes: {},
    };
    await event
      .get(`/events/${id}`)
      .then((response) => {
        //console.log(response);
        res.eventRes = response.data;
        event
          .get(`/photo/${id}`)
          .then((response) => {
            //console.log(response);
            res.photoRes = response.data;
          })
          .catch((error) => {
            console.log(error);
            alert("Could not retrieve event image");
          });
      })
      .catch((error) => {
        console.log(error);
        alert("Could not retrieve event");
      });
    return res;
  } catch (error) {
    console.log(error);
  }
};
