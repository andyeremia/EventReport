import event from '../api';
import {Alert} from 'react-native';

const createFormData = (photo, body) => {
  const formData = new FormData();
  formData.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: photo.uri,
  });

  Object.keys(body).forEach((key) => {
    formData.append(key, body[key]);
  });

  return formData;
};

export const reportEvent = async (obj, photo) => {
  try {
    await event
      .post('/event', obj)
      .then((response) => {
        console.log(response);
        const eventId = response.data._id;
        event
          .post('/photo', createFormData(photo, {eventId: eventId}), {
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
          .then((response) => {
            console.log(response);
            Alert.alert('Success', 'You successfully reported the event!');
          })
          .catch((error) => {
            console.log('upload error', error);
            Alert.alert('Error', 'Event image could not be uploaded...');
          });
      })
      .catch((error) => {
        console.log('upload error', error);
        Alert.alert('Error', 'Event could not be reported...');
      });
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Event could not be reported...');
  }
};
