import HomePosterSlice, {
  getHomePoster,
  getHomePosterSuccess,
  getHomePosterFailure,
  movePage,
} from './Reducer';
import { expectSaga } from 'redux-saga-test-plan';
import { getHomePosterSaga } from './Saga';
import { call } from 'redux-saga/effects';
import { axiosGetHomePoster } from '../../lib/api';
import { throwError } from 'redux-saga-test-plan/providers';

const data = {
  nowShowingInfo: new Array(20).fill({
    id: 1,
    title: '제목',
    overview: '짧은 소개',
    voteAverage: 10.0,
    posterPath: '주소',
  }),
  nowCommingInfo: new Array(20).fill({
    id: 1,
    title: '제목',
    overview: '짧은 소개',
    voteAverage: 10.0,
    posterPath: '주소',
  }),
  key: 'key',
};

describe('액션 생성 함수 검증', () => {
  it('getHomePoster 액션 생성', () => {
    const expectedAction = {
      type: 'homePoster/getHomePoster',
    };

    expect(getHomePoster()).toEqual(expectedAction);
  });

  it('getHomePosterSuccess 액션 생성', () => {
    const expectedAction = {
      type: 'homePoster/getHomePosterSuccess',
      payload: data,
    };

    expect(getHomePosterSuccess(data)).toEqual(expectedAction);
  });

  it('getHomePosterFailure 액션 생성', () => {
    const expectedAction = {
      type: 'homePoster/getHomePosterFailure',
    };

    expect(getHomePosterFailure()).toEqual(expectedAction);
  });

  it('movePage 액션 생성', () => {
    const data = { kind: 'nowShowingInfo', page: 1 };
    const expectedAction = {
      type: 'homePoster/movePage',
      payload: data,
    };

    expect(movePage(data)).toEqual(expectedAction);
  });
});

describe('초기 상태, 리듀서 검증', () => {
  const initialState = {
    content: {
      page: {
        nowShowingInfo: 1,
        nowCommingInfo: 1,
      },
    },
    loading: true,
    error: false,
  };
  it('initial state 검증', () => {
    expect(HomePosterSlice(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });
  it('nowShowingInfo 페이지 변화', () => {
    const actual = HomePosterSlice(
      initialState,
      movePage({ kind: 'nowShowingInfo', page: 1 })
    );
    expect(actual.content.page.nowShowingInfo).toEqual(1);
  });
  it('nowCommingInfo 페이지 변화', () => {
    const actual = HomePosterSlice(
      initialState,
      movePage({ kind: 'nowCommingInfo', page: 1 })
    );
    expect(actual.content.page.nowCommingInfo).toEqual(1);
  });
});

describe('사가함수, 사가 함수 관련 리듀서 검증', () => {
  it('success', () => {
    return expectSaga(getHomePosterSaga)
      .withReducer(HomePosterSlice)
      .dispatch({ type: 'homePoster/getHomePoster' }) // 1,2
      .provide([[call(axiosGetHomePoster), { data }]]) // 3
      .put({ type: 'homePoster/getHomePosterSuccess', payload: data }) // 4
      .hasFinalState({
        content: {
          page: {
            nowShowingInfo: 1,
            nowCommingInfo: 1,
          },
          posterList: data,
        },
        loading: false,
        error: false,
      })
      .silentRun();
  });
  it('fail', () => {
    return expectSaga(getHomePosterSaga)
      .withReducer(HomePosterSlice)
      .dispatch({ type: 'homePoster/getHomePoster' }) // 1,2
      .provide([[call(axiosGetHomePoster), throwError(new Error('Whoops'))]]) // 3
      .put({ type: 'homePoster/getHomePosterFailure', payload: undefined }) // 4
      .hasFinalState({
        content: {
          page: {
            nowShowingInfo: 1,
            nowCommingInfo: 1,
          },
        },
        loading: false,
        error: true,
      })
      .silentRun();
  });
});
