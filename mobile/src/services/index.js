import event from '../api';

export const reportEvent = async (obj) => {
  try {
    await event
      .post('/event', obj)
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
