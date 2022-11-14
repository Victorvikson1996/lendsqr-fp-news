/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import Navigation from './src/Navigation/Navigation';
import {Provider} from 'react-redux';
import {Store, persistor} from './src/Redux/Store/Store';
import {PersistGate} from 'redux-persist/integration/react';
import crashlytics from '@react-native-firebase/crashlytics';

const App = () => {
  useEffect(() => {
    crashlytics().log('App mounted.');
  }, []);
  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
