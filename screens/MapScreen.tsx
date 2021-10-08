import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import CameraIcon from '../components/map/CameraIcon';
import Preloader from '../components/Preloader';
import {
  getMarkers,
  loadingSelector,
  markersSelector,
} from '../redux/ducks/markers';
import { RootState } from '../redux/reducer';
import { Markers } from '../redux/ducks/types';
import BottomMenu from '../components/map/BottomMenu';

const initialCoord = {
  latitude: 59.983716,
  longitude: 30.339999,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};
type Props = {
  loading: boolean;
  markers: Markers[] | null;
  getMarkers: () => void;
};

function MapScreen(props: Props) {
  const { getMarkers: getMarkersApi, loading, markers } = props;
  const { height } = Dimensions.get('window');
  const pan = useRef<Animated.ValueXY>(new Animated.ValueXY({ x: 0, y: height })).current;
  const myRef: React.RefObject<MapView> | null = useRef(null);
  const [bottomMenuInformation, setBottomMenuInformation] = useState<Markers>({
    row: {
      longitude: 0,
      number: '',
      address: '',
    },
    num_id: 0,
  });
  const animatedEvent = (yValue: number) =>
    Animated.spring(pan, {
      toValue: { x: 0, y: yValue },
      useNativeDriver: false,
    }).start();

  useEffect(() => {
    getMarkersApi();
    getLocation(0.1);
  }, []);

  const getLocation = (
    ltlnD: number,
    coords?: { latitude: number; longitude: number },
  ): void => {
    Geolocation.getCurrentPosition(
      (position) => {
        const myCoords = {
          ...position.coords,
          latitude: coords?.latitude || position.coords.latitude,
          longitude: coords?.longitude || position.coords.longitude,
          latitudeDelta: ltlnD,
          longitudeDelta: ltlnD,
        };
        if (myRef.current) {
          myRef.current.animateToRegion(myCoords, 1000);
        }
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };
  const onPressToMarker = (item: Markers): void => {
    setBottomMenuInformation(item);
    getLocation(0.01, item.row.longitude);
    animatedEvent(0);
  };

  if (loading) return <Preloader />;
  return (
    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
      <MapView
        style={styles.map}
        // provider="google"
        showsUserLocation={true}
        userLocationAnnotationTitle=""
        initialRegion={initialCoord}
        ref={myRef}
      >
        {markers?.map((marker) => (
          <Marker
            key={marker.num_id}
            coordinate={marker.row.longitude}
            // title={marker.row.number}
            description={marker.row.address}
            onPress={() => onPressToMarker(marker)}
          >
            <CameraIcon />
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity
        onPress={() => getLocation(0.01)}
        style={styles.MyLockButton}
      >
        <Icon name="location-arrow" size={18} color="#32ADE6" />
      </TouchableOpacity>
      <BottomMenu
        bottomMenuInformation={bottomMenuInformation}
        pan={pan}
        height={height}
        animatedEvent={animatedEvent}
      />
    </View>
  );
}
export default connect(
  (state: RootState) => ({
    loading: loadingSelector(state),
    markers: markersSelector(state),
  }),
  { getMarkers },
)(MapScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
  MyLockButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35,
    borderRadius: 35,
    position: 'absolute',
    bottom: 25,
    right: 10,
  },
});

// export default connector(MapScreen);
// const mapState = (state: RootState) => ({
//   loading: loadingSelector(state),
//   markers: markersSelector(state),
//   // loading: state.loading,
// });

// const mapDispatch = {
//   getMarkers,
// };

// const connector = connect(mapState, mapDispatch);
