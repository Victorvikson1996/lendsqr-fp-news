import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils';
import moment from 'moment';
import {Button} from '../Buttons';

const Headers = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.date}>{moment().calendar()}</Text>
      <Text style={styles.dateText}>News Today</Text>
      <Pressable>
        <Text style={styles.error}>Erro Handling</Text>
      </Pressable>
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
});

export default Headers;
