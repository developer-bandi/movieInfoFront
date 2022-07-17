import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import imagePreload from '../../lib/imagePreload';
import { MovieRankApiData } from '../../types/apiType/movieRank';

export interface MovieRankState {
  content: { type: string; movieInfo?: MovieRankApiData };
  loading: boolean;
  error: boolean;
}

const initialState: MovieRankState = {
  content: { type: 'popular' },
  loading: true,
  error: false,
};

const MovieRankSlice = createSlice({
  name: 'movieRank',
  initialState,

  reducers: {
    getMovieRank() {},

    getMovieRankSuccess(state, action: PayloadAction<MovieRankApiData>) {
      state.content.movieInfo = action.payload;
      state.loading = false;
      action.payload.topRated.forEach((movieInfo) => {
        imagePreload(movieInfo.posterPath);
      });
    },

    getMovieRankFailure(state) {
      state.error = true;
      state.loading = false;
    },
    setRankType(state, action: PayloadAction<string>) {
      state.content.type = action.payload;
    },
  },
});

export const {
  getMovieRank,
  getMovieRankSuccess,
  getMovieRankFailure,
  setRankType,
} = MovieRankSlice.actions;

export default MovieRankSlice.reducer;
