import React from 'react';
import { StyleSheet, View } from 'react-native';
import IconCamera from 'react-native-vector-icons/MaterialCommunityIcons';

function CameraIcon() {
  return (
    <View style={styles.redRoundIcon}>
      <View style={styles.whiteRoundIcon}>
        <IconCamera name="camera-wireless" size={14} color="black" />
      </View>
    </View>
  );
}
export default CameraIcon;

const styles = StyleSheet.create({
  redRoundIcon: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteRoundIcon: {
    backgroundColor: 'white',
    width: 20,
    height: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
