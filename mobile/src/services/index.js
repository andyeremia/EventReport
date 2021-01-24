import event from '../api';
import {Alert} from 'react-native';

export const reportEvent = async (eventInfo) => {
  try {
    fetch('http://4ec511260352.ngrok.io/photo', {
      method: 'POST',
      body: eventInfo,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        Alert.alert('Success', 'You successfully reported the event!');
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
