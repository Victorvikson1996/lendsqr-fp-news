import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableHighlight,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React from 'react';
import {COLORS} from '../utils';
import moment from 'moment';
import {BackMenuIcon} from '../assets/icon';

const UserScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()} style={styles.icon}>
          <BackMenuIcon />
        </Pressable>
        <Text style={styles.date}>{moment().calendar()}</Text>
        <Text style={styles.dateText}>Hey! Victor </Text>
        <Pressable
          onPress={() => navigation.navigate('LOGIN')}
          style={{marginTop: 50}}>
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
