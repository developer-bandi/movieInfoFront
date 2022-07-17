import MovieCommentSlice, {
  getMovieComment,
  getMovieCommentSuccess,
  getMovieCommentFailure,
  addMovieComment,
  addMovieCommentSuccess,
  addMovieCommentFailure,
  deleteMovieComment,
  deleteMovieCommentSuccess,
  deleteMovieCommentFailure,
  initializeMovieComment,
} from './Reducer';
import { expectSaga } from 'redux-saga-test-plan';
import {
  axiosDeleteMovieComment,
  axiosGetMovieComment,
  axiosPostMovieComment,
} from '../../lib/api';
import { throwError } from 'redux-saga-test-plan/providers';
import {
  deleteMovieCommentSaga,
  getMovieCommentSaga,
  postMovieCommentSaga,
} from './Saga';
import { call } from 'redux-saga/effects';

describe('액션 생성 함수 검증', () => {
  it('getMovieComment 액션 생성', () => {
    const payloadData = { movieId: '123456' };
    const expectedAction = {
      type: 'movieComment/getMovieComment',
      payload: payloadData,
    };

    expect(getMovieComment(payloadData)).toEqual(expectedAction);
  });

  it('getMovieCommentSuccess 액션 생성', () => {
    const payloadData = [
      {
        id: 1,
        content: 'test',
        createdAt: new Date(),
        User: {
          id: 1,
          nick: 'test',
        },
      },
    ];
    const expectedAction = {
      type: 'movieComment/getMovieCommentSuccess',
      payload: payloadData,
    };

    expect(getMovieCommentSuccess(payloadData)).toEqual(expectedAction);
  });

  it('getMovieCommentFailure 액션 생성', () => {
    const expectedAction = {
      type: 'movieComment/getMovieCommentFailure',
    };

    expect(getMovieCommentFailure()).toEqual(expectedAction);
  });

  it('addMovieComment 액션 생성', () => {
    const payloadData = { movieId: '123456', content: 'test' };
    const expectedAction = {
      type: 'movieComment/addMovieComment',
      payload: payloadData,
    };

    expect(addMovieComment(payloadData)).toEqual(expectedAction);
  });

  it('addMovieCommentSuccess 액션 생성', () => {
    const payloadData = {
      id: 1,
      content: 'test',
      createdAt: new Date(),
      User: {
        id: 1,
        nick: 'test',
      },
    };
    const expectedAction = {
      type: 'movieComment/addMovieCommentSuccess',
      payload: payloadData,
    };

    expect(addMovieCommentSuccess(payloadData)).toEqual(expectedAction);
  });

  it('addMovieCommentFailure 액션 생성', () => {
    const expectedAction = {
      type: 'movieComment/addMovieCommentFailure',
    };
    expect(addMovieCommentFailure()).toEqual(expectedAction);
  });

  it('deleteMovieComment 액션 생성', () => {
    const payloadData = { id: 1, index: 1 };
    const expectedAction = {
      type: 'movieComment/deleteMovieComment',
      payload: payloadData,
    };

    expect(deleteMovieComment(payloadData)).toEqual(expectedAction);
  });

  it('deleteMovieCommentSuccess 액션 생성', () => {
    const payloadData = 1;
    const expectedAction = {
      type: 'movieComment/deleteMovieCommentSuccess',
      payload: payloadData,
    };

    expect(deleteMovieCommentSuccess(payloadData)).toEqual(expectedAction);
  });

  it('deleteMovieCommentFailure 액션 생성', () => {
    const expectedAction = {
      type: 'movieComment/deleteMovieCommentFailure',
    };

    expect(deleteMovieCommentFailure()).toEqual(expectedAction);
  });

  it('initializeMovieComment 액션 생성', () => {
    const expectedAction = {
      type: 'movieComment/initializeMovieComment',
    };

    expect(initializeMovieComment()).toEqual(expectedAction);
  });
});

