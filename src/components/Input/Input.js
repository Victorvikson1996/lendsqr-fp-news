import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import {COLORS} from '../../utils';

const Error = ({display = false}) => {
  const viewElement = useRef(null);

  useEffect(() => {
    if (display) {
      viewElement.current.animate('shake', 500, 'linear');
    } else {
      viewElement.current.animate('bounceOut', 500);
    }
  }, [display]);

  const viewStyles = [styles.error, {opacity: 0}];

  if (display) {
    viewStyles.push({opacity: 1});
  }

  return (
    <Animatable.View style={viewStyles} ref={viewElement}>
      <Text style={styles.errorText}>X</Text>
    </Animatable.View>
  );
};

const Input = ({label, error, ...props}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>

      <View style={styles.row}>
        <TextInput autoCapitalize="none" style={styles.input} {...props} />

        <Error display={error} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#f4f6f8',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  inputLabel: {
    fontSize: 10,
    color: '#b4b6b8',
  },
  input: {
    color: '#353031',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 3,
    marginRight: 10,
    flex: 1,
  },
  errorText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Input;
