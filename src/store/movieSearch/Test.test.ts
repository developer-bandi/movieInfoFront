import MovieSearchSlice, {
  searchMovie,
  searchMovieSuccess,
  searchMovieFailure,
  initializeMovieSearch,
} from './Reducer';
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { axiosGetMovieRank, axiosGetMovieSearch } from '../../lib/api';
import { throwError } from 'redux-saga-test-plan/providers';
import { getMovieSearchSaga } from './Saga';

describe('액션 생성 함수 검증', () => {
  it('searchMovie 액션 생성', () => {
    const payload = { keyword: 'test', page: 1 };
    const expectedAction = {
      type: 'movieSearch/searchMovie',
      payload,
    };
    expect(searchMovie(payload)).toEqual(expectedAction);
  });

  it('searchMovieSuccess 액션 생성', () => {
    const SearchMovieInfo = {
      title: 'test',
      id: 123456,
      posterPath: 'testPath',
      rate: 9.0,
      release: '2022-01-01',
    };

    const payload = {
      page: 1,
      totalPage: 1,
      results: [SearchMovieInfo],
    };
    const expectedAction = {
      type: 'movieSearch/searchMovieSuccess',
      payload,
    };
    expect(searchMovieSuccess(payload)).toEqual(expectedAction);
  });

  it('searchMovieFailure 액션 생성', () => {
    const expectedAction = {
      type: 'movieSearch/searchMovieFailure',
    };
    expect(searchMovieFailure()).toEqual(expectedAction);
  });

  it('initializeMovieSearch 액션 생성', () => {
    const expectedAction = {
      type: 'movieSearch/initializeMovieSearch',
    };
    expect(initializeMovieSearch()).toEqual(expectedAction);
  });
});

describe('초기 상태, 리듀서 검증', () => {
  const initialState = {
    content: { keyword: '' },
    loading: false,
    error: false,
  };
  it('initial state 검증', () => {
    expect(MovieSearchSlice(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });
  it('initializeMovieSearch 검증', () => {
    initialState.loading = false;
    const actual = MovieSearchSlice(initialState, initializeMovieSearch());
    expect(actual.content.keyword).toEqual('');
    expect(actual.loading).toEqual(false);
    expect(actual.error).toEqual(false);
  });
});

describe('사가 함수, 사가 함수 관련 리듀서 검증', () => {
  describe('getMovieSearchSaga', () => {
    const SearchMovieInfo = {
      title: 'test',
      id: 123456,
      posterPath: 'testPath',
      rate: 9.0,
      release: '2022-01-01',
    };
    const payload = { keyword: 'test', page: 1 };
    const data = {
      page: 1,
      totalPage: 1,
      results: [SearchMovieInfo],
    };
    it('success', () => {
      return expectSaga(getMovieSearchSaga)
        .withReducer(MovieSearchSlice)
        .dispatch({
          type: 'movieSearch/searchMovie',
          payload,
        }) // 1,2
        .provide([[call(axiosGetMovieSearch, payload), { data }]]) // 3
        .put({ type: 'movieSearch/searchMovieSuccess', payload: data }) // 4
        .hasFinalState({
          content: { keyword: 'test', searchResult: data },
          loading: false,
          error: false,
        })
        .silentRun();
    });
    it('fail', () => {
      return expectSaga(getMovieSearchSaga)
        .withReducer(MovieSearchSlice)
        .dispatch({
          type: 'movieSearch/searchMovie',
          payload,
        }) // 1,2
        .provide([
          [call(axiosGetMovieSearch, payload), throwError(new Error('Whoops'))],
        ]) // 3
        .put({
          type: 'movieSearch/searchMovieFailure',
          payload: undefined,
        }) // 4
        .hasFinalState({
          content: { keyword: 'test' },
          loading: false,
          error: true,
        })
        .silentRun();
    });
  });
});
