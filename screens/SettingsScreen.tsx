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
import { IInformation, Driver } from '../components/settings/types';
import Card from '../components/settings/Card';
import DriverInfo from '../components/settings/DriverInfo';
import Preloader from '../components/Preloader';

type Props = StackScreenProps<StackParamList, 'Settings'>;

function SettingsScreen({ navigation }: Props) {
  const [data, dataSet] = useState<IInformation[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [driverData, driverDataSet] = useState<Driver>({
    surname: '',
    name: '',
    middleName: '',
    docId: '',
  });
  const isFocused: boolean = useIsFocused();

  const getItem = useCallback(async () => {
    const jsonValueGet: string = await AsyncStorage.getItem('@carItems') || '[]';
    const jsonValueDiverGet: string = await AsyncStorage.getItem('@driverItem') || '{}';
    const array: Array<IInformation> = JSON.parse(jsonValueGet);
    const dataParse: Driver = JSON.parse(jsonValueDiverGet);
    dataSet(array);
    driverDataSet(dataParse);
    setLoading(false);
  }, []);
  useEffect(() => {
    getItem();
  }, [isFocused]);

  if (loading) return (<Preloader />);

  return (
    <View style={styles.container}>
      <ScrollView
      contentContainerStyle={styles.container}>
        <View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
          <Text style={styles.title}>Driver Information</Text>
          <DriverInfo
            data={driverData}
            navigation={navigation}
          />
        </View>
        <View style={styles.carInfoContainer}>
          <Text style={styles.title}>Car Information</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddInformation')}
            style={styles.addButton}>
            <Icon name="plus" size={20} color="white" />
          </TouchableOpacity>
        </View>
        {data ?
        <View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {data.map(item => (
              <Card
                key={item.id}
                item={item}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        </View>
          :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign:'center', color: 'gray' }}>Nothing to show :({'\n'}Please add information about your car</Text>
          </View>}
      </ScrollView>
    </View>
  );
}
export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  addButton: {
    width: 30,
    height: 30,
    backgroundColor: '#32ADE6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  carInfoContainer: {
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
});
