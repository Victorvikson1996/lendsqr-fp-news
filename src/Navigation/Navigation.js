import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  NewsDetailsScreen,
  SplashScreen,
  UserScreen,
} from '../Screens';

import {LoginScreen, RegisterScreen} from '../Screens/Auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../components/Loader';
import {useSelector} from 'react-redux';
// import {selectIsLoggedIn} from '../Redux/Slice/UserSclice';
import {selectIsLoggedIn} from '../Redux/Slice/_authSlice';

const Stack = createStackNavigator();

const ScreenOptions = {
  headerShown: false,
};

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="HOME" screenOptions={ScreenOptions}>
      {/* <Stack.Screen name="SPLASH" component={SplashScreen} /> */}
      <Stack.Screen name="HOME" component={HomeScreen} />
      <Stack.Screen name="NEWS" component={NewsDetailsScreen} />
      <Stack.Screen name="USER" component={UserScreen} />
    </Stack.Navigator>
  );
}

function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={ScreenOptions}>
      {/* <Stack.Screen name="SPLASH" component={SplashScreen} /> */}
      <Stack.Screen name="REG" component={RegisterScreen} />
      <Stack.Screen name="LOG" component={LoginScreen} />
    </Stack.Navigator>
  );
}

const Navigation = () => {
  const [initialRouteName, setInitialRouteName] = React.useState('');
  // const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log(isLoggedIn);

  React.useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 200);
  });

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName('HomeScreen');
        } else {
          setInitialRouteName('LoginScreen');
        }
      } else {
        setInitialRouteName('RegisterScreen');
      }
    } catch (error) {
      setInitialRouteName('RegisterScreen');
    }
  };

  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator screenOptions={ScreenOptions}>
            <Stack.Screen name="HOME" component={HomeScreen} />
            <Stack.Screen name="REG" component={RegisterScreen} />
            <Stack.Screen name="LOG" component={LoginScreen} />
            <Stack.Screen name="NEWS" component={NewsDetailsScreen} />
            <Stack.Screen name="USER" component={UserScreen} />
          </Stack.Navigator>
          {/* {isLoggedIn ? <RootNavigator /> : <AuthNavigation />} */}
        </>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
