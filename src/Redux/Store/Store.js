import {configureStore} from '@reduxjs/toolkit';
import NewsSlice from '../Slice/NewsSlice';
import UserSclice from '../Slice/UserSclice';
import UserReducer from '../Slice/UserSclice';
import NewsReducer from '../Slice/NewsSlice';
import {authenticationReducer} from '../Slice/authenticationSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _authSlice from '../Slice/_authSlice';

const rootReducer = combineReducers({
  user: UserReducer,
  news: NewsReducer,
  authentic: _authSlice,
});

const persistConfig = {
  key: 'lensqrNews',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['user', 'news'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const Store = configureStore({
//   reducer: {
//     news: NewsSlice,
//     user: UserSclice,
//   },
// });

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(Store);
