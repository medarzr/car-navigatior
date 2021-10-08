import React, { useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, PanResponder, Text } from 'react-native';
import AddressIcon from 'react-native-vector-icons/Entypo';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import CameraIcon from './CameraIcon';
import { Markers } from '../../redux/ducks/types';

type Props = {
  bottomMenuInformation:Markers,
  pan: Animated.ValueXY,
  height: number,
  animatedEvent: (value: number) => void
};

function BottomMenu(props: Props) {
  const { bottomMenuInformation, pan, height, animatedEvent } = props;


  const changePosition = (gestureState: { moveY: number }): void => {
    if ((height - (height * 0.2)) < gestureState?.moveY) {
      animatedEvent(height);
    } else {
      animatedEvent(0);
    }
  };
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: pan.x, dy: pan.y },
      ], { useNativeDriver: false }),
      onPanResponderRelease: (_event, gestureState) => {
        changePosition(gestureState);
      },
    }),
  ).current;

  return (
      <Animated.View style={[styles.container, { transform: [{ translateX: 0 }, { translateY: pan.y }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CameraIcon />
          <Text style={styles.headerText}>
            {`Speed camera ${bottomMenuInformation?.row?.number}`}
          </Text>
          </View>
          <TouchableOpacity
          style={{ padding: 6 }}
            onPress={() => animatedEvent(height)}
          >
          <CloseIcon name="closecircle" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AddressIcon name="address" size={18} color="#32ADE6" style={{ marginRight: 8 }} />
          <Text style={{ color: 'gray', flex: 1 }}>
            {bottomMenuInformation?.row?.adress}
          </Text>
        </View>
      </Animated.View>
  );
}
export default (BottomMenu);

const styles = StyleSheet.create({
  container:{
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 16,
    marginVertical: 10,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  headerText: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },

});
