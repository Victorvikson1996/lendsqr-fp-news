import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {COLORS} from '../../utils';
import {Loader} from '../../components/Loader';
import DefaultTextInput from '../../components/DefaultTextInput/DefaultTextInput';
import {DefaultButton} from '../../components/Buttons/Button';
import {signUpUsers, setAuthenticated} from '../../Redux/Slice/UserSclice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {WEB_ID} from '../../utils/Config';

import {useDispatch} from 'react-redux';
import {setLogIn, setSignIn} from '../../Redux/Slice/_authSlice';

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = React.useState({
    email: '',
    fullname: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError('Please input fullname', 'fullname');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Please input phone number', 'phone');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 7) {
      handleError('Min password length of 7', 'password');
      isValid = false;
    }

    if (isValid) {
      register(inputs);
    }
  };

  const register = ({email, password}) => {
    setLoading(true);
    // auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(user => {
    //     console.log(user);
    //   })
    //   .catch(error => {
    //     const {code} = error;

    //     if (code === 'auth/email-already-in-use') {
    //       return Alert.alert('SignUp', 'E-mail is already in use');
    //     }
    //   });
    setTimeout(() => {
      try {
        setLoading(false);

        AsyncStorage.setItem('userData', JSON.stringify(inputs));
        navigation.navigate('LOG');
      } catch (error) {
        crashlytics().recordError(error);
        Alert.alert('Error', 'Something went wrong');
      }
    }, 3000);
  };

  const handleLogin = async ({email, password}) => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);
        })
        .then(() => {
          dispatch(setSignIn(inputs));

          navigation.navigate('LOG');
        })
        .catch(error => {
          const {code} = error;
          crashlytics().recordError(error);

          if (code === 'auth/email-already-in-use') {
            return Alert.alert('SignUp', 'E-mail is already in use');
          }
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      if (error === 'auth/email-already-in-use')
        return Alert.alert('Email is already in use');
    }
  };

  const GoogleSignUp = async () => {
    GoogleSignin.configure({
      webClientId: WEB_ID,
      offlineAccess: false,
    });

    crashlytics().log('User signed in.');
    const {idToken} = await GoogleSignin.signIn();
    const googleCred = auth.GoogleAuthProvider.credential(idToken);
    const user_sign_up = auth()
      .signInWithCredential(googleCred)
      .then(() => {
        navigation.navigate('HOME');
      });

    user_sign_up
      .then(user => {
        console.log(user);
      })
      .catch(error => {
        console.log(error);
        crashlytics().recordError(error);
      });
  };

  const _signin = async ({email, password}) => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);
        })
        .then(() => {
          dispatch(setAuthenticated(true));
          navigation.navigate('LOG');
        })
        .catch(error => {
          const {code} = error;
          crashlytics().recordError(error);

          if (code === 'auth/email-already-in-use') {
            return Alert.alert('SignUp', 'E-mail is already in use');
          }
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      if (error === 'auth/email-already-in-use')
        return Alert.alert('Email is already in use');
    }
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset="25">
          <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
            Register
          </Text>
          <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
            Enter Your Details to Register
          </Text>
          <View style={{marginVertical: 20}}>
            <DefaultTextInput
              onChangeText={text => handleOnchange(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              iconName="email-outline"
              label="Email"
              placeholder="Enter your email address"
              error={errors.email}
            />

            <DefaultTextInput
              onChangeText={text => handleOnchange(text, 'fullname')}
              onFocus={() => handleError(null, 'fullname')}
              iconName="account-outline"
              label="Full Name"
              placeholder="Enter your full name"
              error={errors.fullname}
            />

            <DefaultTextInput
              keyboardType="numeric"
              onChangeText={text => handleOnchange(text, 'phone')}
              onFocus={() => handleError(null, 'phone')}
              iconName="phone-outline"
              label="Phone Number"
              placeholder="Enter your phone no"
              error={errors.phone}
            />
            <DefaultTextInput
              onChangeText={text => handleOnchange(text, 'password')}
              onFocus={() => handleError(null, 'password')}
              iconName="lock-outline"
              label="Password"
              placeholder="Enter your password"
              error={errors.password}
              password
            />

            <DefaultButton title="Register" onPress={validate} />
            <Text
              onPress={() => navigation.navigate('LOG')}
              style={{
                color: COLORS.blue,
                //   fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 15,
              }}>
              Already have account ?Login
            </Text>
            <Text
              onPress={GoogleSignUp}
              style={{
                color: COLORS.blue,
                //   fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 15,
                top: 5,
              }}>
              Sign Up with Google Account
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
