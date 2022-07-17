import MovieRankSlice, {
  getMovieRank,
  getMovieRankSuccess,
  getMovieRankFailure,
  setRankType,
} from './Reducer';
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { axiosGetMovieRank } from '../../lib/api';
import { throwError } from 'redux-saga-test-plan/providers';
import { getMovieRankSaga } from './Saga';

describe('액션 생성 함수 검증', () => {
  it('getMovieRank 액션 생성', () => {
    const expectedAction = {
      type: 'movieRank/getMovieRank',
    };
    expect(getMovieRank()).toEqual(expectedAction);
  });

  it('getMovieRankSuccess 액션 생성', () => {
    const movieData = {
      id: 123456,
      title: 'test',
      overview: 'testOverview',
      voteAverage: 9.0,
      posterPath: 'testPath',
    };

    const payload = {
      topRated: [movieData],
      popular: [movieData],
    };
    const expectedAction = {
      type: 'movieRank/getMovieRankSuccess',
      payload,
    };
    expect(getMovieRankSuccess(payload)).toEqual(expectedAction);
  });

  it('getMovieRankFailure 액션 생성', () => {
    const expectedAction = {
      type: 'movieRank/getMovieRankFailure',
    };
    expect(getMovieRankFailure()).toEqual(expectedAction);
  });

  it('setRankType 액션 생성', () => {
    const payload = 'popular';
    const expectedAction = {
      type: 'movieRank/setRankType',
      payload,
    };
    expect(setRankType(payload)).toEqual(expectedAction);
  });
});

describe('초기상태, 리듀서 검증', () => {
  const initialState = {
    content: { type: 'popular' },
    loading: true,
    error: false,
  };
  it('initial state 검증', () => {
    expect(MovieRankSlice(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });
  it('nowShowingInfo 페이지 변화', () => {
    initialState.loading = false;
    const actual = MovieRankSlice(initialState, setRankType('topRated'));
    expect(actual.content.type).toEqual('topRated');
    expect(actual.loading).toEqual(false);
    expect(actual.error).toEqual(false);
  });
});

describe('사가 함수, 사가 함수 관련 리듀서 검증', () => {
  describe('getMovieRankSaga', () => {
    const movieInfo = {
      id: 123456,
      title: 'test',
      overview: 'testOverview',
      voteAverage: 9.0,
      posterPath: 'testPath',
    };

    const data = {
      topRated: [movieInfo],
      popular: [movieInfo],
    };
    it('success', () => {
      return expectSaga(getMovieRankSaga)
        .withReducer(MovieRankSlice)
        .dispatch({
          type: 'movieRank/getMovieRank',
        }) // 1,2
        .provide([[call(axiosGetMovieRank), { data }]]) // 3
        .put({ type: 'movieRank/getMovieRankSuccess', payload: data }) // 4
        .hasFinalState({
          content: { type: 'popular', movieInfo: data },
          loading: false,
          error: false,
        })
        .silentRun();
    });
    it('fail', () => {
      return expectSaga(getMovieRankSaga)
        .withReducer(MovieRankSlice)
        .dispatch({
          type: 'movieRank/getMovieRank',
        }) // 1,2
        .provide([[call(axiosGetMovieRank), throwError(new Error('Whoops'))]]) // 3
        .put({
          type: 'movieRank/getMovieRankFailure',
          payload: undefined,
        }) // 4
        .hasFinalState({
          content: { type: 'popular' },
          loading: false,
          error: true,
        })
        .silentRun();
    });
  });
});
