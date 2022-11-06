import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getNews = createAsyncThunk(
  'news/getNews',
  async function (
    {media = 'True', lang = 'en', topic = 'music', country = 'UK'},
    {rejectWithValue},
  ) {
    try {
      const {data} = await axios.get(
        `https://newscatcher.p.rapidapi.com/v1/latest_headlines?lang=${lang}&media=${media}&topic=${topic}&country=${country}`,
        {
          headers: {
            'X-RapidAPI-Key':
              '137bda8e27msh249168e3b81f9e7p117cfcjsn57014fc1fda2',
            'X-RapidAPI-Host': 'newscatcher.p.rapidapi.com',
          },
        },
      );
      // console.log(data);
      return data.articles;
    } catch (error) {
      return error.message;
    }
  },
);

const initialState = {
  articles: [],
  language: 'en',
  status: null,
  message: '',
};
const NewsSlice = createSlice({
  name: 'news',
  initialState,

  reducers: {
    getArticles(state, action) {
      state.articles = [action.payload];
    },
  },

  extraReducers: {
    [getNews.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getNews.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.articles = action.payload;
    },
    [getNews.rejected]: (state, action) => {
      state.status = 'error';
      console.log(action);
      state.message = action.payload;
    },
  },
});

export const {getArticles} = NewsSlice.actions;

export default NewsSlice.reducer;
