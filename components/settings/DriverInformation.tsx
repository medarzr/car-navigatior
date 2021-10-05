import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackParamList } from '../../navigator/types';
import {  Driver } from './types';

type Props = StackScreenProps<StackParamList, 'DriverInformation'>;

function DriverInformation({ navigation, route }: Props) {
  // console.log(route);
  const data = route?.params?.item as Driver;
  const [driverData, setDriverData] = useState<Driver>({
    surname: data?.surname || '',
    name: data?.name || '',
    middleName: data?.middleName || '',
    docId: data?.docId || '',
  });

  const setItem = async (): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(driverData);
      console.log(jsonValue);
      await AsyncStorage.setItem('@driverItem', jsonValue);
      navigation.goBack();
    } catch (error) {
      // saving error
      console.log(error);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
      style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Adding Driver Information</Text>
      <View style={{ flex: 1, marginTop: 10 }}>
        <ScrollView>
          <TextInput
            mode="outlined"
            label="Surname"
            maxLength={26}
            style={styles.inputStyle}
            value={driverData.surname}
            onChangeText={value => setDriverData({ ...driverData, surname: value })}
          />
          <TextInput
            mode="outlined"
            label="Name"
            maxLength={20}
            style={styles.inputStyle}
            value={driverData.name}
            onChangeText={value => setDriverData({ ...driverData, name: value })}
          />
          <TextInput
            mode="outlined"
            label="Middle name"
            maxLength={20}
            style={styles.inputStyle}
            value={driverData.middleName}
            onChangeText={value => setDriverData({ ...driverData, middleName: value })}
          />
          <TextInput
            mode="outlined"
            label="Document ID"
            maxLength={20}
            style={styles.inputStyle}
            value={driverData.docId}
            onChangeText={value => setDriverData({ ...driverData, docId: value })}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 8 }}>
          <Button
          style={{ flex:1, justifyContent:'center' }}
          labelStyle={{ color: 'white' }}
          mode="contained"
          onPress={() => setItem()}>
            Save
          </Button>
          </View>
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
}
export default (DriverInformation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputStyle: {
    marginVertical: 8,
    color:'red',
    borderColor: 'red',
  },
});
