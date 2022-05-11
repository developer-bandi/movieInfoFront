import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import homePosterInfo, { homePosterSaga } from './homeposter';
import sortedMovieInfo, { SortedMovieSaga } from './sortedmoive';
import movieDetailInfo, { MovieDetailSaga } from './moviedetail';
import movieSearchInfo, { MovieSearchResultSaga } from './moviesearch';
import posterposition from './posterposition';
const rootReducer = combineReducers({
  homePosterInfo,
  sortedMovieInfo,
  movieDetailInfo,
  movieSearchInfo,
  posterposition,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([
    homePosterSaga(),
    SortedMovieSaga(),
    MovieDetailSaga(),
    MovieSearchResultSaga(),
  ]);
}

export default rootReducer;
