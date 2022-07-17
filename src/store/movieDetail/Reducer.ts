import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieDetailApiData } from '../../types/apiType/movieDetail';

export interface MovieDetailState {
  content?: MovieDetailApiData;
  loading: boolean;
  error: boolean;
}

const initialState: MovieDetailState = {
  loading: true,
  error: false,
};

const MovieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,

  reducers: {
    getMovieDetail(state, action: PayloadAction<{ movieId: string }>) {},

    getMovieDetailSuccess(state, action: PayloadAction<MovieDetailApiData>) {
      state.content = action.payload;
      state.loading = false;
    },

    getMovieDetailFailure(state) {
      state.error = true;
      state.loading = false;
    },
    initializeMovieDetail(state) {
      delete state.content;
      state.error = false;
      state.loading = true;
    },
  },
});

export const {
  getMovieDetail,
  getMovieDetailSuccess,
  getMovieDetailFailure,
  initializeMovieDetail,
} = MovieDetailSlice.actions;

export default MovieDetailSlice.reducer;
