import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieCommentApiData } from '../../types/apiType/movieComment';

export interface MovieCommentState {
  content: MovieCommentApiData[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieCommentState = {
  content: [],
  loading: true,
  error: null,
};

const MovieCommentSlice = createSlice({
  name: 'movieComment',
  initialState,
  reducers: {
    getMovieComment(state, action: PayloadAction<{ movieId: string }>) {},

    getMovieCommentSuccess(
      state,
      action: PayloadAction<MovieCommentApiData[]>
    ) {
      state.content = action.payload;
      state.loading = false;
    },

    addMovieComment(
      state,
      action: PayloadAction<{ movieId: string; content: string }>
    ) {},
    addMovieCommentSuccess(state, action: PayloadAction<MovieCommentApiData>) {
      state.content.push(action.payload);
    },
    deleteMovieComment(
      state,
      action: PayloadAction<{ id: number; index: number }>
    ) {},
    deleteMovieCommentSuccess(state, action: PayloadAction<number>) {
      state.content.splice(action.payload, 1);
    },
    serverTaskFailure(state) {
      state.error = '에러 발생';
      state.loading = false;
    },
    initializeMovieComment(state) {
      state = initialState;
    },
  },
});

export const {
  getMovieComment,
  getMovieCommentSuccess,
  addMovieComment,
  addMovieCommentSuccess,
  deleteMovieComment,
  deleteMovieCommentSuccess,
  serverTaskFailure,
  initializeMovieComment,
} = MovieCommentSlice.actions;

export default MovieCommentSlice.reducer;
