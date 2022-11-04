import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  LoginScreen,
  NewsDetailsScreen,
  SignUpScreen,
  SplashScreen,
  UserScreen,
} from '../Screens';

const Stack = createStackNavigator();

const ScreenOptions = {
  headerShown: false,
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={ScreenOptions}>
        <Stack.Screen name="SPLASH" component={SplashScreen} />
        <Stack.Screen name="SIGNUP" component={SignUpScreen} />
        <Stack.Screen name="LOGIN" component={LoginScreen} />
        <Stack.Screen name="HOME" component={HomeScreen} />
        <Stack.Screen name="NEWS" component={NewsDetailsScreen} />
        <Stack.Screen name="USER" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
