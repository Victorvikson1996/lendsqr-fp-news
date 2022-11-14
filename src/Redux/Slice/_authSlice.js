import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  phone: null,
  fullname: null,
  password: null,
};

const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.email = action.payload.email;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.fullname = action.payload.fullname;
      state.phone = action.payload.phone;
      state.isLoggedIn = true;
    },
    setSignOut: state => {
      state.email = null;
      state.fullname = null;
      state.isLoggedIn = false;
    },
  },
  setLogIn: (state, action) => {
    state.isLoggedIn = action.payload.isLoggedIn;
    state.email = action.payload.email;
    state.password = action.payload.password;
    state.isLoggedIn = true;
  },
});

export const {setSignIn, setSignOut, setLogIn} = authSlice.actions;

export const selectIsLoggedIn = state => state.isLoggedIn;
export const selectEmail = state => state.userAuth.email;
export const selectfullName = state => state.userAuth.fullname;
export const selectphone = state => state.userAuth.phone;
export const selectPassword = state => state.userAuth.password;

export default authSlice.reducer;
