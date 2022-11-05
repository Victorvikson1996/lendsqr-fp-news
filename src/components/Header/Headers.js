import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils';
import moment from 'moment';
import {Button} from '../Buttons';
import {MenuIcon} from '../../assets/icon';
import {useNavigation} from '@react-navigation/native';

const Headers = () => {
  const navigation = useNavigation();
  const _goToUser = () => {
    navigation.navigate('USER');
  };
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.date}>{moment().calendar()}</Text>
      <Text style={styles.dateText}>News Today 🌎 </Text>
      <Pressable>
        <Text style={styles.error}>Erro Handling</Text>
      </Pressable>
      <TouchableOpacity onPress={_goToUser} style={styles.menu}>
        <MenuIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  menu: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 2,
    // height: 20,
    // width: 40,
  },
});

export default Headers;
