import React from 'react';
import 'react-native-gesture-handler';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import MainComponent from './MainComponent';
import store from './redux/store';

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#32ADE6',
    },
  };
  return (
    <Provider store={store}>
    <PaperProvider theme={theme}>
    <MainComponent />
  </PaperProvider>
  </Provider>
  );
};

export default App;
