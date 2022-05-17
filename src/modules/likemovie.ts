import produce from 'immer';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  addLikemovieapi,
  deleteLikemovieapi,
  getLikemovieapi,
} from '../lib/api';

const GET_LIKEMOVIE = 'likemovie/GET_LIKE_MOVIE' as const;
const GET_LIKEMOVIE_SUCCESS = 'likemovie/GET_LIKEMOVIE_SUCESS' as const;
const GET_LIKEMOVIE_FAILURE = 'likemovie/GET_LIKEMOIVE_FAILURE' as const;

const ADD_LIKEMOVIE = 'likemovie/ADD_LIKE_MOVIE' as const;
const ADD_LIKEMOVIE_SUCCESS = 'likemovie/ADD_LIKEMOVIE_SUCESS' as const;
const ADD_LIKEMOVIE_FAILURE = 'likemovie/ADD_LIKEMOIVE_FAILURE' as const;

const DELETE_LIKEMOVIE = 'likemovie/DELETE_LIKE_MOVIE' as const;
const DELETE_LIKEMOVIE_SUCCESS = 'likemovie/DELETE_LIKEMOVIE_SUCESS' as const;
const DELETE_LIKEMOVIE_FAILURE = 'likemovie/DELETE_LIKEMOIVE_FAILURE' as const;

const INITIALIZE_LIKEMOVIE = 'likemovie/INITIALIZE_LIKEMOVIE' as const;

export const getLikemovie = (userId: string) => ({
  type: GET_LIKEMOVIE,
  payload: {
    userId,
  },
});

export const getLikemovieSuccess = (
  likemovie: {
    id: string;
    movieId: string;
    movieName: string;
    posterPath: string;
    userId: string;
  }[]
) => ({
  type: GET_LIKEMOVIE_SUCCESS,
  payload: likemovie,
});

const getLikemovieFailure = (e: any) => ({
  type: GET_LIKEMOVIE_FAILURE,
  payload: e,
});

function* getServerLikemovie(action: {
  type: string;
  payload: { userId: string };
}): any {
  try {
    const likemoives = yield call(getLikemovieapi, action.payload.userId);
    yield put(getLikemovieSuccess(likemoives.data));
  } catch (e) {
    yield put(getLikemovieFailure(e));
    throw e;
  }
}

export function* getLikemovieSaga() {
  yield takeLatest(GET_LIKEMOVIE, getServerLikemovie);
}

export const addLikemovie = (
  movieId: string,
  movieName: string,
  posterPath: string,
  userId: string
) => ({
  type: ADD_LIKEMOVIE,
  payload: {
    movieId,
    movieName,
    posterPath,
    userId,
  },
});

const addLikemovieSuccess = (
  id: string,
  movieId: string,
  movieName: string,
  posterPath: string,
  userId: string
) => ({
  type: ADD_LIKEMOVIE_SUCCESS,
  payload: {
    id,
    movieId,
    movieName,
    posterPath,
    userId,
  },
});

const addLikemovieFailure = (e: any) => ({
  type: ADD_LIKEMOVIE_FAILURE,
  payload: e,
});

function* addServerLikemovie(action: {
  type: string;
  payload: {
    movieId: string;
    movieName: string;
    posterPath: string;
    userId: string;
  };
}): any {
  try {
    const likemoives = yield call(
      addLikemovieapi,
      action.payload.movieId,
      action.payload.movieName,
      action.payload.posterPath,
      action.payload.userId
    );
    yield put(
      addLikemovieSuccess(
        likemoives.data.id.id,
        action.payload.movieId,
        action.payload.movieName,
        action.payload.posterPath,
        action.payload.userId
      )
    );
  } catch (e) {
    yield put(addLikemovieFailure(e));
    throw e;
  }
}

export function* addLikemovieSaga() {
  yield takeLatest(ADD_LIKEMOVIE, addServerLikemovie);
}

export const deleteLikemovie = (id: string, index: number) => ({
  type: DELETE_LIKEMOVIE,
  payload: {
    id,
    index,
  },
});

const deleteLikemovieSuccess = (index: number) => ({
  type: DELETE_LIKEMOVIE_SUCCESS,
  payload: {
    index,
  },
});

const deleteLikemovieFailure = (e: any) => ({
  type: DELETE_LIKEMOVIE_FAILURE,
  payload: e,
});

function* deleteServerLikemovie(action: {
  type: string;
  payload: {
    id: string;
    index: number;
  };
}): any {
  try {
    yield call(deleteLikemovieapi, action.payload.id);
    yield put(deleteLikemovieSuccess(action.payload.index));
  } catch (e) {
    yield put(addLikemovieFailure(e));
    throw e;
  }
}

export function* deleteLikemovieSaga() {
  yield takeLatest(DELETE_LIKEMOVIE, deleteServerLikemovie);
}

export const initializeLikemovie = () => ({
  type: INITIALIZE_LIKEMOVIE,
});

type Action =
  | ReturnType<typeof getLikemovieSuccess>
  | ReturnType<typeof getLikemovieFailure>
  | ReturnType<typeof addLikemovieSuccess>
  | ReturnType<typeof addLikemovieFailure>
  | ReturnType<typeof deleteLikemovieSuccess>
  | ReturnType<typeof deleteLikemovieFailure>
  | ReturnType<typeof initializeLikemovie>;

interface State {
  id?: string;
  movieId?: string;
  movieName?: string;
  posterPath?: string;
  userId?: string;
}

const initialState: State[] = [];

const movieLikeReducer = (state: State[] = initialState, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_LIKEMOVIE_SUCCESS:
        for (let i = 0; i < action.payload.length; i++) {
          draft[i] = {};
          draft[i].id = action.payload[i].id;
          draft[i].movieId = action.payload[i].movieId;
          draft[i].movieName = action.payload[i].movieName;
          draft[i].posterPath = action.payload[i].posterPath;
          draft[i].userId = action.payload[i].userId;
        }
        break;

      case GET_LIKEMOVIE_FAILURE:
        draft = action.payload;
        break;

      case ADD_LIKEMOVIE_SUCCESS:
        draft.push({
          id: action.payload.id,
          movieId: action.payload.movieId,
          movieName: action.payload.movieName,
          posterPath: action.payload.posterPath,
          userId: action.payload.userId,
        });
        break;

      case ADD_LIKEMOVIE_FAILURE:
        draft = action.payload;
        break;

      case DELETE_LIKEMOVIE_SUCCESS:
        draft.splice(action.payload.index, 1);
        break;

      case DELETE_LIKEMOVIE_FAILURE:
        draft = action.payload;
        break;

      case INITIALIZE_LIKEMOVIE:
        draft = [];
        break;

      default:
        return state;
    }
  });

export default movieLikeReducer;
