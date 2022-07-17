import FavoriteMovieSlice, {
  getFavoriteMovie,
  getFavoriteMovieSuccess,
  getFavoriteMovieFailure,
  addFavoriteMovie,
  addFavoriteMovieSuccess,
  addFavoriteMovieFailure,
  deleteFavoriteMovie,
  deleteFavoriteMovieSuccess,
  deleteFavoriteMovieFailure,
  initializeFavoriteMovie,
} from './Reducer';
import { expectSaga } from 'redux-saga-test-plan';
import {
  axiosDeleteFavoriteMovie,
  axiosGetFavoriteMovie,
  axiosPostFavoriteMovie,
} from '../../lib/api';
import { throwError } from 'redux-saga-test-plan/providers';
import {
  deleteFavoriteMovieSaga,
  getFavoriteMovieSaga,
  postFavoriteMovieSaga,
} from './Saga';
import { call } from 'redux-saga/effects';

describe('액션 생성 함수 검증', () => {
  it('getHomePoster 액션 생성', () => {
    const expectedAction = {
      type: 'favoriteMovie/getFavoriteMovie',
    };

    expect(getFavoriteMovie()).toEqual(expectedAction);
  });

  it('getFavoriteMovieSuccess 액션 생성', () => {
    const payloadData = [
      {
        id: 1,
        movieId: '123456',
        movieName: 'test',
        posterPath: 'testPath',
      },
    ];
    const expectedAction = {
      type: 'favoriteMovie/getFavoriteMovieSuccess',
      payload: payloadData,
    };

    expect(getFavoriteMovieSuccess(payloadData)).toEqual(expectedAction);
  });

  it('getFavoriteMovieFailure 액션 생성', () => {
    const expectedAction = {
      type: 'favoriteMovie/getFavoriteMovieFailure',
    };

    expect(getFavoriteMovieFailure()).toEqual(expectedAction);
  });

  it('addFavoriteMovie 액션 생성', () => {
    const payloadData = {
      movieId: '123456',
      movieName: 'testMovie',
      posterPath: 'testPath',
    };

    const expectedAction = {
      type: 'favoriteMovie/addFavoriteMovie',
      payload: payloadData,
    };

    expect(addFavoriteMovie(payloadData)).toEqual(expectedAction);
  });

  it('addFavoriteMovieSuccess 액션 생성', () => {
    const payloadData = {
      id: 1,
      movieId: '123456',
      movieName: 'test',
      posterPath: 'testPath',
    };

    const expectedAction = {
      type: 'favoriteMovie/addFavoriteMovieSuccess',
      payload: payloadData,
    };

    expect(addFavoriteMovieSuccess(payloadData)).toEqual(expectedAction);
  });

  it('addFavoriteMovieFailure 액션 생성', () => {
    const expectedAction = {
      type: 'favoriteMovie/addFavoriteMovieFailure',
    };

    expect(addFavoriteMovieFailure()).toEqual(expectedAction);
  });

  it('deleteFavoriteMovie 액션 생성', () => {
    const payloadData = { id: 1, index: 1 };

    const expectedAction = {
      type: 'favoriteMovie/deleteFavoriteMovie',
      payload: payloadData,
    };

    expect(deleteFavoriteMovie(payloadData)).toEqual(expectedAction);
  });

  it('deleteFavoriteMovieSuccess 액션 생성', () => {
    const payloadData = 1;

    const expectedAction = {
      type: 'favoriteMovie/deleteFavoriteMovieSuccess',
      payload: payloadData,
    };

    expect(deleteFavoriteMovieSuccess(payloadData)).toEqual(expectedAction);
  });

  it('deleteFavoriteMovieFailure 액션 생성', () => {
    const expectedAction = {
      type: 'favoriteMovie/deleteFavoriteMovieFailure',
    };

    expect(deleteFavoriteMovieFailure()).toEqual(expectedAction);
  });

  it('initializeFavoriteMovie 액션 생성', () => {
    const expectedAction = {
      type: 'favoriteMovie/initializeFavoriteMovie',
    };
    expect(initializeFavoriteMovie()).toEqual(expectedAction);
  });
});

