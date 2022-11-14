import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {View, Text, SafeAreaView, Keyboard, Alert} from 'react-native';
import {COLORS} from '../../utils';
import {Loader} from '../../components/Loader';
import DefaultTextInput from '../../components/DefaultTextInput/DefaultTextInput';
import {DefaultButton} from '../../components/Buttons/Button';
import {
  signUpUsers,
  setAuthenticated,
  loginUsers,
} from '../../Redux/Slice/UserSclice';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {logInEmail} from '../../Redux/Slice/AuthSlice';
import {SignUp} from '../../Redux/Slice/authenticationSlice';
import {WEB_ID} from '../../utils/Config';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import crashlytics from '@react-native-firebase/crashlytics';

import {setLogIn, setSignIn} from '../../Redux/Slice/_authSlice';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = React.useState({email: '', password: ''});
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [google, setGoogle] = React.useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      // SignIn(inputs);
      // handleLogin(inputs);
      login(inputs);
    }
  };

  const USER_COLLECTION = 'victorvikson@gmail.com';

  const GoogleSignUp = async () => {
    GoogleSignin.configure({
      webClientId: WEB_ID,
      offlineAccess: false,
    });
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

  const login = (email, password) => {
    setLoading(true);

    setTimeout(async () => {
      setLoading(false);

      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (
          inputs.email == userData.email &&
          inputs.password == userData.password
        ) {
          navigation.navigate('HOME');
          AsyncStorage.setItem(
            'userData',
            JSON.stringify({...userData, loggedIn: true}),
          ).then(error => {
            crashlytics().recordError(error);
          });
        } else {
          Alert.alert('Error', 'Invalid Details');
        }
      } else {
        Alert.alert('Error', 'User does not exist');
      }
    }, 3000);
  };
  const _signIn = async ({email, password}) => {
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          const user = userCredential.user;
          console.log(user);
        })
        .then(() => {
          dispatch(setAuthenticated(true));
          dispatch(loginUsers(inputs));
          navigation.navigate('HOME');
        })

        .catch(error => {
          const {code} = error;

          if (code === 'auth/wrong-password') {
            return Alert.alert(
              'SignIn',
              'The password is invalid or the user does not have a password.',
            );
          }

          if (code === 'auth/user-not-found') {
            Alert.alert(
              'SignIn',
              'There is no user record corresponding to this e-mail.',
            );
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {}
  };

  const handleLogin = async ({email, password}) => {
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);
        })
        .then(() => {
          dispatch(setLogIn());
          navigation.navigate('HOME');
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
      <View style={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
          Log In
        </Text>
        <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Login
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
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <DefaultButton title="Log In" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('REG')}
            style={{
              color: COLORS.blue,
              // fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Don't have account ?Register
          </Text>
          <Text
            onPress={GoogleSignUp}
            style={{
              color: COLORS.blue,
              // fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
              marginTop: 10,
            }}>
            Login With Your Goggle Account
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
