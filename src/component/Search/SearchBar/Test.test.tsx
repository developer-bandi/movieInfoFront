import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import useSearchBar from './Hook';
import configureMockStore from 'redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './Presentational';

describe('SearchBar Presentational', () => {
  it('이벤트 핸들러 동작 체크', () => {
    const searchMoviesMock = jest.fn();
    const deleteCommentMock = jest.fn();
    const settingvalueMock = jest.fn();
    const setFocusMock = jest.fn();
    render(
      <SearchBar
        latest={['test']}
        searchMovies={searchMoviesMock}
        deleteComment={deleteCommentMock}
        settingvalue={settingvalueMock}
        value={'test'}
        focus={true}
        setFocus={setFocusMock}
      />
    );
    fireEvent.click(screen.getByTestId('searchInput'), {
      target: { value: 'test' },
    });
    fireEvent.keyPress(screen.getByTestId('searchInput'), {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });
    fireEvent.change(screen.getByTestId('searchInput'), {
      target: { value: 'new value' },
    });
    fireEvent.click(screen.getByTestId('searchButton'));
    fireEvent.click(screen.getByTestId('data'));
    fireEvent.click(screen.getByTestId('deleteButton'));
    expect(searchMoviesMock).toBeCalledTimes(3);
    expect(deleteCommentMock).toBeCalledTimes(1);
    expect(setFocusMock).toBeCalledTimes(1);
    expect(settingvalueMock).toBeCalledTimes(1);
  });
  it('최근 검색어 비활성화', () => {
    const searchMoviesMock = jest.fn();
    const deleteCommentMock = jest.fn();
    const settingvalueMock = jest.fn();
    const setFocusMock = jest.fn();
    const utils = render(
      <SearchBar
        latest={['test']}
        searchMovies={searchMoviesMock}
        deleteComment={deleteCommentMock}
        settingvalue={settingvalueMock}
        value={'test'}
        focus={false}
        setFocus={setFocusMock}
      />
    );
    expect(utils.container).toMatchSnapshot();
  });
  describe('최근 검색어 활성화', () => {
    it('최근 검색어 없음', () => {
      const searchMoviesMock = jest.fn();
      const deleteCommentMock = jest.fn();
      const settingvalueMock = jest.fn();
      const setFocusMock = jest.fn();
      const utils = render(
        <SearchBar
          latest={[]}
          searchMovies={searchMoviesMock}
          deleteComment={deleteCommentMock}
          settingvalue={settingvalueMock}
          value={'test'}
          focus={true}
          setFocus={setFocusMock}
        />
      );
      expect(utils.container).toMatchSnapshot();
      screen.getByText('최근 검색 내용이 없습니다');
    });
    it('최근 검색어 있음', () => {
      const searchMoviesMock = jest.fn();
      const deleteCommentMock = jest.fn();
      const settingvalueMock = jest.fn();
      const setFocusMock = jest.fn();
      const utils = render(
        <SearchBar
          latest={['test']}
          searchMovies={searchMoviesMock}
          deleteComment={deleteCommentMock}
          settingvalue={settingvalueMock}
          value={'test'}
          focus={true}
          setFocus={setFocusMock}
        />
      );
      expect(utils.container).toMatchSnapshot();
      screen.getByText('test');
    });
  });
});

describe('SearchBar Hook', () => {
  const mockStore = configureMockStore();
  const store = mockStore({});
  const wrapper = ({ children }: { children: React.FC }) => (
    <Provider store={store}>{children}</Provider>
  );

  it('localstorage 데이터 가져오는 useEffect 체크', () => {
    localStorage.setItem('latest', JSON.stringify(['test']));
    const { result } = renderHook(() => useSearchBar(), {
      wrapper,
    });
    expect(result.current.latest).toStrictEqual(['test']);
  });
  describe('searchMoviesg함수 테스트', () => {
    it('검색 버튼 클릭시 검색 기능 작동여부', () => {
      localStorage.setItem('latest', JSON.stringify(['test1', 'test2']));
      const { result } = renderHook(() => useSearchBar(), {
        wrapper,
      });
      act(() => {
        result.current.setvalue('test3');
      });
      act(() => {
        result.current.searchMovies({
          type: 'click',
          target: { innerText: 'test3', tagName: 'BUTTON' },
        });
      });
      expect(store.getActions()[0]).toStrictEqual({
        type: 'movieSearch/searchMovie',
        payload: { keyword: 'test3', page: 1 },
      });
      expect(
        JSON.parse(localStorage.getItem('latest') as string)
      ).toStrictEqual(['test1', 'test2', 'test3']);
    });

    it('엔터 버튼 클릭시 검색기능 작동 여부', () => {
      localStorage.setItem(
        'latest',
        JSON.stringify(['test1', 'test2', 'test3'])
      );
      const { result } = renderHook(() => useSearchBar(), {
        wrapper,
      });
      act(() => {
        result.current.setvalue('test4');
      });
      act(() => {
        result.current.searchMovies({
          key: 'Enter',
          type: 'keypress',
          target: { innerText: 'test4', tagName: 'BUTTON' },
        });
      });
      expect(store.getActions()[1]).toStrictEqual({
        type: 'movieSearch/searchMovie',
        payload: { keyword: 'test4', page: 1 },
      });
      expect(
        JSON.parse(window.localStorage.getItem('latest') as string)
      ).toStrictEqual(['test1', 'test2', 'test3', 'test4']);
    });

    it('최근 검색어 클릭시 검색기능 작동여부', () => {
      window.localStorage.setItem(
        'latest',
        JSON.stringify(['test1', 'test2', 'test3', 'test4'])
      );
      const { result } = renderHook(() => useSearchBar(), {
        wrapper,
      });
      act(() => {
        result.current.searchMovies({
          type: 'click',
          target: { innerText: 'test5', tagName: 'DIV' },
        });
      });
      expect(store.getActions()[2]).toStrictEqual({
        type: 'movieSearch/searchMovie',
        payload: { keyword: 'test5', page: 1 },
      });
      expect(
        JSON.parse(window.localStorage.getItem('latest') as string)
      ).toStrictEqual(['test1', 'test2', 'test3', 'test4', 'test5']);
    });
    it('최근 검색어가 5개일경우 가장 이전 검색어를 지우고 최신 검색 반영을 반영하는지', () => {
      localStorage.setItem(
        'latest',
        JSON.stringify(['test1', 'test2', 'test3', 'test4', 'test5'])
      );
      const { result } = renderHook(() => useSearchBar(), {
        wrapper,
      });
      act(() => {
        result.current.setvalue('new Test');
      });
      act(() => {
        result.current.searchMovies({
          type: 'click',
          target: { innerText: 'new Test', tagName: 'DIV' },
        });
      });
      expect(store.getActions()[3]).toStrictEqual({
        type: 'movieSearch/searchMovie',
        payload: { keyword: 'new Test', page: 1 },
      });
      expect(
        JSON.parse(window.localStorage.getItem('latest') as string)
      ).toStrictEqual(['test2', 'test3', 'test4', 'test5', 'new Test']);
    });
  });
});
