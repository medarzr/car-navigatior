import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../navigator/types';

type IInformation = {
  text: string,
  number: string,
  docId: string,
};

type Props = StackScreenProps<StackParamList, 'AddInformation'>;

function AddInformation({ navigation }: Props) {
  const [text, setText] = useState<IInformation>({
    text: '',
    number: '',
    docId: '',
  });
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
          <Button mode="contained" onPress={() => navigation.goBack()}>
            Save
          </Button>
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
