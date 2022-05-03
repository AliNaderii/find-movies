import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from '../constants/movieApi';
import axios from "axios";

const initialState = {
  movies: [],
  series: [],
  status: 'idle',
  error: null,
  defaultTerm: 'harry',
  term: '',
  totalResults: 0,
  pageIndex: 1,
};

export const getAllMovies = createAsyncThunk('movies/getAllMovies',
  async (terms) => {
    const { term, page = 1 } = terms;
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
  async (terms) => {
    const { term, page } = terms;
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
    incrementPage: (state, action) => {
      ++state.pageIndex;
    },

    resetState: (state, action) => {
      state.error = null;
      state.pageIndex = 1;
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
        getAllMovies.fulfilled, (state, { payload }) => {
          if (payload.data.Error) {
            state.error = payload.data.Error;
            return;
          } else {
            const { term } = payload;
            const { Search: movies, totalResults } = payload.data;
            state.status = 'succeeded';
            Object.assign(state, { movies, term, totalResults });
          }

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
        getAllSeries.fulfilled, (state, { payload }) => {
          if (payload.data.Error) {
            state.error = payload.data.Error;
            return;
          } else {
            const { term } = payload;
            const { Search: series, totalResults } = payload.data;
            state.status = 'succeeded';
            Object.assign(state, { series, term, totalResults });
          }
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
export const { addMovies, incrementPage, resetState } = moviesSlice.actions;
export default moviesSlice.reducer;