import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './navigator/NavigationStack';

function Home() {
  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
}
export default Home;
