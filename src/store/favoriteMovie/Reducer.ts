import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FavoriteMovieApiData,
  FavoriteMovieInfo,
} from '../../types/apiType/favoriteMovie';

export interface FavoriteMovieState {
  content?: FavoriteMovieApiData;
  loading: boolean;
  error: string | null;
}

const initialState: FavoriteMovieState = {
  loading: true,
  error: null,
};

const MovieCommentSlice = createSlice({
  name: 'favoriteMovie',
  initialState,
  reducers: {
    getFavoriteMovie() {},
    getFavoriteMovieSuccess(
      state,
      action: PayloadAction<FavoriteMovieApiData>
    ) {
      state.content = action.payload;
      state.loading = false;
    },
    getFavoriteMovieFailure(state) {
      state.error = '에러 발생';
      state.loading = false;
      alert('에러가 발생하여 즐겨찾기를 하지 못했습니다');
    },

    addFavoriteMovie(
      state,
      action: PayloadAction<{
        movieId: string;
        movieName: string;
        posterPath: string;
      }>
    ) {},
    addFavoriteMovieSuccess(state, action: PayloadAction<FavoriteMovieInfo>) {
      if (state.content !== undefined) state.content.push(action.payload);
    },
    addFavoriteMovieFailure(state) {
      state.error = '에러 발생';
      state.loading = false;
    },
    deleteFavoriteMovie(
      state,
      action: PayloadAction<{ id: number; index: number }>
    ) {},
    deleteFavoriteMovieSuccess(state, action: PayloadAction<number>) {
      if (state.content !== undefined) state.content.splice(action.payload, 1);
    },
    deleteFavoriteMovieFailure(state) {
      state.error = '에러 발생';
      state.loading = false;
    },
    initializeFavoriteMovie(state) {
      state = initialState;
    },
  },
});

export const {
  getFavoriteMovie,
  getFavoriteMovieSuccess,
  getFavoriteMovieFailure,
  addFavoriteMovie,
  addFavoriteMovieSuccess,
  addFavoriteMovieFailure,
  deleteFavoriteMovie,
  deleteFavoriteMovieSuccess,
  deleteFavoriteMovieFailure,
  initializeFavoriteMovie,
} = MovieCommentSlice.actions;

export default MovieCommentSlice.reducer;
