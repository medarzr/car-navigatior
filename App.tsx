import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import MainComponent from './MainComponent';
import 'react-native-gesture-handler';

const App = () => {
  return (
    <PaperProvider>
    <MainComponent />
  </PaperProvider>
  );
};

export default App;
