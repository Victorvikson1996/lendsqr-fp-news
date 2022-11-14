import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const initialState = {
  // user: {},
  userToken: '',
  isLoggedIn: false,
  error: {
    errorOccured: false,
    errorMain: '',
    errorBody: '',
  },
  status: false,
  authenticated: false,
  responseState: false,
  responseMessage: '',
  responseType: '',
  userData: {
    createdAt: null,
    email: '',
    emailVerified: true,
    fullname: '', //firstName: '', //lastName: '',
    phone: '',
    password: '', //
    uid: '',
  },
};

export const signUpUsers = createAsyncThunk('user/signUp', async user => {
  return user;
});

export const loginUsers = createAsyncThunk('user/login', async user => {
  return user;
});

export const UserSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    setUpdateInfo: (state, action) => {
      (state.userData.phoneNumber = action.payload.phoneNumber),
        (state.userData.fullName = action.payload.fullName);
    },
    setResponse: (state, action) => {
      state.responseState = action.payload.responseState;
      state.responseType = action.payload.responseType;
      state.responseMessage = action.payload.responseMessage;
    },
    useSetResponse: state => {
      state.responseState = false;
      state.responseType = '';
      state.responseMessage = '';
    },
    setSignIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setSignOut: (state, action) => {
      state.isLoggedIn = false;
    },

    logoutUser: () => initialState,
  },

  extraReducers: builder => {
    builder.addCase(loginUsers.pending, state => {
      state.status = true;
    });
    builder.addCase(loginUsers.fulfilled, (state, action) => {
      state.status = false;
      state.userData = action.payload;
    });
    builder
      .addCase(signUpUsers.pending, state => {
        state.status = true;
      })
      .addCase(signUpUsers.fulfilled, (state, action) => {
        state.status = false;
        state.userData = action.payload;
      });
  },
});

export const {
  setUser,
  setAuthenticated,
  setResponse,
  useSetResponse,
  logoutUser,
  setUpdateInfo,
  setSignIn,
  setSignOut,
} = UserSlice.actions;

export default UserSlice.reducer;
