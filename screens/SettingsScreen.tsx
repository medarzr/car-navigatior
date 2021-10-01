import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import { useIsFocused } from '@react-navigation/native';
import { StackParamList } from '../navigator/types';
import { IInformation } from '../components/settings/types';
import Card from '../components/settings/Card';

type Props = StackScreenProps<StackParamList, 'SettingsScreen'>;

function SettingsScreen({ navigation }: Props) {
  const [data, dataSet] = useState<IInformation[] | null>(null);
  const isFocused: boolean = useIsFocused();
  const getItem = useCallback(async () => {
    const jsonValueGet: string | null = await AsyncStorage.getItem('@carItems');
    const array: Array<IInformation> = jsonValueGet ? JSON.parse(jsonValueGet) : [];
    dataSet(array);
  }, []);
  useEffect(() => {
    getItem();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', paddingHorizontal: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Car Information</Text>
      <TouchableOpacity
          onPress={() => navigation.navigate('AddInformation')}
          style={styles.addButton}>
          <Icon name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data !== null && data.map(item => (
          <Card
            item={item}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
}
export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  scrollContainer: {
    padding: 16,
    alignItems: 'center',
  },
  addButton: {
    width: 30,
    height: 30,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
});
