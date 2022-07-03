import { all, call, put, takeLeading } from 'redux-saga/effects';
import { axiosGetCheckLogin, axiosGetLogout } from '../../lib/api';
import { UserApiData } from '../../types/apiType/user';
import {
  getFavoriteMovie,
  initializeFavoriteMovie,
} from '../favoriteMovie/Reducer';
import {
  checkLoginuserFailure,
  checkLoginuserSuccess,
  doLogoutFailure,
  doLogoutSuccess,
} from './Reducer';

function* axiosGetCheckLoginApi(action: {
  type: string;
  payload: { movieId: string };
}) {
  try {
    const userInfoData: { data: UserApiData; status: number } = yield call(
      axiosGetCheckLogin
    );
    if (userInfoData.status === 200) yield put(getFavoriteMovie());
    yield put(checkLoginuserSuccess(userInfoData));
  } catch (error) {
    yield put(checkLoginuserFailure());
  }
}

export function* getCheckLoginSaga() {
  yield all([takeLeading('user/checkLoginuser', axiosGetCheckLoginApi)]);
}

function* axiosGetLogoutApi(action: {
  type: string;
  payload: { movieId: string; content: string };
}) {
  try {
    yield call(axiosGetLogout);
    yield put(initializeFavoriteMovie());
    yield put(doLogoutSuccess());
  } catch (error) {
    yield put(doLogoutFailure());
  }
}

export function* getLogoutSaga() {
  yield all([takeLeading('user/doLogout', axiosGetLogoutApi)]);
}
