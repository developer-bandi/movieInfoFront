import { call, put, takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import { getsortedmovie } from '../lib/api';
import { endLoading, startLoading } from './loading';

const GET_SORTEDMOVIE = 'sortedmovie/GET_SORTEDMOVIE' as const;
const GET_SORTEDMOVIE_SUCCESS = 'sortedmovie/GET_SORTEDMOVIE_SUCCESS' as const;
const GET_SORTEDMOVIE_FAILURE = 'sortedmovie/GET_SORTEDMOVIE_FAILURE' as const;

export const getSortedMovie = () => ({
  type: GET_SORTEDMOVIE,
});

const getSortedMovieSuccess = (sortedMovie: any) => ({
  type: GET_SORTEDMOVIE_SUCCESS,
  payload: {
    data: sortedMovie.data,
  },
});
const getSortedMovieFailure = (e: any) => ({
  type: GET_SORTEDMOVIE_FAILURE,
  payload: e,
  error: true,
});

function* getSortedMovieSaga(): any {
  try {
    yield put(startLoading());
    const sortedMovie = yield call(getsortedmovie);
    yield put(getSortedMovieSuccess(sortedMovie));
    yield put(endLoading());
  } catch (e) {
    yield put(getSortedMovieFailure(e));
    throw e;
  }
}

export function* SortedMovieSaga() {
  yield takeLatest(GET_SORTEDMOVIE, getSortedMovieSaga);
}
type Action =
  | ReturnType<typeof getSortedMovie>
  | ReturnType<typeof getSortedMovieSuccess>
  | ReturnType<typeof getSortedMovieFailure>;
interface ObjState {
  id: string;
  title: string;
  overview: string;
  voteAverage: number;
  posterPath: string;
}
const initialState = {
  popular: [
    {
      id: 'default',
      title: 'default',
      overview: 'default',
      voteAverage: -1,
      posterPath: 'default',
    },
  ],
  topRated: [
    {
      id: 'default',
      title: 'default',
      overview: 'default',
      voteAverage: -1,
      posterPath: 'default',
    },
  ],
};

const sortedMovieInfo = (
  state: {
    popular: ObjState[];
    topRated: ObjState[];
    error?: any;
  } = initialState,
  action: Action
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_SORTEDMOVIE_SUCCESS:
        for (let j = 0; j < action.payload.data.length; j++) {
          const type = j === 0 ? 'popular' : 'topRated';
          for (let i = 0; i < action.payload.data[j]['results'].length; i++) {
            draft[type][i] = {
              id: action.payload.data[j]['results'][i]['id'],
              title: action.payload.data[j]['results'][i]['title'],
              overview: action.payload.data[j]['results'][i]['overview'],
              voteAverage: action.payload.data[j]['results'][i]['vote_average'],
              posterPath: action.payload.data[j]['results'][i]['poster_path'],
            };
          }
        }
        break;
      case GET_SORTEDMOVIE_FAILURE:
        draft.error = action.payload;
        break;
    }
  });

export default sortedMovieInfo;
