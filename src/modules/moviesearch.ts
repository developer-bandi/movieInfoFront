import { call, put, takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import { getMovieSearchResult } from '../lib/api';

const GET_MOVIESEARCHRESULT = 'moviesearch/GET_MOVIESEARCHRESULT' as const;
const GET_MOVIESEARCHRESULT_SUCCESS =
  'moviesearch/GET_MOVIESEARCHRESULT_SUCCESS' as const;
const GET_MOVIESEARCHRESULT_FAILURE =
  'moviesearch/GET_MOVIESEARCHRESULT_FAILURE' as const;
const INITIALIZE_MOVIESEARCHRESULT =
  'moviesearch/INITIALIZE_MOVIESEARCHRESULT' as const;

export const getMovieSearchResultData = ({
  name,
  page,
}: {
  name: string;
  page: number;
}) => ({
  type: GET_MOVIESEARCHRESULT,
  payload: {
    name,
    page,
  },
});

export const getMovieSearchResultDataSuccess = (apiData: any, action: any) => ({
  type: GET_MOVIESEARCHRESULT_SUCCESS,
  payload: {
    data: apiData.data,
    name: action.payload.name,
  },
});

export const getMovieSearchResultDataFailure = (e: any) => ({
  type: GET_MOVIESEARCHRESULT_FAILURE,
  payload: e,
  error: true,
});

export const initializeMovieSearchResult = () => ({
  type: INITIALIZE_MOVIESEARCHRESULT,
});

function* getMovieSearchResultSaga(action: {
  type: string;
  payload: { name: string; page: number };
}): any {
  try {
    const apiData = yield call(getMovieSearchResult, action.payload);

    yield put(getMovieSearchResultDataSuccess(apiData, action));
  } catch (e) {
    yield put(getMovieSearchResultDataFailure(e));
    throw e;
  }
}

export function* MovieSearchResultSaga() {
  yield takeLatest(GET_MOVIESEARCHRESULT, getMovieSearchResultSaga);
}

type SearchAction =
  | ReturnType<typeof getMovieSearchResultData>
  | ReturnType<typeof getMovieSearchResultDataSuccess>
  | ReturnType<typeof getMovieSearchResultDataFailure>
  | ReturnType<typeof initializeMovieSearchResult>;
interface Info {
  name: string;
  totalpage: number;
}

interface Result {
  title: string;
  id: string;
  posterPath: string;
  rate: number;
  release: string;
}

const initialState = {
  info: {
    name: 'default',
    totalpage: 0,
  },
  result: [
    [
      {
        title: 'default',
        id: 'default',
        posterPath: 'default',
        rate: -1,
        release: 'default',
      },
    ],
  ],
};

const movieSearchInfo = (
  state: { info: Info; result: Result[][] } = initialState,
  action: SearchAction
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_MOVIESEARCHRESULT_SUCCESS:
        if (action.payload.data.results.length === 0) {
          draft.info.name = 'noResult';
        } else {
          draft.info = {
            name: action.payload.name,
            totalpage: action.payload.data.total_pages,
          };
          const tempArr: Result[] = [];
          for (let i = 0; i < action.payload.data.results.length; i++) {
            tempArr.push({
              title: action.payload.data.results[i]['title'],
              id: action.payload.data.results[i]['id'],
              posterPath: action.payload.data.results[i]['poster_path'],
              rate: action.payload.data.results[i]['vote_average'],
              release: action.payload.data.results[i]['release_date'],
            });
          }
          draft.result[action.payload.data.page - 1] = tempArr;
        }

        break;
      case GET_MOVIESEARCHRESULT_FAILURE:
        break;

      case INITIALIZE_MOVIESEARCHRESULT:
        draft.info = initialState.info;
        draft.result = initialState.result;

        break;

      default:
        return state;
    }
  });
/*
handleActions(
  {
    [GET_MOVIESEARCHRESULT_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft[0] = {};
        draft[0].name = action.payload.name;
        draft[0].totalpage = action.payload.data.total_pages;
        draft[action.payload.data.page] = [];
        for (let i = 0; i < action.payload.data.results.length; i++) {
          draft[action.payload.data.page][i] = {};
          draft[action.payload.data.page][i]["title"] =
            action.payload.data.results[i]["title"];
          draft[action.payload.data.page][i]["id"] =
            action.payload.data.results[i]["id"];
          draft[action.payload.data.page][i]["posterPath"] =
            action.payload.data.results[i]["poster_path"];
          draft[action.payload.data.page][i]["rate"] =
            action.payload.data.results[i]["vote_average"];
          draft[action.payload.data.page][i]["release"] =
            action.payload.data.results[i]["release_date"];
        }
      }),
    [GET_MOVIESEARCHRESULT_FAILURE]: (state) => ({
      ...state,
    }),
    [INITIALIZE_MOVIESEARCHRESULT]: () => [],
  },
  initialState
);
*/
export default movieSearchInfo;
