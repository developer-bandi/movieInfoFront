import { call, put, takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import {
  addMovieCommentapi,
  deleteMovieCommentapi,
  getMovieCommentapi,
} from '../lib/api';

const GET_MOVIECOMMENT = 'moviecomment/GET_MOVIECOMMENT ' as const;
const GET_MOVIECOMMENT_SUCCESS =
  'moviedetail/GET_MOVIECOMMENT_SUCCESS' as const;
const GET_MOVIECOMMENT_FAILURE =
  'moviedetail/GET_MOVIECOMMENT_FAILURE' as const;
const ADD_MOVIECOMMENT = 'moviecomment/ADD_MOVIECOMMENT  ' as const;
const ADD_MOVIECOMMENT_SUCCESS =
  'moviecomment/ADD_MOVIECOMMENT_SUCCESS' as const;
const ADD_MOVIECOMMENT_FAILURE =
  'moviecomment/ADD_MOVIECOMMENT_FAILURE' as const;
const DELETE_MOVIECOMMENT = 'moviecomment/DELETE_MOVIECOMMENT  ' as const;
const DELETE_MOVIECOMMENT_SUCCESS =
  'moviecomment/DELETE_MOVIECOMMENT_SUCCESS' as const;
const DELETE_MOVIECOMMENT_FAILURE =
  'moviecomment/DELETE_MOVIECOMMENT_FAILURE' as const;
const INITIALIZE_MOVIECOMMENT = 'moviedetail/INITIALIZE_MOVIECOMMENT ' as const;

export const getMovieComment = (MovieId: string) => ({
  type: GET_MOVIECOMMENT,
  payload: {
    MovieId,
  },
});

export const getMovieCommentSuccess = (commentData: any) => ({
  type: GET_MOVIECOMMENT_SUCCESS,
  payload: commentData.data,
});

export const getMovieCommentFailure = (e: any) => ({
  type: GET_MOVIECOMMENT_FAILURE,
  payload: e,
  error: true,
});

export const addMovieComment = (MovieId: string, content: string) => ({
  type: ADD_MOVIECOMMENT,
  payload: {
    MovieId,
    content,
  },
});

export const addMovieCommentSuccess = (
  id: string,
  userid: string,
  nick: string,
  content: string,
  createdAt: Date
) => ({
  type: ADD_MOVIECOMMENT_SUCCESS,
  payload: {
    id,
    userid,
    nick,
    content,
    createdAt,
  },
});

export const addMovieCommentFailure = (e: any) => ({
  type: ADD_MOVIECOMMENT_FAILURE,
  payload: e,
  error: true,
});

export const deleteMovieComment = (id: string, index: number) => ({
  type: DELETE_MOVIECOMMENT,
  payload: {
    id,
    index,
  },
});

export const deleteMovieCommentSuccess = (index: number) => ({
  type: DELETE_MOVIECOMMENT_SUCCESS,
  payload: {
    index,
  },
});

export const deleteMovieCommentFailure = (e: any) => ({
  type: DELETE_MOVIECOMMENT_FAILURE,
  payload: e,
  error: true,
});

export const initializeMovieComment = () => ({
  type: INITIALIZE_MOVIECOMMENT,
});

function* getServerMovieComment(action: {
  type: string;
  payload: { MovieId: string };
}): any {
  try {
    const commentData = yield call(getMovieCommentapi, action.payload.MovieId);
    yield put(getMovieCommentSuccess(commentData));
  } catch (e) {
    yield put(getMovieCommentFailure(e));
    throw e;
  }
}

export function* getMovieCommentSaga() {
  yield takeLatest(GET_MOVIECOMMENT, getServerMovieComment);
}

function* addServerMovieComment(action: {
  type: string;
  payload: { MovieId: string; content: string };
}): any {
  try {
    const commentData = yield call(
      addMovieCommentapi,
      action.payload.MovieId,
      action.payload.content
    );
    yield put(
      addMovieCommentSuccess(
        commentData.data.id,
        commentData.data.userid,
        commentData.data.nick,
        action.payload.content,
        commentData.data.createdAt
      )
    );
  } catch (e) {
    yield put(addMovieCommentFailure(e));
    throw e;
  }
}

export function* addMovieCommentSaga() {
  yield takeLatest(ADD_MOVIECOMMENT, addServerMovieComment);
}

function* deleteServerMovieComment(action: {
  type: string;
  payload: { id: string; index: number };
}): any {
  try {
    yield call(deleteMovieCommentapi, action.payload.id);
    yield put(deleteMovieCommentSuccess(action.payload.index));
  } catch (e) {
    yield put(deleteMovieCommentFailure(e));
    throw e;
  }
}

export function* deleteMovieCommentSaga() {
  yield takeLatest(DELETE_MOVIECOMMENT, deleteServerMovieComment);
}

type Action =
  | ReturnType<typeof getMovieCommentSuccess>
  | ReturnType<typeof getMovieCommentFailure>
  | ReturnType<typeof addMovieCommentSuccess>
  | ReturnType<typeof addMovieCommentFailure>
  | ReturnType<typeof deleteMovieCommentSuccess>
  | ReturnType<typeof deleteMovieCommentFailure>
  | ReturnType<typeof initializeMovieComment>;

interface State {
  id?: string;
  userid?: string;
  nick?: string;
  content?: string;
  createdAt?: Date;
}

const initialState: State[] = [];

const movieCommentReducer = (state: State[] = initialState, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_MOVIECOMMENT_SUCCESS:
        for (let i = 0; i < action.payload.length; i++) {
          draft[i] = {};
          draft[i].id = action.payload[i].id;
          draft[i].userid = action.payload[i].UserId;
          draft[i].nick = action.payload[i].User.nick;
          draft[i].content = action.payload[i].content;
          draft[i].createdAt = action.payload[i].createdAt;
        }
        break;

      case GET_MOVIECOMMENT_FAILURE:
        draft = action.payload;
        break;

      case ADD_MOVIECOMMENT_SUCCESS:
        draft.push({
          id: action.payload.id,
          userid: action.payload.userid,
          nick: action.payload.nick,
          content: action.payload.content,
          createdAt: action.payload.createdAt,
        });
        break;

      case ADD_MOVIECOMMENT_FAILURE:
        draft = action.payload;
        break;

      case DELETE_MOVIECOMMENT_SUCCESS:
        draft.splice(action.payload.index, 1);
        break;

      case DELETE_MOVIECOMMENT_FAILURE:
        draft = action.payload;
        break;

      case INITIALIZE_MOVIECOMMENT:
        break;

      default:
        return state;
    }
  });

export default movieCommentReducer;
