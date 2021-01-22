import React from 'react';
import {View, StyleSheet} from 'react-native';

const Spacer = () => {
  return <View style={styles.spacerStyle}></View>;
};

const styles = StyleSheet.create({
  spacerStyle: {
    margin: 15,
  },
});

export default Spacer;
