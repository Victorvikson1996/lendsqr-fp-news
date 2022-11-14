import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableHighlight,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS} from '../utils';
import moment from 'moment';
import {BackMenuIcon} from '../assets/icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import crashlytics from '@react-native-firebase/crashlytics';

const UserScreen = ({navigation}) => {
  const [userDetails, setUserDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');

    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUserInfo(userInfo);
    } catch (error) {
      alert.alert(error.message);
    }
  };

  useEffect(() => {
    getUserData();
    // getCurrentUserInfo();
  }, []);

  const logout = async () => {
    auth().signOut();
    GoogleSignin.signOut();
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({...userDetails, loggedIn: false}),
    );
    navigation.navigate('LOG');
    crashlytics().log('USERLOGEED OUT');
  };

  const signOut = async () => {
    setIsLoading(true);
    await auth().signOut();
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem(
      'userData',
      JSON.stringify({...userData, loggedIn: false}),
    );
    setUser(null);
    setIsLoading(false);

    navigation.navigate('LOG');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()} style={styles.icon}>
          <BackMenuIcon />
        </Pressable>
        <Text style={styles.date}>{moment().calendar()}</Text>
        <Text style={styles.dateText}>Hey! {userDetails?.fullname} </Text>
        <Pressable onPress={logout} style={{marginTop: 50}}>
          <Text style={styles.error}>LogOut</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    marginTop: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  date: {
    color: '#888',
    textTransform: 'uppercase',
  },
  dateText: {
    color: COLORS.black,
    fontSize: 32,
    fontWeight: '600',
  },
  error: {
    color: COLORS.red,
    textTransform: 'uppercase',
  },
  icon: {
    bottom: 20,
  },
});

export default UserScreen;
