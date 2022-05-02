import { configureStore } from "@reduxjs/toolkit";
// reducers
import moviesReducer from './moviesSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer
  }
});

export default store;