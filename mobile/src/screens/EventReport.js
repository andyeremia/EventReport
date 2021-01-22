import React from 'react';
import {View, StyleSheet} from 'react-native';

import EventReportForm from '../components/EventReportForm';

const EventReport = () => {
  return (
    <View style={styles.containerStyle}>
      <EventReportForm headerText="Event Report" />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 90,
  },
});

export default EventReport;
