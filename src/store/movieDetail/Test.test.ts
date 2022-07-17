import MovieDetailSlice, {
  getMovieDetail,
  getMovieDetailSuccess,
  getMovieDetailFailure,
  initializeMovieDetail,
} from './Reducer';
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { axiosGetMovieDetail } from '../../lib/api';
import { throwError } from 'redux-saga-test-plan/providers';
import { getMovieDetailSaga } from './Saga';

describe('액션 생성 함수 검증', () => {
  it('getMovieDetail 액션 생성', () => {
    const payloadData = { movieId: '123456' };
    const expectedAction = {
      type: 'movieDetail/getMovieDetail',
      payload: payloadData,
    };
    expect(getMovieDetail(payloadData)).toEqual(expectedAction);
  });

  it('getMovieDetailSuccess 액션 생성', () => {
    const payloadData = {
      title: 'test',
      releaseDate: 1,
      genres: ['test1', 'test2'],
      nation: 'testNation',
      runtime: 130,
      rate: 6.0,
      posterPath: 'testPath',
      overview: 'testOverview',
      tagline: 'testTagline',
    };
    const expectedAction = {
      type: 'movieDetail/getMovieDetailSuccess',
      payload: payloadData,
    };
    expect(getMovieDetailSuccess(payloadData)).toEqual(expectedAction);
  });

  it('getMovieDetailFailure 액션 생성', () => {
    const expectedAction = {
      type: 'movieDetail/getMovieDetailFailure',
    };
    expect(getMovieDetailFailure()).toEqual(expectedAction);
  });

  it('initializeMovieDetail 액션 생성', () => {
    const expectedAction = {
      type: 'movieDetail/initializeMovieDetail',
    };
    expect(initializeMovieDetail()).toEqual(expectedAction);
  });
});

describe('초기 상태, 리듀서 검증', () => {
  const initialState = {
    loading: true,
    error: false,
  };
  it('initial state 검증', () => {
    expect(MovieDetailSlice(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });
  it('nowShowingInfo 페이지 변화', () => {
    const actual = MovieDetailSlice(initialState, initializeMovieDetail());
    expect(actual.content).toEqual(undefined);
    expect(actual.loading).toEqual(true);
    expect(actual.error).toEqual(false);
  });
});

describe('사가 함수, 사가 함수 관련 리듀서 검증', () => {
  describe('getMovieDetailSaga', () => {
    const payloadData = { movieId: '123456' };
    const data = {
      title: 'test',
      releaseDate: 1,
      genres: ['test1', 'test2'],
      nation: 'testNation',
      runtime: 130,
      rate: 6.0,
      posterPath: 'testPath',
      overview: 'testOverview',
      tagline: 'testTagline',
    };
    it('success', () => {
      return expectSaga(getMovieDetailSaga)
        .withReducer(MovieDetailSlice)
        .dispatch({
          type: 'movieDetail/getMovieDetail',
          payload: payloadData,
        }) // 1,2
        .provide([[call(axiosGetMovieDetail, payloadData.movieId), { data }]]) // 3
        .put({ type: 'movieDetail/getMovieDetailSuccess', payload: data }) // 4
        .hasFinalState({
          content: data,
          loading: false,
          error: false,
        })
        .silentRun();
    });
    it('fail', () => {
      return expectSaga(getMovieDetailSaga)
        .withReducer(MovieDetailSlice)
        .dispatch({
          type: 'movieDetail/getMovieDetail',
          payload: payloadData,
        }) // 1,2
        .provide([
          [
            call(axiosGetMovieDetail, payloadData.movieId),
            throwError(new Error('Whoops')),
          ],
        ]) // 3
        .put({
          type: 'movieDetail/getMovieDetailFailure',
          payload: undefined,
        }) // 4
        .hasFinalState({
          loading: false,
          error: true,
        })
        .silentRun();
    });
  });
});
