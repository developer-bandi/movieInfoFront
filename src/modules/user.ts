import { call, put, takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import { getUserLoggedIn, userLogout } from '../lib/api';

const DO_LOCALLOGIN = 'user/DO_LOGIN' as const;
const CHECK_LOGINUSER = 'user/CHECK_LOGINUSER' as const;
const CHECK_LOGINUSER_SUCCESS = 'user/CHECK_LOGINUSER_SUCCESS' as const;
const CHECK_LOGINUSER_FAILURE = 'user/CHECK_LOGINUSER_FAILURE' as const;
const DO_LOGOUT = 'user/DO_LOGOUT' as const;
const DO_LOGOUT_SUCCESS = 'user/DO_LOGOUT_SUCCESS' as const;
const DO_LOGOUT_FAILURE = 'user/DO_LOGOUT_FAILURE' as const;

export const doLocalLogin = (id: string, userid: string, nick: string) => ({
  type: DO_LOCALLOGIN,
  payload: {
    id,
    userid,
    nick,
  },
});

export const checkLoginuser = () => ({
  type: CHECK_LOGINUSER,
});

const checkLoginuserSuccess = (userid: string, id: string, nick: string) => ({
  type: CHECK_LOGINUSER_SUCCESS,
  payload: {
    id,
    userid,
    nick,
  },
});

const checkLoginuserFailure = (e: any) => ({
  type: CHECK_LOGINUSER_FAILURE,
  payload: e,
  error: true,
});

export const doLogout = () => ({
  type: DO_LOGOUT,
});

const doLogoutSuccess = () => ({
  type: DO_LOGOUT_SUCCESS,
});

const doLogoutFailure = (e: any) => ({
  type: DO_LOGOUT_FAILURE,
  payload: e,
  error: true,
});

function* checkLogined(): any {
  try {
    const loginedUser = yield call(getUserLoggedIn);
    yield put(
      checkLoginuserSuccess(
        loginedUser.data.userid,
        loginedUser.data.id,
        loginedUser.data.nick
      )
    );
  } catch (e) {
    yield put(checkLoginuserFailure(e));
    throw e;
  }
}

export function* checkLoginUserSaga() {
  yield takeLatest(CHECK_LOGINUSER, checkLogined);
}

function* doServerLogout(): any {
  try {
    yield call(userLogout);
    yield put(doLogoutSuccess());
  } catch (e) {
    yield put(doLogoutFailure(e));
    throw e;
  }
}

export function* doLogoutSaga() {
  yield takeLatest(DO_LOGOUT, doServerLogout);
}

type Action =
  | ReturnType<typeof doLocalLogin>
  | ReturnType<typeof checkLoginuserSuccess>
  | ReturnType<typeof checkLoginuserFailure>
  | ReturnType<typeof doLogoutSuccess>
  | ReturnType<typeof doLogoutFailure>;

interface State {
  login: boolean;
  id?: string;
  userid?: string;
  nick?: string;
}
const initialState = {
  login: false,
};

const userReducer = (state: State = initialState, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DO_LOCALLOGIN:
        draft.login = true;
        draft.id = action.payload.id;
        draft.userid = action.payload.userid;
        draft.nick = action.payload.nick;
        break;

      case CHECK_LOGINUSER_SUCCESS:
        if (action.payload.id !== undefined) {
          draft.login = true;
          draft.id = action.payload.id;
          draft.userid = action.payload.userid;
          draft.nick = action.payload.nick;
        }
        break;

      case CHECK_LOGINUSER_FAILURE:
        draft = action.payload;
        break;

      case DO_LOGOUT_SUCCESS:
        delete draft.id;
        delete draft.userid;
        delete draft.nick;
        draft.login = true;
        break;

      case DO_LOGOUT_FAILURE:
        draft = action.payload;
        break;
    }
  });

export default userReducer;
