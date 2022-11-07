import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const initalState = {
  user: {},
  userToken: '',
  error: {
    errorOccured: false,
    errorMain: '',
    errorBody: '',
  },
};

export const signUpwithEmail = createAsyncThunk();