describe('초기 상태, 리듀서 검증', () => {
  const initialState = {
    loading: true,
    error: false,
  };
  it('initial state 검증', () => {
    expect(FavoriteMovieSlice(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('initializeFavoriteMovie 액션', () => {
    const actual = FavoriteMovieSlice(initialState, initializeFavoriteMovie());
    expect(actual.content).toEqual(undefined);
    expect(actual.loading).toEqual(true);
    expect(actual.error).toEqual(false);
  });
});

describe('사가 함수, 사가 함수 관련 리듀서 검증', () => {
  describe('getFavoriteMovieSaga', () => {
    const mockData = [
      {
        id: 1,
        movieId: 123456,
        movieName: 'test',
        posterPath: 'testPath',
      },
    ];
    window.alert = jest.fn();
    it('success', () => {
      return expectSaga(getFavoriteMovieSaga)
        .withReducer(FavoriteMovieSlice)
        .dispatch({ type: 'favoriteMovie/getFavoriteMovie' }) // 1,2
        .provide([[call(axiosGetFavoriteMovie), { data: mockData }]]) // 3
        .put({
          type: 'favoriteMovie/getFavoriteMovieSuccess',
          payload: mockData,
        }) // 4
        .hasFinalState({
          content: mockData,
          loading: false,
          error: false,
        })
        .silentRun();
    });
    it('fail', () => {
      return expectSaga(getFavoriteMovieSaga)
        .withReducer(FavoriteMovieSlice)
        .dispatch({ type: 'favoriteMovie/getFavoriteMovie' }) // 1,2
        .provide([
          [call(axiosGetFavoriteMovie), throwError(new Error('Whoops'))],
        ]) // 3
        .put({
          type: 'favoriteMovie/getFavoriteMovieFailure',
          payload: undefined,
        }) // 4
        .hasFinalState({
          loading: false,
          error: true,
        })
        .silentRun();
    });
  });
  describe('postFavoriteMovieSaga', () => {
    const mockData = {
      id: 1,
      movieId: 123456,
      movieName: 'test',
      posterPath: 'testPath',
    };

    const payloadData = {
      movieId: '123456',
      movieName: 'test',
      posterPath: 'testPath',
    };
    window.alert = jest.fn();
    it('success', () => {
      return expectSaga(postFavoriteMovieSaga)
        .withReducer(FavoriteMovieSlice)
        .dispatch({
          type: 'favoriteMovie/getFavoriteMovieSuccess',
          payload: [mockData],
        })
        .dispatch({
          type: 'favoriteMovie/addFavoriteMovie',
          payload: payloadData,
        }) // 1,2
        .provide([
          [call(axiosPostFavoriteMovie, payloadData), { data: mockData }],
        ]) // 3
        .put({
          type: 'favoriteMovie/addFavoriteMovieSuccess',
          payload: mockData,
        }) // 4
        .hasFinalState({
          content: [mockData, mockData],
          loading: false,
          error: false,
        })
        .silentRun();
    });
    it('fail', () => {
      return expectSaga(postFavoriteMovieSaga)
        .withReducer(FavoriteMovieSlice)
        .dispatch({
          type: 'favoriteMovie/getFavoriteMovieSuccess',
          payload: [mockData],
        })
        .dispatch({
          type: 'favoriteMovie/addFavoriteMovie',
          payload: payloadData,
        }) // 1,2
        .provide([
          [
            call(axiosPostFavoriteMovie, payloadData),
            throwError(new Error('Whoops')),
          ],
        ]) // 3
        .put({
          type: 'favoriteMovie/addFavoriteMovieFailure',
          payload: undefined,
        }) // 4
        .hasFinalState({
          content: [mockData],
          loading: false,
          error: true,
        })
        .silentRun();
    });
  });
  describe('deleteFavoriteMovieSaga', () => {
    const mockData = {
      id: 1,
      movieId: 123456,
      movieName: 'test',
      posterPath: 'testPath',
    };
    window.alert = jest.fn();
    it('success', () => {
      return expectSaga(deleteFavoriteMovieSaga)
        .withReducer(FavoriteMovieSlice)
        .dispatch({
          type: 'favoriteMovie/getFavoriteMovieSuccess',
          payload: [mockData],
        })
        .dispatch({
          type: 'favoriteMovie/deleteFavoriteMovie',
          payload: { id: 1, index: 0 },
        }) // 1,2
        .provide([[call(axiosDeleteFavoriteMovie, 1), undefined]]) // 3
        .put({
          type: 'favoriteMovie/deleteFavoriteMovieSuccess',
          payload: 0,
        }) // 4
        .hasFinalState({
          content: [],
          loading: false,
          error: false,
        })
        .silentRun();
    });
    it('fail', () => {
      return expectSaga(deleteFavoriteMovieSaga)
        .withReducer(FavoriteMovieSlice)
        .dispatch({
          type: 'favoriteMovie/getFavoriteMovieSuccess',
          payload: [mockData],
        })
        .dispatch({
          type: 'favoriteMovie/deleteFavoriteMovie',
          payload: { id: 1, index: 0 },
        }) // 1,
        .provide([
          [call(axiosDeleteFavoriteMovie, 1), throwError(new Error('Whoops'))],
        ]) // 3
        .put({
          type: 'favoriteMovie/deleteFavoriteMovieFailure',
          payload: undefined,
        }) // 4
        .hasFinalState({
          content: [mockData],
          loading: false,
          error: true,
        })
        .silentRun();
    });
  });
});
