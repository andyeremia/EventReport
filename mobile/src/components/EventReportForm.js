import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  PermissionsAndroid,
  Alert,
  Image,
} from 'react-native';
import {Text, Button} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import Geolocation from 'react-native-geolocation-service';
import * as ImagePicker from 'react-native-image-picker';

import {reportEvent} from '../services';
import Spacer from './Spacer';

const EventReportForm = ({headerText}) => {
  const [desc, setDesc] = useState('');
  const [code, setCode] = useState(null);
  const [codeOpen, setCodeOpen] = useState(false);
  const [tag, setTag] = useState(null);
  const [tagOpen, setTagOpen] = useState(false);
  const [grantedPermission, setGrantedPermission] = useState(false);
  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setGrantedPermission(true);
          getLocation();
        } else {
          alert('Permission Denied');
        }
      } catch (err) {
        alert('Eroare!', err);
      }
    };
    requestLocationPermission();
  }, [grantedPermission]);

  const getLocation = () => {
    if (grantedPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          const myPosition = {
            lat: position.coords.latitude.toFixed(2),
            lng: position.coords.longitude.toFixed(2),
          };
          setLocation(myPosition);
        },
        (error) => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  const handlePhoto = () => {
    Alert.alert(
      'Event Photo',
      'Choose an option for the event photo',
      [
        {
          text: 'Choose from device',
          onPress: () => handleChoosePhoto(),
        },
        {
          text: 'Use camera to take a picture',
          onPress: () => handleTakePhoto(),
        },
      ],
      {cancelable: true},
    );
  };

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setPhoto(response);
      }
    });
  };

  const handleTakePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchCamera(options, (response) => {
      if (response.uri) {
        setPhoto(response);
      }
    });
  };

  const createFormData = (image) => {
    const data = new FormData();

    data.append('photo', {
      name: image.fileName,
      type: image.type,
      uri: image.uri,
    });

    return data;
  };

  const formValidation = () => {
    let flag = true;
    if (!location) {
      Alert.alert('Error', 'You must enable location for this app!');
      flag = false;
    } else if (desc === '') {
      Alert.alert('Error', 'You must write a description for the event!');
      flag = false;
    } else if (!code) {
      Alert.alert('Error', 'You must choose a code for the event!');
      flag = false;
    } else if (!tag) {
      Alert.alert('Error', 'You must choose a tag for the event!');
      flag = false;
    } else if (!photo) {
      Alert.alert('Error', 'You must choose a photo for the event!');
      flag = false;
    }

    return flag;
  };

  const clearForm = () => {
    setDesc('');
    setCode(null);
    setTag(null);
    setPhoto(null);
  };

  const handleSubmit = () => {
    if (formValidation()) {
      const obj = {
        time: Date.now(),
        location: {
          lat: location.lat,
          lng: location.lng,
        },
        code: parseInt(code),
        desc: desc,
        tag: tag,
      };
      reportEvent(obj, photo); //creare serviciu
      clearForm();
    } else {
      //Alert.alert("Error", "Something went wrong... Please try again!");
      clearForm();
    }
  };

  return (
    <>
      <Spacer />
      <Text
        h2
        style={{
          alignSelf: 'center',
          marginBottom: 50,
          color: '#333',
        }}>
        {headerText}
      </Text>
      <View style={[styles.inputContainer]}>
        <Text>Description:</Text>
        <TextInput
          style={[styles.descText]}
          underlineColorAndroid="transparent"
          multiline
          value={desc}
          onChangeText={setDesc}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <Spacer />
      <View style={[styles.inputContainer]}>
        <Text>Please select the event's alert code from below:</Text>
        <DropDownPicker
          onOpen={() => setCodeOpen(true)}
          onClose={() => setCodeOpen(false)}
          items={[
            {
              label: '1: Cutremur',
              value: '1',
              icon: () => <Icon name="check-circle" size={18} color="#333" />,
              hidden: true,
            },
            {
              label: '2: Tsunami',
              value: '2',
              icon: () => <Icon name="check-circle" size={18} color="#333" />,
            },
            {
              label: '3: Bombardament',
              value: '3',
              icon: () => <Icon name="check-circle" size={18} color="#333" />,
            },
          ]}
          defaultValue={code}
          containerStyle={{height: 40}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          labelStyle={{
            color: '#333',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) => setCode(item.value)}
        />
      </View>
      <Spacer />
      <View
        style={[
          styles.inputContainer,
          codeOpen ? styles.codeOpen : styles.codeClosed,
        ]}>
        <Text>Please select the event's tag from below:</Text>
        <DropDownPicker
          onOpen={() => setTagOpen(true)}
          onClose={() => setTagOpen(false)}
          items={[
            {
              label: 'Minor',
              value: 'Minor',
              icon: () => <Icon name="check-circle" size={18} color="#333" />,
              hidden: true,
            },
            {
              label: 'Periculos',
              value: 'Periculos',
              icon: () => <Icon name="check-circle" size={18} color="#333" />,
            },
            {
              label: 'Dezastruos',
              value: 'Dezastruos',
              icon: () => <Icon name="check-circle" size={18} color="#333" />,
            },
          ]}
          defaultValue={tag}
          containerStyle={{height: 40}}
          style={[styles.dropDownPickerTagsDefault]}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          labelStyle={{
            color: '#333',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) => setTag(item.value)}
        />
      </View>
      <Spacer />
      <View
        style={[
          styles.photoContainer,
          tagOpen ? styles.tagOpen : styles.tagClosed,
        ]}>
        <Button title="Event Photo" onPress={() => handlePhoto()} />
        <Text>* A photo is required for an event report</Text>
        <Spacer />
        {photo && (
          <Image source={{uri: photo.uri}} style={{width: 300, height: 300}} />
        )}
      </View>
      <Spacer />
      <Button
        style={[styles.submitButton]}
        title="REPORT EVENT"
        onPress={() => handleSubmit()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginStart: 15,
    marginEnd: 15,
  },
  descText: {
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
  },
  dropDownPickerTagsDefault: {
    backgroundColor: '#fafafa',
  },
  codeOpen: {
    marginTop: 100,
  },
  codeClosed: {
    marginTop: 0,
  },
  tagOpen: {
    marginTop: 100,
  },
  tagClosed: {
    marginTop: 0,
  },
  photoContainer: {
    alignItems: 'center',
    marginStart: 50,
    marginEnd: 50,
  },
  submitButton: {
    marginStart: 80,
    marginEnd: 80,
  },
});

export default EventReportForm;
