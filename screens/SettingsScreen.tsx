import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../navigator/types';

type Props = StackScreenProps<StackParamList, 'SettingsScreen'>;

function SettingsScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Car Information</Text>
      <ScrollView contentContainerStyle={{ paddingTop: 16 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddInformation')}
          style={styles.addButton}
        >
          <Text style={{ fontSize: 24, fontWeight: '700' }}>Your Car</Text>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/images/car.png')}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
export default SettingsScreen;

const styles = StyleSheet.create({
  tinyLogo: {
    flex: 1,
    width: '100%',
    height: 150,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    backgroundColor: 'white',
    margin: 8,
    padding: 8,
    borderRadius: 8,
  },
});
