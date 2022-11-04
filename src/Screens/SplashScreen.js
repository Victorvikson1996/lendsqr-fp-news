import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {COLORS} from '../utils';

const SplashScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('SIGNUP');
  }, 3000);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}>LendsQr News</Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lendsqr,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
export default SplashScreen;
