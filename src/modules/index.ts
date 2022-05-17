import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import homePosterInfo, { homePosterSaga } from './homeposter';
import sortedMovieInfo, { SortedMovieSaga } from './sortedmoive';
import movieDetailInfo, { MovieDetailSaga } from './moviedetail';
import movieSearchInfo, { MovieSearchResultSaga } from './moviesearch';
import posterposition from './posterposition';
import userReducer, { checkLoginUserSaga, doLogoutSaga } from './user';
import movieCommentReducer, {
  getMovieCommentSaga,
  addMovieCommentSaga,
  deleteMovieCommentSaga,
} from './moviecomment';
import movieLikeReducer, {
  getLikemovieSaga,
  addLikemovieSaga,
  deleteLikemovieSaga,
} from './likemovie';
import loadingReducer from './loading';
const rootReducer = combineReducers({
  homePosterInfo,
  sortedMovieInfo,
  movieDetailInfo,
  movieSearchInfo,
  posterposition,
  userReducer,
  movieCommentReducer,
  movieLikeReducer,
  loadingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([
    homePosterSaga(),
    SortedMovieSaga(),
    MovieDetailSaga(),
    MovieSearchResultSaga(),
    checkLoginUserSaga(),
    doLogoutSaga(),
    getMovieCommentSaga(),
    addMovieCommentSaga(),
    deleteMovieCommentSaga(),
    getLikemovieSaga(),
    addLikemovieSaga(),
    deleteLikemovieSaga(),
  ]);
}

export default rootReducer;
