import { all, call, put, takeLeading } from 'redux-saga/effects';
import { HomePosterApiData } from '../../types/apiType/HomePoster';
import { axiosGetHomePoster } from '../../lib/api';
import { getHomePosterFailure, getHomePosterSuccess } from './Reducer';

function* axiosGetHomePosterApi() {
  try {
    const homePosterData: { data: HomePosterApiData } = yield call(
      axiosGetHomePoster
    );
    yield put(getHomePosterSuccess(homePosterData.data));
  } catch (error) {
    yield put(getHomePosterFailure());
  }
}

export function* getHomePosterSaga() {
  yield all([takeLeading('homePoster/getHomePoster', axiosGetHomePosterApi)]);
}
