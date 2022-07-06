import { all, call, put, takeLeading } from 'redux-saga/effects';
import {
  axiosDeleteMovieComment,
  axiosGetMovieComment,
  axiosPostMovieComment,
} from '../../lib/api';
import { MovieCommentApiData } from '../../types/apiType/movieComment';
import {
  addMovieCommentSuccess,
  deleteMovieCommentSuccess,
  getMovieCommentSuccess,
  serverTaskFailure,
} from './Reducer';

function* axiosGetMovieCommentApi(action: {
  type: string;
  payload: { movieId: string };
}) {
  try {
    const movieCommentData: { data: MovieCommentApiData[] } = yield call(
      axiosGetMovieComment,
      action.payload.movieId
    );
    yield put(getMovieCommentSuccess(movieCommentData.data));
  } catch (error) {
    yield put(serverTaskFailure());
  }
}

export function* getMovieCommentSaga() {
  yield all([
    takeLeading('movieComment/getMovieComment', axiosGetMovieCommentApi),
  ]);
}

function* axiosPostMovieCommentApi(action: {
  type: string;
  payload: { movieId: string; content: string };
}) {
  try {
    const movieCommentData: { data: MovieCommentApiData } = yield call(
      axiosPostMovieComment,
      action.payload
    );
    yield put(addMovieCommentSuccess(movieCommentData.data));
  } catch (error) {
    yield put(serverTaskFailure());
  }
}

export function* postMovieCommentSaga() {
  yield all([
    takeLeading('movieComment/addMovieComment', axiosPostMovieCommentApi),
  ]);
}

function* axiosDeleteMovieCommentApi(action: {
  type: string;
  payload: { id: number; index: number };
}) {
  try {
    yield call(axiosDeleteMovieComment, action.payload.id);
    yield put(deleteMovieCommentSuccess(action.payload.index));
  } catch (error) {
    console.error(error);
    yield put(serverTaskFailure());
  }
}

export function* deleteMovieCommentSaga() {
  yield all([
    takeLeading('movieComment/deleteMovieComment', axiosDeleteMovieCommentApi),
  ]);
}
