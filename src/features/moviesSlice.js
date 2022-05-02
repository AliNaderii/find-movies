import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from '../constants/movieApi';
import axios from "axios";

const initialState = {
  movies: [],
  series: [],
  status: 'idle',
  error: null,
  term: 'harry',
  moviesPageIndex: 1,
  seriesPageIndex: 1
};

export const getAllMovies = createAsyncThunk('movies/getAllMovies',
  async (terms = {}) => {
    const term = terms.term || initialState.term;
    const page = terms.nextPage || 1;
    try {
      const res = await axios.get(`${BASE_URL}&s=${term}&type=movie&page=${page}`);
      if (!res) {
        throw new Error('Something went worng');
      }
      return {
        data: res.data,
        term: terms.term,
      };
    }
    catch (err) {
      return err.message;
    }
  });

export const getAllSeries = createAsyncThunk('movies/getAllSeries',
  async (terms = {}) => {
    const term = terms.term || initialState.term;
    const page = terms.nextPage || 1;
    try {
      const res = await axios.get(`${BASE_URL}&s=${term}&type=series&page=${page}`);
      if (!res) {
        throw new Error('Something went worng');
      }
      return {
        data: res.data,
        term: terms.term,
      };
    }
    catch (err) {
      return err.message;
    }
  });

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovies: (state, action) => {
      state.movies = action.payload;
    },

    incrementPage: (state, { payload }) => {
      if (payload === 'movies') {
        ++state.moviesPageIndex;
      }
      else {
        ++state.seriesPageIndex;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllMovies.pending, (state, action) => {
          state.status = 'loading';
        }
      )
      .addCase(
        getAllMovies.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.movies = [...action.payload.data.Search];
          state.term = action.payload.term;
        }
      )
      .addCase(
        getAllMovies.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      );

    builder
      .addCase(
        getAllSeries.pending, (state, action) => {
          state.status = 'loading';
        }
      )
      .addCase(
        getAllSeries.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.series = [...action.payload.data.Search];
          state.term = action.payload.term;
        }
      )
      .addCase(
        getAllSeries.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      );
  }
});

export const selectAllMovies = state => state.movies.movies;
export const selectAllSeries = state => state.movies.series;
export const { addMovies, incrementPage } = moviesSlice.actions;
export default moviesSlice.reducer;