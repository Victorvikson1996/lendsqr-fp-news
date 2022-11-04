import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {COLORS} from '../../utils';

const Button = ({onPress, text}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.lendsqr,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Button;
