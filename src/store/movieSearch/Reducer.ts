import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieSearchApiData } from '../../types/apiType/movieSearch';

export interface MovieSearchState {
  content: {
    searchResult?: MovieSearchApiData;
    keyword: string;
  };
  loading: boolean;
  error: boolean;
}

const initialState: MovieSearchState = {
  content: { keyword: '' },
  loading: false,
  error: false,
};

const MovieSearchSlice = createSlice({
  name: 'movieSearch',
  initialState,

  reducers: {
    searchMovie(
      state,
      action: PayloadAction<{ keyword: string; page: number }>
    ) {
      state.content = { keyword: action.payload.keyword };
      state.loading = true;
      state.error = false;
    },
    searchMovieSuccess(state, action: PayloadAction<MovieSearchApiData>) {
      state.content.searchResult = action.payload;
      state.loading = false;
    },
    searchMovieFailure(state) {
      state.error = true;
      state.loading = false;
    },
    initializeMovieSearch(state) {
      state.content = { keyword: '' };
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  searchMovie,
  searchMovieSuccess,
  searchMovieFailure,
  initializeMovieSearch,
} = MovieSearchSlice.actions;

export default MovieSearchSlice.reducer;
