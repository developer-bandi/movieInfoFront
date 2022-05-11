import { call, put, takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import { getnowshowing } from '../lib/api';

const GET_HOMEPOSTER = 'homeposter/GET_HOMEPOSTER' as const;
const GET_HOMEPOSTER_SUCCESS = 'homeposter/GET_HOMEPOSTER_SUCCESS' as const;
const GET_HOMEPOSTER_FAILURE = 'homeposter/GET_HOMEPOSTER_FAILURE' as const;

export const getHomePoster = () => ({
  type: GET_HOMEPOSTER,
});

export const getHomePosterSuccess = (homeData: any) => ({
  type: GET_HOMEPOSTER_SUCCESS,
  payload: {
    nowshowingdata: homeData.data[0],
    nowcommingdata: homeData.data[1],
    key: homeData.data[2],
  },
});

export const getHomePosterFailure = (e: any) => ({
  type: GET_HOMEPOSTER_FAILURE,
  payload: e,
  error: true,
});

function* getHomePosterSaga(action: {
  type: 'nowshowing/GET_NOWSHOWING';
}): any {
  try {
    const nowshowingdata = yield call(getnowshowing);
    yield put(getHomePosterSuccess(nowshowingdata));
  } catch (e) {
    yield put(getHomePosterFailure(e));
    throw e;
  }
}

export function* homePosterSaga() {
  yield takeLatest(GET_HOMEPOSTER, getHomePosterSaga);
}

const initalobj = {
  id: 'default',
  title: 'default',
  overview: 'default',
  voteAverage: -1,
  posterPath: 'default',
};

const initialState = {
  nowShowingInfo: new Array<Result>(5).fill(initalobj),
  nowCommingInfo: new Array<Result>(5).fill(initalobj),
  key: 'default',
};

type Action =
  | ReturnType<typeof getHomePoster>
  | ReturnType<typeof getHomePosterSuccess>
  | ReturnType<typeof getHomePosterFailure>;

interface Result {
  id: string;
  title: string;
  overview: string;
  voteAverage: number;
  posterPath: string;
}
const homePosterInfo = (
  state: {
    nowShowingInfo: Result[];
    nowCommingInfo: Result[];
    key: string;
    error?: any;
  } = initialState,
  action: Action
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_HOMEPOSTER_SUCCESS:
        for (let i = 0; i < action.payload.nowshowingdata.length; i++) {
          const dataobj = action.payload.nowshowingdata[i];
          draft.nowShowingInfo[i] = {
            id: dataobj['id'],
            title: dataobj['title'],
            overview: dataobj['overview'],
            voteAverage: dataobj['vote_average'],
            posterPath: dataobj['poster_path'],
          };
        }
        for (let i = 0; i < action.payload.nowcommingdata.length; i++) {
          const dataobj = action.payload.nowcommingdata[i];
          draft.nowCommingInfo[i] = {
            id: dataobj['id'],
            title: dataobj['title'],
            overview: dataobj['overview'],
            voteAverage: dataobj['vote_average'],
            posterPath: dataobj['poster_path'],
          };
        }
        draft.key = action.payload.key;
        break;
      case GET_HOMEPOSTER_FAILURE:
        draft.error = action.payload;
        break;
    }
  });

export default homePosterInfo;
