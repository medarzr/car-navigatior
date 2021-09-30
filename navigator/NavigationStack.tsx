import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../screens/MapScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddInformation from '../components/settings/AddInformation';
import { TabParamList, StackParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<StackParamList>();

function ProfileStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="AddInformation" component={AddInformation} />
    </Stack.Navigator>
  );
}

export default function NavigationStack() {
  return (
    <Tab.Navigator
    screenOptions={() => ({
      headerShown: false,
    })}
    >
      <Tab.Screen name="Home" component={MapScreen} />
      <Tab.Screen name="Settings" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}
