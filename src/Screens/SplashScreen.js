import {View, Text, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import React from 'react';
import {COLORS} from '../utils';
import crashlytics from '@react-native-firebase/crashlytics';

const SplashScreen = ({navigation}) => {
  // setTimeout(() => {
  //   navigation.navigate('HOME');
  // }, 3000);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}>Lendsqr News</Text>
      </View>
      <Pressable
        onPress={() => navigation.navigate('LOG')}
        style={styles.nextCon}>
        <Text style={styles.next}>Next....</Text>
      </Pressable>
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
  next: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  nextCon: {
    alignItems: 'center',
    marginLeft: 200,
    bottom: 30,
  },
});
export default SplashScreen;
