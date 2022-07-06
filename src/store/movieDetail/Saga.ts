import { all, call, put, takeLeading } from 'redux-saga/effects';
import { axiosGetMovieDetail } from '../../lib/api';
import { MovieDetailApiData } from '../../types/apiType/movieDetail';
import { getMovieDetailFailure, getMovieDetailSuccess } from './Reducer';

function* axiosGetMovieDetailApi(action: {
  type: string;
  payload: { movieId: string };
}) {
  try {
    const homePosterData: { data: MovieDetailApiData } = yield call(
      axiosGetMovieDetail,
      action.payload.movieId
    );
    console.log(homePosterData.data);
    yield put(getMovieDetailSuccess(homePosterData.data));
  } catch (error) {
    yield put(getMovieDetailFailure());
  }
}

export function* getMovieDetailSaga() {
  yield all([
    takeLeading('movieDetail/getMovieDetail', axiosGetMovieDetailApi),
  ]);
}
