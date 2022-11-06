import {configureStore} from '@reduxjs/toolkit';
import NewsSlice from '../Slice/NewsSlice';

export const Store = configureStore({
  reducer: {
    news: NewsSlice,
  },
});
