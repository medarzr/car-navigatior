import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapScreen from '../screens/MapScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddInformation from '../components/settings/AddInformation';
import DriverInformation from '../components/settings/DriverInformation';
import { TabParamList, StackParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<StackParamList>();

const headerStyle = (titleHeader: string, color?: string, headerHide?: boolean): object => (
  {
    title: titleHeader,
    headerBackTitleVisible: false,
    headerTintColor: 'black',
    headerShown: headerHide,
    headerStyle: {
      backgroundColor: color,
      borderBottomWidth: 0,
      borderBottomColor: 'white',
      shadowColor: 'transparent',
      elevation: 0,
    },
  });
const tabBarIconStyle = (name: string, color: string, size: number) => {
  switch (name) {
    case 'Home':
      return <Icon name="home-map-marker" size={size} color={color} />;
    case 'Settings':
      return <Icon name="account-settings" size={size} color={color} />;
    default:
      return null;
  }
};

function ProfileStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} options={headerStyle('Settings')} />
      <Stack.Screen name="AddInformation" component={AddInformation} options={headerStyle('Add Information')}/>
      <Stack.Screen name="DriverInformation" component={DriverInformation} options={headerStyle('Driver Information')}/>
    </Stack.Navigator>
  );
}

export default function NavigationStack() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => (
      {
        tabBarIcon: ({ color, size }) =>
          tabBarIconStyle(route.name, color, size),
        headerShown: false })}>
      <Tab.Screen name="Home" component={MapScreen} />
      <Tab.Screen name="Settings" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}
