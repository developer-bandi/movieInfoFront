import { all, call, put, takeLeading } from 'redux-saga/effects';
import { axiosGetMovieSearch } from '../../lib/api';
import { searchMovieFailure, searchMovieSuccess } from './Reducer';
import { MovieSearchApiData } from '../../types/apiType/movieSearch';

function* axiosGetMovieSearchApi(action: {
  type: string;
  payload: { keyword: string; page: number };
}) {
  try {
    const searchResultData: { data: MovieSearchApiData } = yield call(
      axiosGetMovieSearch,
      action.payload
    );
    console.log(searchResultData);
    yield put(searchMovieSuccess(searchResultData.data));
  } catch (error) {
    yield put(searchMovieFailure());
  }
}

export function* getMovieSearchSaga() {
  yield all([takeLeading('movieSearch/searchMovie', axiosGetMovieSearchApi)]);
}
