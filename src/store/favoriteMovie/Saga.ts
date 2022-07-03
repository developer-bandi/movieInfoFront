import { all, call, put, takeLeading } from 'redux-saga/effects';
import {
  axiosDeleteFavoriteMovie,
  axiosGetFavoriteMovie,
  axiosPostFavoriteMovie,
} from '../../lib/api';
import {
  FavoriteMovieApiData,
  FavoriteMovieInfo,
} from '../../types/apiType/favoriteMovie';
import {
  addFavoriteMovieFailure,
  addFavoriteMovieSuccess,
  deleteFavoriteMovieFailure,
  deleteFavoriteMovieSuccess,
  getFavoriteMovieFailure,
  getFavoriteMovieSuccess,
} from './Reducer';

function* axiosGetFavoriteMovieApi() {
  try {
    const movieCommentData: { data: FavoriteMovieApiData } = yield call(
      axiosGetFavoriteMovie
    );
    yield put(getFavoriteMovieSuccess(movieCommentData.data));
  } catch (error) {
    yield put(getFavoriteMovieFailure());
  }
}

export function* getFavoriteMovieSaga() {
  yield all([
    takeLeading('favoriteMovie/getFavoriteMovie', axiosGetFavoriteMovieApi),
  ]);
}

function* axiosPostFavoriteMovieApi(action: {
  type: string;
  payload: {
    movieId: string;
    movieName: string;
    posterPath: string;
  };
}) {
  try {
    const movieCommentData: { data: FavoriteMovieInfo } = yield call(
      axiosPostFavoriteMovie,
      action.payload
    );
    yield put(addFavoriteMovieSuccess(movieCommentData.data));
  } catch (error) {
    yield put(addFavoriteMovieFailure());
  }
}

export function* postFavoriteMovieSaga() {
  yield all([
    takeLeading('favoriteMovie/addFavoriteMovie', axiosPostFavoriteMovieApi),
  ]);
}

function* axiosDeleteFavoriteMovieApi(action: {
  type: string;
  payload: { id: number; index: number };
}) {
  try {
    yield call(axiosDeleteFavoriteMovie, action.payload.id);
    yield put(deleteFavoriteMovieSuccess(action.payload.index));
  } catch (error) {
    yield put(deleteFavoriteMovieFailure());
  }
}

export function* deleteFavoriteMovieSaga() {
  yield all([
    takeLeading(
      'favoriteMovie/deleteFavoriteMovie',
      axiosDeleteFavoriteMovieApi
    ),
  ]);
}
