import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Preloader from '../components/Preloader';
import {
  getMarkers, loadingSelector,
} from '../redux/ducks/markers';

const initialCoord =
{
  latitude: 59.983716,
  longitude: 30.339999,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

function MapScreen(props) {
  const { getMarkers, loading } = props;
  console.log('loading', loading);

  const myRef: React.RefObject<MapView> | null = useRef(null);

  useEffect(() => {
    getMarkers();
    getLocation(0.1);
  }, []);

  const getLocation = (ltlnD: number): void => {
    Geolocation.getCurrentPosition(
      (position) => {
        const myCoords = {
          ...position.coords,
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

  if (loading) return (<Preloader />);
  return (
    <View style={{ flex: 1 }}>
     <MapView
        style={styles.map}
        provider="google"
        showsUserLocation={true}
        // userLocationAnnotationTitle=""
        initialRegion={initialCoord}
        ref={myRef}
        // onPress={handelBlurInput()}
       />

        <TouchableOpacity
          onPress={() => getLocation(0.01)}
          style={styles.MyLockButton}>
          <Icon name="location-arrow" size={18} color="#32ADE6" />
        </TouchableOpacity>

    </View>
  );
}
export default connect((state) => ({
  loading: loadingSelector(state),
}), { getMarkers })(MapScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
  MyLockButton: {
    backgroundColor:'white',
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
