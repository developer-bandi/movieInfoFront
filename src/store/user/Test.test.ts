import UserSlice, {
  checkLoginuser,
  checkLoginuserSuccess,
  checkLoginuserFailure,
  doLogout,
  doLogoutSuccess,
  doLogoutFailure,
} from './Reducer';
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';
import { getCheckLoginSaga, getLogoutSaga } from './Saga';
import { axiosGetCheckLogin, axiosGetLogout } from '../../lib/api';

describe('액션 생성 함수 검증', () => {
  it('checkLoginuser 액션 생성', () => {
    const expectedAction = {
      type: 'user/checkLoginuser',
    };
    expect(checkLoginuser()).toEqual(expectedAction);
  });

  it('checkLoginuserSuccess 액션 생성', () => {
    const UserApiData = {
      id: 1,
      userid: 'test',
      nick: 'testnick',
    };
    const payload = {
      data: UserApiData,
      status: 200,
    };
    const expectedAction = {
      type: 'user/checkLoginuserSuccess',
      payload,
    };
    expect(checkLoginuserSuccess(payload)).toEqual(expectedAction);
  });

  it('checkLoginuserFailure 액션 생성', () => {
    const expectedAction = {
      type: 'user/checkLoginuserFailure',
    };
    expect(checkLoginuserFailure()).toEqual(expectedAction);
  });

  it('doLogout 액션 생성', () => {
    const expectedAction = {
      type: 'user/doLogout',
    };
    expect(doLogout()).toEqual(expectedAction);
  });

  it('doLogoutSuccess 액션 생성', () => {
    const expectedAction = {
      type: 'user/doLogoutSuccess',
    };
    expect(doLogoutSuccess()).toEqual(expectedAction);
  });
  it('doLogoutFailure 액션 생성', () => {
    const expectedAction = {
      type: 'user/doLogoutFailure',
    };
    expect(doLogoutFailure()).toEqual(expectedAction);
  });
});

describe('초기 상태, 리듀서 검증', () => {
  const initialState = {
    loading: true,
    error: false,
  };
  it('initial state 검증', () => {
    expect(UserSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});

describe('사가 함수, 사가 함수 관련 리듀서 검증', () => {
  describe('getCheckLoginSaga', () => {
    const UserApiData = {
      id: 1,
      userid: 'test',
      nick: 'testnick',
    };
    it('successLogin', () => {
      const payload = { data: UserApiData, status: 200 };
      return expectSaga(getCheckLoginSaga)
        .withReducer(UserSlice)
        .dispatch({
          type: 'user/checkLoginuser',
        }) // 1,2
        .provide([[call(axiosGetCheckLogin), payload]]) // 3
        .put({ type: 'user/checkLoginuserSuccess', payload }) // 4
        .hasFinalState({
          content: {
            id: 1,
            userid: 'test',
            nick: 'testnick',
          },
          loading: false,
          error: false,
        })
        .silentRun();
    });
    it('successNotLogin', () => {
      const payload = { data: UserApiData, status: 203 };
      return expectSaga(getCheckLoginSaga)
        .withReducer(UserSlice)
        .dispatch({
          type: 'user/checkLoginuser',
        }) // 1,2
        .provide([[call(axiosGetCheckLogin), payload]]) // 3
        .put({ type: 'user/checkLoginuserSuccess', payload }) // 4
        .hasFinalState({
          loading: false,
          error: false,
        })
        .silentRun();
    });
    it('fail', () => {
      return expectSaga(getCheckLoginSaga)
        .withReducer(UserSlice)
        .dispatch({
          type: 'user/checkLoginuser',
        }) // 1,2
        .provide([[call(axiosGetCheckLogin), throwError(new Error('Whoops'))]]) // 3
        .put({
          type: 'user/checkLoginuserFailure',
          payload: undefined,
        }) // 4
        .hasFinalState({
          loading: false,
          error: true,
        })
        .silentRun();
    });
  });
  describe('getLogoutSaga', () => {
    const UserApiData = {
      id: 1,
      userid: 'test',
      nick: 'testnick',
    };
    const payload = { data: UserApiData, status: 200 };
    it('success', () => {
      return expectSaga(getLogoutSaga)
        .withReducer(UserSlice)
        .dispatch({ type: 'user/checkLoginuserSuccess', payload })
        .dispatch({
          type: 'user/doLogout',
        }) // 1,2
        .provide([[call(axiosGetLogout), undefined]]) // 3
        .put({
          type: 'favoriteMovie/initializeFavoriteMovie',
          payload: undefined,
        })
        .put({ type: 'user/doLogoutSuccess', payload: undefined }) // 4
        .hasFinalState({
          loading: false,
          error: false,
        })
        .silentRun();
    });
    it('fail', () => {
      return expectSaga(getLogoutSaga)
        .withReducer(UserSlice)
        .dispatch({ type: 'user/checkLoginuserSuccess', payload })
        .dispatch({
          type: 'user/doLogout',
        }) // 1,2
        .provide([[call(axiosGetLogout), throwError(new Error('Whoops'))]]) // 3
        .put({
          type: 'user/doLogoutFailure',
          payload: undefined,
        }) // 4
        .hasFinalState({
          content: {
            id: 1,
            userid: 'test',
            nick: 'testnick',
          },
          loading: false,
          error: true,
        })
        .silentRun();
    });
  });
});
