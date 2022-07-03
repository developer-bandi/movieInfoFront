import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import favoriteMovie from './favoriteMovie/Reducer';
import {
  deleteFavoriteMovieSaga,
  getFavoriteMovieSaga,
  postFavoriteMovieSaga,
} from './favoriteMovie/Saga';
import homePoster from './homePoster/Reducer';
import { getHomePosterSaga } from './homePoster/Saga';
import moiveComment from './movieCommet/Reducer';
import {
  deleteMovieCommentSaga,
  getMovieCommentSaga,
  postMovieCommentSaga,
} from './movieCommet/Saga';
import movieDetail from './movieDetail/Reducer';
import { getMovieDetailSaga } from './movieDetail/Saga';
import movieRank from './movieRank/Reducer';
import { getMovieRankSaga } from './movieRank/Saga';
import movieSearch from './movieSearch/Reducer';
import { getMovieSearchSaga } from './movieSearch/Saga';
import user from './user/Reducer';
import { getCheckLoginSaga, getLogoutSaga } from './user/Saga';

const rootReducer = combineReducers({
  favoriteMovie,
  homePoster,
  moiveComment,
  movieDetail,
  movieRank,
  movieSearch,
  user,
});

export function* rootSaga() {
  // all 은 여러 사가를 동시에 실행시켜준다. 현재는 animalSaga 하나.
  yield all([
    getFavoriteMovieSaga(),
    postFavoriteMovieSaga(),
    deleteFavoriteMovieSaga(),
    getHomePosterSaga(),
    getMovieCommentSaga(),
    postMovieCommentSaga(),
    deleteMovieCommentSaga(),
    getMovieDetailSaga(),
    getMovieRankSaga(),
    getMovieSearchSaga(),
    getCheckLoginSaga(),
    getLogoutSaga(),
  ]);
}

export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
