import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const ShowLoader = () => (
  <View style={[styles.container, styles.horizontal]}>
    {/* <ActivityIndicator /> */}
    <ActivityIndicator size="large" color="#000" />
    {/* <ActivityIndicator size="small" color="#0000ff" /> */}
    {/* <ActivityIndicator size="large" color="#00ff00" /> */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default ShowLoader;
