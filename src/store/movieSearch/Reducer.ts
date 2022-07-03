import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieSearchApiData } from '../../types/apiType/movieSearch';

export interface MovieSearchState {
  content: {
    searchResult?: MovieSearchApiData;
    keyword: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: MovieSearchState = {
  content: { keyword: '' },
  loading: false,
  error: null,
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
      state.error = null;
    },
    searchMovieSuccess(state, action: PayloadAction<MovieSearchApiData>) {
      state.content.searchResult = action.payload;
      state.loading = false;
    },
    searchMovieFailure(state) {
      state.error = '에러 발생';
      state.loading = false;
    },
    initializeMovieSearch(state) {
      state = initialState;
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
