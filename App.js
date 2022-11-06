/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import Navigation from './src/Navigation/Navigation';
import {Provider} from 'react-redux';
import {Store, persistor} from './src/Redux/Store/Store';
import {PersistGate} from 'redux-persist/integration/react';
const App = () => {
  return (
    <Provider store={Store}>
      <Navigation />
    </Provider>
  );
};

export default App;
