import { fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import useUploadComment from './Hook';
import MovieComment from './Presentational';
const MovieCommentApiData = {
  id: 1,
  content: 'test',
  createdAt: new Date(),
  User: {
    id: 1,
    nick: 'test',
  },
};
const MovieCommentState = {
  content: [MovieCommentApiData],
  loading: false,
  error: false,
};
describe('MovieComment Presentational', () => {
  it('전체 화면 검증', () => {
    const deleteCommentMock = jest.fn();
    const utils = render(
      <MovieComment
        uploadComment={jest.fn()}
        settingComment={jest.fn()}
        deleteComment={deleteCommentMock}
        commentList={MovieCommentState}
        loginedUserId={1}
      />
    );
    expect(utils.container).toMatchSnapshot();
    const deleteButton = screen.getByTestId('deleteButton');
    fireEvent.click(deleteButton);
    expect(deleteCommentMock).toBeCalledTimes(1);
  });
});

describe('MovieComment Hook', () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    user: {
      content: { id: 1, userid: 'testId', nick: 'testnick' },
      loading: false,
      error: false,
    },
  });
  const wrapper = ({ children }: { children: React.FC }) => (
    <Provider store={store}>{children}</Provider>
  );

  const newmockStore = configureMockStore();
  const notLoginstore = newmockStore({
    user: {
      loading: false,
      error: false,
    },
  });
  const notLoginwrapper = ({ children }: { children: React.FC }) => (
    <Provider store={notLoginstore}>{children}</Provider>
  );

  it('로그인 클릭', async () => {
    const { result } = renderHook(() => useUploadComment('test'), {
      wrapper,
    });
    result.current({ type: 'click', key: undefined });
    expect(store.getActions()[0]).toStrictEqual({
      type: 'movieComment/addMovieComment',
      payload: { movieId: undefined, content: 'test' },
    });
  });
  it('로그인 엔터키', async () => {
    const { result } = renderHook(() => useUploadComment('test'), {
      wrapper,
    });
    result.current({ type: 'keypress', key: 'Enter' });
    expect(store.getActions()[1]).toStrictEqual({
      type: 'movieComment/addMovieComment',
      payload: { movieId: undefined, content: 'test' },
    });
  });
  it('비로그인 클릭', async () => {
    window.alert = jest.fn();
    const { result } = renderHook(() => useUploadComment('test'), {
      wrapper: notLoginwrapper,
    });
    result.current({ type: 'click', key: undefined });
    expect(window.alert).toBeCalledTimes(1);
  });
  it('비로그인 엔터', async () => {
    window.alert = jest.fn();
    const { result } = renderHook(() => useUploadComment('test'), {
      wrapper: notLoginwrapper,
    });
    result.current({ type: 'keypress', key: 'Enter' });
    expect(window.alert).toBeCalledTimes(1);
  });
});
