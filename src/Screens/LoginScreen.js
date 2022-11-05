import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Button} from '../components/Buttons';
import * as Animatable from 'react-native-animatable';
import {Input} from '../components/Input';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../utils';
import {GoogleIcon} from '../assets/icon';

const useLoginFormState = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [submit, setSubmit] = useState(false);

  let isUsernameValid = false;
  let isPasswordValid = false;
  let isFullNameValid = false;
  let isPhoneNumberValid = false;
  let isEmailValid = false;

  if (username === 'example') {
    isUsernameValid = true;
  }

  if (fullName === 'LendsQr') {
    isFullNameValid = true;
  }

  if (email === 'LendsQr') {
    isEmailValid = true;
  }

  if (phoneNumber === 'LendsQr') {
    isPhoneNumberValid = true;
  }

  if (password === 'asdf') {
    isPasswordValid = true;
  }

  return {
    username: {
      value: username,
      set: setUsername,
      valid: isUsernameValid,
    },
    fullName: {
      value: fullName,
      set: setFullName,
      valid: isUsernameValid,
    },
    password: {
      value: password,
      set: setPassword,
      valid: isPasswordValid,
    },
    phoneNumber: {
      value: phoneNumber,
      set: setPhoneNumber,
      valid: isPhoneNumberValid,
    },
    email: {
      value: email,
      set: setEmail,
      valid: isEmailValid,
    },
    submit: {
      value: submit,
      set: () => setSubmit(true),
    },
  };
};

const LoginScreen = () => {
  const {username, password, submit, phoneNumber, fullName, email} =
    useLoginFormState();

  const navigation = useNavigation();

  const _goToLogin = () => {
    navigation.navigate('HOME');
  };

  const _goToHome = () => {
    // navigation.navigate('HOME');
    Alert.alert('Are You Sure You Want to Use Your Google Mail');
  };
  const _goToSignUp = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset="25">
        <Text style={styles.headerText}>Login</Text>
        <Input
          label="Email"
          placeholder="email"
          onChangeText={email.set}
          error={submit.value && !email.valid}
        />
        <Input
          label="Password"
          placeholder="***"
          secureTextEntry
          onChangeText={password.set}
          error={submit.value && !password.valid}
        />
        <Button text="Login" onPress={_goToLogin} />

        <Pressable
          style={{marginTop: 15, alignItems: 'center'}}
          onPress={_goToSignUp}>
          <Text style={{color: COLORS.blue}}>
            Register New Account? SignUp{' '}
          </Text>
        </Pressable>
        <Pressable onPress={_goToHome} style={styles.registerContainer}>
          <Text style={styles.registerText}>Login with Google Account</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  headerText: {
    color: '#353031',
    fontWeight: 'bold',
    fontSize: 34,
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: '#f4f6f8',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  error: {
    backgroundColor: '#cc0011',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#9374b7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 15,
    alignContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: COLORS.blue,
  },
});

export default LoginScreen;
