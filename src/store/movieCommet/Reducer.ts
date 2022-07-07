import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieCommentApiData } from '../../types/apiType/movieComment';

export interface MovieCommentState {
  content?: MovieCommentApiData[];
  loading: boolean;
  error: boolean;
}

const initialState: MovieCommentState = {
  loading: true,
  error: false,
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
    getMovieCommentFailure(state) {
      state.error = true;
      state.loading = false;
    },

    addMovieComment(
      state,
      action: PayloadAction<{ movieId: string; content: string }>
    ) {},
    addMovieCommentSuccess(state, action: PayloadAction<MovieCommentApiData>) {
      if (state.content !== undefined) {
        state.content.push(action.payload);
      }
    },
    addMovieCommentFailure(state) {
      state.error = true;
      state.loading = false;
      alert('오류가 발생하여 댓글을 등록하지 못했습니다');
    },
    deleteMovieComment(
      state,
      action: PayloadAction<{ id: number; index: number }>
    ) {},
    deleteMovieCommentSuccess(state, action: PayloadAction<number>) {
      if (state.content !== undefined) {
        state.content.splice(action.payload, 1);
      }
    },
    deleteMovieCommentFailure(state) {
      state.error = true;
      state.loading = false;
      alert('오류가 발생하여 댓글을 삭제하지 못했습니다');
    },
    initializeMovieComment(state) {
      delete state.content;
      state.error = false;
      state.loading = true;
    },
  },
});

export const {
  getMovieComment,
  getMovieCommentSuccess,
  getMovieCommentFailure,
  addMovieComment,
  addMovieCommentSuccess,
  addMovieCommentFailure,
  deleteMovieComment,
  deleteMovieCommentSuccess,
  deleteMovieCommentFailure,
  initializeMovieComment,
} = MovieCommentSlice.actions;

export default MovieCommentSlice.reducer;
