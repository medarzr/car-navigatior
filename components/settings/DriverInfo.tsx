import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../navigator/types';
import { Driver } from './types';

type Props = {
  navigation: StackNavigationProp<StackParamList, 'Settings'>
  data: Driver
};

const funnyNames: Array<string> = ['Unidentified seal', 'Unknown elephant', 'Cheerful hippo', 'Sad bunny'];
const funnyIDs: Array<string> = ['paws', 'mustache', 'tail'];

function DriverInfo({ navigation, data } : Props) {

  const driverName = (): string => {
    const isName = (subValue: string): any => data?.surname && subValue;
    const surname = data?.surname || funnyNames[Math.floor(Math.random() * funnyNames.length)];
    const name = isName(data?.name) ? `${data?.name.slice(0, 1)}.` : '';
    const middlename = isName(data?.middleName) ? `${data?.middleName.slice(0, 1)}.` : '';
    return `${surname} ${name} ${middlename}`;
  };

  return (
        <TouchableOpacity
            onPress={() => navigation.navigate('DriverInformation', { item: data })}
            style={styles.card}
        >
            <View style={{ flex: 2 }}>
            <Text numberOfLines={2} style={styles.title}>{driverName()}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.subTitle}>DocID: </Text>
                <Text numberOfLines={1} style={styles.subTitle}>{data.docId || funnyIDs[Math.floor(Math.random() * funnyIDs.length)]}</Text>
            </View>
            </View>
            <Image
                style={styles.tinyLogo}
                resizeMode="contain"
                source={require('../../assets/images/license.png')}
            />
        </TouchableOpacity>
  );
}
export default DriverInfo;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginVertical: 16,
    padding: 16,
    borderRadius: 8,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  tinyLogo: {
    flex: 1,
    width: '50%',
    height: 150,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'gray',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    paddingBottom: 4,
  },
});
