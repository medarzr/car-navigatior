import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackParamList } from '../../navigator/types';
import { IInformation } from './types';

type Props = StackScreenProps<StackParamList, 'AddInformation'>;

function AddInformation({ navigation, route }: Props) {
  // console.log(route);
  const data = route?.params?.item as IInformation;
  const [text, setText] = useState<IInformation>({
    text: data?.text || '',
    number: data?.number || '',
    docId: data?.docId || '',
    id: data?.id || new Date(),
  });

  const setItem = async (): Promise<void> => {
    try {
      // AsyncStorage.clear();
      const jsonValueGet: string | null = await AsyncStorage.getItem('@carItems');
      let array: Array<IInformation> = jsonValueGet ? JSON.parse(jsonValueGet) : [];
      if (data?.id) {
        array = array.filter(item => item.id !== data.id);
        // console.log(array);
      }
      const newArray: Array<IInformation> = [...array, text];
      // console.log(newArray);
      const jsonValue = JSON.stringify(newArray);
      await AsyncStorage.setItem('@carItems', jsonValue);
      navigation.goBack();
    } catch (error) {
      // saving error
      console.log(error);
    }
  };

  const deleteItem = async (): Promise<void> => {
    try {
      const jsonValueGet: string | null = await AsyncStorage.getItem('@carItems');
      let array: Array<IInformation> = jsonValueGet ? JSON.parse(jsonValueGet) : [];
      if (data?.id) {
        array = array.filter(item => item.id !== data.id);
        // console.log(array);
      }
      const jsonValue = JSON.stringify(array);
      await AsyncStorage.setItem('@carItems', jsonValue);
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
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Adding car Information</Text>
      <View style={{ flex: 1, marginTop: 10 }}>
        <ScrollView>
          <TextInput
            mode="outlined"
            label="Car name"
            style={styles.inputStyle}
            value={text.text}
            onChangeText={value => setText({ ...text, text: value })}
          />
          <TextInput
            mode="outlined"
            label="Number of car"
            style={styles.inputStyle}
            value={text.number}
            onChangeText={value => setText({ ...text, number: value })}
          />
          <TextInput
            mode="outlined"
            label="Document ID"
            style={styles.inputStyle}
            value={text.docId}
            onChangeText={value => setText({ ...text, docId: value })}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 8 }}>
          <Button
          style={{ flex:1, justifyContent:'center' }}
          mode="contained"
          onPress={() => setItem()}>
            Save
          </Button>
          {data && <Button
          color="red"
          mode="contained"
          style={{ marginLeft: 8, alignItems: 'center', justifyContent:'center' }}
          onPress={() => deleteItem()}>
            <Icon name="delete" size={24} color="white" />
          </Button>}
          </View>
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
}
export default (AddInformation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputStyle: {
    marginVertical: 8,
  },
});
