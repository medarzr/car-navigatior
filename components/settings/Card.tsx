import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../navigator/types';
import { IInformation } from './types';

type Props = {
  item: IInformation,
  navigation: StackNavigationProp<StackParamList, 'SettingsScreen'>;
};

function SettingsScreen(props: Props) {
  const { item, navigation } = props;
  return (
        <TouchableOpacity
            onPress={() => navigation.navigate('AddInformation', { item })}
            style={styles.card}
            key={item.docId}
        >
            <Text style={styles.title}>{item.text}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.subTitle}>Number of car: </Text>
                <Text style={styles.subTitle}>{item.number}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.subTitle}>DocID: </Text>
                <Text style={styles.subTitle}>{item.docId}</Text>
            </View>
            <Image
                style={styles.tinyLogo}
                source={require('../../assets/images/car.png')}
            />
        </TouchableOpacity>
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
    paddingTop: 16,
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    margin: 8,
    padding: 16,
    borderRadius: 8,
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
