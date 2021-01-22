import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import Geolocation from '@react-native-community/geolocation';

import Spacer from './Spacer';

const EventReportForm = ({headerText}) => {
  console.log(headerText);
  const [desc, setDesc] = useState('');
  const [code, setCode] = useState(null);
  const [tag, setTag] = useState(null);
  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState(null);

  //Geolocation.getCurrentPosition((info) => console.log(info));

  return (
    <>
      <Spacer />
      <Text h3 style={{alignSelf: 'center', marginBottom: 20}}>
        {headerText}
      </Text>
      <Input
        label="Description"
        value={desc}
        onChangeText={setDesc}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <Text>Please select the event's alert code from below:</Text>
      <DropDownPicker
        items={[
          {
            label: '1: Cutremur',
            value: '1',
            icon: () => <Icon name="check-circle" size={18} color="#900" />,
            hidden: true,
          },
          {
            label: '2: Tsunami',
            value: '2',
            icon: () => <Icon name="check-circle" size={18} color="#900" />,
          },
          {
            label: '3: Bombardament',
            value: '3',
            icon: () => <Icon name="check-circle" size={18} color="#900" />,
          },
        ]}
        defaultValue={code}
        containerStyle={{height: 40}}
        style={{backgroundColor: '#fafafa'}}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onChangeItem={(item) => setCode(item.value)}
      />
      <Spacer />
      <Text>Please select the event's tag from below:</Text>
      <DropDownPicker
        items={[
          {
            label: 'Minor',
            value: 'Minor',
            icon: () => <Icon name="check-circle" size={18} color="#900" />,
            hidden: true,
          },
          {
            label: 'Periculos',
            value: 'Periculos',
            icon: () => <Icon name="check-circle" size={18} color="#900" />,
          },
          {
            label: 'Dezastruos',
            value: 'Dezastruos',
            icon: () => <Icon name="check-circle" size={18} color="#900" />,
          },
        ]}
        defaultValue={tag}
        containerStyle={{height: 40}}
        style={{backgroundColor: '#fafafa'}}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onChangeItem={(item) => setTag(item.value)}
      />
    </>
  );
};

export default EventReportForm;
