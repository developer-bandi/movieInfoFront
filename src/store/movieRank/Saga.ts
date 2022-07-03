import { all, call, put, takeLeading } from 'redux-saga/effects';
import { axiosGetMovieRank } from '../../lib/api';
import { getMovieRankFailure, getMovieRankSuccess } from './Reducer';
import { MovieRankApiData } from '../../types/apiType/movieRank';

function* axiosGetMovieRankApi() {
  try {
    const homePosterData: { data: MovieRankApiData } = yield call(
      axiosGetMovieRank
    );
    yield put(getMovieRankSuccess(homePosterData.data));
  } catch (error) {
    yield put(getMovieRankFailure());
  }
}

export function* getMovieRankSaga() {
  yield all([takeLeading('movieRank/getMovieRank', axiosGetMovieRankApi)]);
}
