import { all, call, put, takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import {
  getLikemovieapi,
  getMovieCommentapi,
  getmoviedetail,
} from '../lib/api';
import { getMovieCommentSuccess } from './moviecomment';
import { getLikemovieSuccess } from './likemovie';
import { endLoading, startLoading } from './loading';

const GET_MOVIEDETAIL = 'moviedetail/GET_MOVIEDETAIL' as const;
const GET_MOVIEDETAIL_SUCCESS = 'moviedetail/GET_MOVIEDETAIL_SUCCESS' as const;
const GET_MOVIEDETAIL_FAILURE = 'moviedetail/GET_MOVIEDETAIL_FAILURE' as const;
const INITIALIZE_MOVIEDETAIL = 'moviedetail/INITIALIZE_MOVIEDETAIL' as const;

export const getMovieDetail = (id: string, userid: string | null) => ({
  type: GET_MOVIEDETAIL,
  payload: {
    id,
    userid,
  },
});

export const getMovieDetailSuccess = (movieDetail: any) => ({
  type: GET_MOVIEDETAIL_SUCCESS,
  payload: {
    data: movieDetail.data,
  },
});

export const getMovieDetailFailure = (e: any) => ({
  type: GET_MOVIEDETAIL_FAILURE,
  payload: e,
  error: true,
});

export const initializeMovieDetail = () => ({
  type: INITIALIZE_MOVIEDETAIL,
});

function* getMovieDetailSaga(action: {
  type: string;
  payload: { id: string; userid: string };
}): any {
  try {
    yield put(startLoading());
    if (action.payload.userid === null) {
      const movieDetail = yield all([
        call(getmoviedetail, action.payload.id),
        call(getMovieCommentapi, action.payload.id),
      ]);
      yield put(getMovieDetailSuccess(movieDetail[0]));
      yield put(getMovieCommentSuccess(movieDetail[1]));
    } else {
      const movieDetail = yield all([
        call(getmoviedetail, action.payload.id),
        call(getMovieCommentapi, action.payload.id),
        call(getLikemovieapi, action.payload.userid),
      ]);
      yield put(getMovieDetailSuccess(movieDetail[0]));
      yield put(getMovieCommentSuccess(movieDetail[1]));
      yield put(getLikemovieSuccess(movieDetail[2]));
    }
    yield put(endLoading());
  } catch (e) {
    yield put(getMovieDetailFailure(e));
    yield put(endLoading());
    throw e;
  }
}

export function* MovieDetailSaga() {
  yield takeLatest(GET_MOVIEDETAIL, getMovieDetailSaga);
}
type Action =
  | ReturnType<typeof getMovieDetail>
  | ReturnType<typeof getMovieDetailSuccess>
  | ReturnType<typeof getMovieDetailFailure>
  | ReturnType<typeof initializeMovieDetail>;
interface State {
  title: string;
  releaseDate: number;
  genres: string[];
  nation: string;
  runtime: number;
  rate: number;
  posterPath: string;
  overview: string;
  tagline: string;
}

const initialState = {
  title: 'default',
  releaseDate: 0,
  genres: ['default'],
  nation: 'default',
  runtime: 0,
  rate: -1,
  posterPath: 'default',
  overview: 'default',
  tagline: 'default',
};

const movieDetailInfo = (state: State = initialState, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_MOVIEDETAIL_SUCCESS:
        const dataobj = action.payload.data;
        const tempArr = [];
        for (let i = 0; i < dataobj.genres.length; i++) {
          tempArr[i] = dataobj.genres[i]['name'];
        }

        draft.genres = tempArr;
        draft.title = dataobj['title'];
        draft.releaseDate = dataobj['release_date'];
        draft.nation =
          dataobj['production_countries'][0] === undefined
            ? '정보없음'
            : dataobj['production_countries'][0]['name'];
        draft.runtime = dataobj['runtime'];
        draft.rate = dataobj['vote_average'];
        draft.posterPath = dataobj['poster_path'];
        draft.overview = dataobj['overview'];
        draft.tagline = dataobj['tagline'];

        break;
      case GET_MOVIEDETAIL_FAILURE:
        break;

      case INITIALIZE_MOVIEDETAIL:
        draft.title = 'default';
        draft.releaseDate = 0;
        draft.genres = ['default'];
        draft.nation = 'default';
        draft.runtime = 0;
        draft.rate = -1;
        draft.posterPath = 'default';
        draft.overview = 'default';
        draft.tagline = 'default';
        break;

      default:
        return state;
    }
  });

export default movieDetailInfo;
