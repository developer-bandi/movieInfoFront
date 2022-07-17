import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import useSearchResult from './Hook';
import SearchResult from './Presentational';
const state = {
  content: {
    searchResult: {
      page: 1,
      totalPage: 15,
      results: [
        {
          title: 'test',
          id: 123456,
          posterPath: 'testPath',
          rate: 9.0,
          release: 'testDate',
        },
      ],
    },
    keyword: 'test',
  },
  loading: false,
  error: false,
};
describe('SearchResult Presentational', () => {
  it('로딩중', () => {
    const utils = render(
      <SearchResult
        searchResult={{
          content: { keyword: '' },
          loading: true,
          error: false,
        }}
        setPrevPageList={jest.fn()}
        setNextPageList={jest.fn()}
        activepageNumber={1}
        selectPage={jest.fn()}
        pageListNumber={1}
      />
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByTestId('loading');
  });
  it('에러 발생', () => {
    const utils = render(
      <SearchResult
        searchResult={{
          content: { keyword: '' },
          loading: false,
          error: true,
        }}
        setPrevPageList={jest.fn()}
        setNextPageList={jest.fn()}
        activepageNumber={1}
        selectPage={jest.fn()}
        pageListNumber={1}
      />
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByTestId('except');
  });
  it('검색 이전', () => {
    const utils = render(
      <SearchResult
        searchResult={{
          content: {
            searchResult: {
              page: 1,
              totalPage: 1,
              results: [],
            },
            keyword: '',
          },
          loading: false,
          error: true,
        }}
        setPrevPageList={jest.fn()}
        setNextPageList={jest.fn()}
        activepageNumber={1}
        selectPage={jest.fn()}
        pageListNumber={1}
      />
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByTestId('blank');
  });
  it('결과 없음', () => {
    const utils = render(
      <SearchResult
        searchResult={{
          content: {
            searchResult: {
              page: 1,
              totalPage: 1,
              results: [],
            },
            keyword: '',
          },
          loading: false,
          error: true,
        }}
        setPrevPageList={jest.fn()}
        setNextPageList={jest.fn()}
        activepageNumber={1}
        selectPage={jest.fn()}
        pageListNumber={1}
      />
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByTestId('except');
  });
  describe('정상 출력', () => {
    it('검색 리스트 출력 검증', () => {
      const utils = render(
        <SearchResult
          searchResult={state}
          setPrevPageList={jest.fn()}
          setNextPageList={jest.fn()}
          activepageNumber={1}
          selectPage={jest.fn()}
          pageListNumber={1}
        />,
        { wrapper: MemoryRouter }
      );
      expect(utils.container).toMatchSnapshot();
    });
    describe('페이지 버튼 출력 검증', () => {
      it('첫 페이지 리스트', () => {
        const utils = render(
          <SearchResult
            searchResult={state}
            setPrevPageList={jest.fn()}
            setNextPageList={jest.fn()}
            activepageNumber={1}
            selectPage={jest.fn()}
            pageListNumber={1}
          />,
          { wrapper: MemoryRouter }
        );
        expect(utils.container).toMatchSnapshot();
        screen.getByTestId('next');
      });
      it('중간 리스트', () => {
        const utils = render(
          <SearchResult
            searchResult={state}
            setPrevPageList={jest.fn()}
            setNextPageList={jest.fn()}
            activepageNumber={1}
            selectPage={jest.fn()}
            pageListNumber={2}
          />,
          { wrapper: MemoryRouter }
        );
        expect(utils.container).toMatchSnapshot();
        screen.getByTestId('prev');
        screen.getByTestId('next');
      });
      it('마지막 리스트', () => {
        const utils = render(
          <SearchResult
            searchResult={state}
            setPrevPageList={jest.fn()}
            setNextPageList={jest.fn()}
            activepageNumber={1}
            selectPage={jest.fn()}
            pageListNumber={3}
          />,
          { wrapper: MemoryRouter }
        );
        expect(utils.container).toMatchSnapshot();
        screen.getByTestId('prev');
      });
    });
  });
});

describe('SearchResult Hook', () => {
  window.scrollTo = jest.fn();
  const mockStore = configureMockStore();
  const store = mockStore({ movieSearch: state });
  const wrapper = ({ children }: { children: React.FC }) => (
    <Provider store={store}>{children}</Provider>
  );
  it('setNextPageList,setPrevPageList 함수 작동 여부', () => {
    const { result } = renderHook(() => useSearchResult(), {
      wrapper,
    });
    act(() => {
      result.current.setNextPageList();
    });
    expect(store.getActions()[0]).toStrictEqual({
      type: 'movieSearch/searchMovie',
      payload: { keyword: 'test', page: 6 },
    });
    expect(result.current.pageListNumber).toBe(2);
    expect(result.current.activepageNumber).toBe(6);
    act(() => {
      result.current.setPrevPageList();
    });
    expect(store.getActions()[1]).toStrictEqual({
      type: 'movieSearch/searchMovie',
      payload: { keyword: 'test', page: 1 },
    });
    expect(result.current.pageListNumber).toBe(1);
    expect(result.current.activepageNumber).toBe(1);
  });
  it('selectPage 함수 작동 여부', () => {
    const { result } = renderHook(() => useSearchResult(), {
      wrapper,
    });
    act(() => {
      result.current.selectPage(2);
    });
    expect(store.getActions()[3]).toStrictEqual({
      type: 'movieSearch/searchMovie',
      payload: { keyword: 'test', page: 2 },
    });
    expect(result.current.activepageNumber).toBe(2);
  });
});