describe('초기상태, 리듀서 검증', () => {
  const initialState = {
    loading: true,
    error: false,
  };
  it('initial state 검증', () => {
    expect(MovieCommentSlice(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('initializeFavoriteMovie 액션', () => {
    const actual = MovieCommentSlice(initialState, initializeMovieComment());
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
        content: 'test',
        createdAt: '2022-01-02',
        User: {
          id: 1,
          nick: 'test',
        },
      },
    ];
    window.alert = jest.fn();
    it('success', () => {
      return expectSaga(getMovieCommentSaga)
        .withReducer(MovieCommentSlice)
        .dispatch({
          type: 'movieComment/getMovieComment',
          payload: { movieId: '123456' },
        }) // 1,2
        .provide([[call(axiosGetMovieComment, '123456'), { data: mockData }]]) // 3
        .put({
          type: 'movieComment/getMovieCommentSuccess',
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
      return expectSaga(getMovieCommentSaga)
        .withReducer(MovieCommentSlice)
        .dispatch({
          type: 'movieComment/getMovieComment',
          payload: { movieId: '123456' },
        }) // 1,2
        .provide([
          [
            call(axiosGetMovieComment, '123456'),
            throwError(new Error('Whoops')),
          ],
        ]) // 3
        .put({
          type: 'movieComment/getMovieCommentFailure',
          payload: undefined,
        }) // 4
        .hasFinalState({
          loading: false,
          error: true,
        })
        .silentRun();
    });
  });
  describe('postMovieCommentSaga', () => {
    const mockData = {
      id: 1,
      content: 'test',
      createdAt: '2022-01-02',
      User: {
        id: 1,
        nick: 'test',
      },
    };
    window.alert = jest.fn();
    it('success', () => {
      return expectSaga(postMovieCommentSaga)
        .withReducer(MovieCommentSlice)
        .dispatch({
          type: 'movieComment/getMovieCommentSuccess',
          payload: [mockData],
        }) // 1,2
        .dispatch({
          type: 'movieComment/addMovieComment',
          payload: { movieId: '123456', content: 'test' },
        })
        .provide([
          [
            call(axiosPostMovieComment, { movieId: '123456', content: 'test' }),
            { data: mockData },
          ],
        ]) // 3

        .put({
          type: 'movieComment/addMovieCommentSuccess',
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
      return expectSaga(postMovieCommentSaga)
        .withReducer(MovieCommentSlice)
        .dispatch({
          type: 'movieComment/addMovieComment',
          payload: { movieId: '123456', content: 'test' },
        }) // 1,2
        .provide([
          [
            call(axiosPostMovieComment, { movieId: '123456', content: 'test' }),
            throwError(new Error('Whoops')),
          ],
        ]) // 3
        .put({
          type: 'movieComment/addMovieCommentFailure',
          payload: undefined,
        }) // 4
        .hasFinalState({
          loading: false,
          error: true,
        })
        .silentRun();
    });
  });
  describe('deleteMovieCommentSaga', () => {
    const mockData = {
      id: 1,
      content: 'test',
      createdAt: '2022-01-02',
      User: {
        id: 1,
        nick: 'test',
      },
    };
    window.alert = jest.fn();
    it('success', () => {
      return expectSaga(deleteMovieCommentSaga)
        .withReducer(MovieCommentSlice)
        .dispatch({
          type: 'movieComment/getMovieCommentSuccess',
          payload: [mockData],
        }) // 1,2
        .dispatch({
          type: 'movieComment/deleteMovieComment',
          payload: { id: 1, index: 0 },
        }) // 1,2
        .provide([[call(axiosDeleteMovieComment, 1), undefined]]) // 3
        .put({
          type: 'movieComment/deleteMovieCommentSuccess',
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
      return expectSaga(deleteMovieCommentSaga)
        .withReducer(MovieCommentSlice)
        .dispatch({
          type: 'movieComment/deleteMovieComment',
          payload: { id: 1, index: 1 },
        }) // 1,2
        .provide([
          [call(axiosDeleteMovieComment, 1), throwError(new Error('Whoops'))],
        ]) // 3
        .put({
          type: 'movieComment/deleteMovieCommentFailure',
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
