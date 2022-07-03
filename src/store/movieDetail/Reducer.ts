import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieDetailApiData } from '../../types/apiType/movieDetail';

export interface MovieDetailState {
  content?: MovieDetailApiData;
  loading: boolean;
  error: string | null;
}

const initialState: MovieDetailState = {
  loading: true,
  error: null,
};

const HomePosterSlice = createSlice({
  name: 'movieDetail',
  initialState,

  reducers: {
    getMovieDetail(state, action: PayloadAction<{ id: number }>) {},

    getMovieDetailSuccess(state, action: PayloadAction<MovieDetailApiData>) {
      state.content = action.payload;
      state.loading = false;
    },

    getMovieDetailFailure(state) {
      state.error = '에러 발생';
      state.loading = false;
    },
    initializeMovieDetail(state) {
      state = initialState;
    },
  },
});

export const {
  getMovieDetail,
  getMovieDetailSuccess,
  getMovieDetailFailure,
  initializeMovieDetail,
} = HomePosterSlice.actions;

export default HomePosterSlice.reducer;
