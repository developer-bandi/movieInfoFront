import { renderHook, WrapperComponent } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import useFavoriteHook from './Hook';
import configureMockStore from 'redux-mock-store';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoriteMovie from './Presentational';
import { useInView } from 'react-intersection-observer';
/// <reference types="@types/jest" />;

describe('FavoriteMovie Presentational', () => {
  const dragEnd = jest.fn();
  const dragOver = jest.fn();
  const dragStart = jest.fn();
  const dropLeave = jest.fn();
  const dropPoster = jest.fn();
  const TestHook = () => {
    const [viewRef] = useInView();
    return { viewRef };
  };

  it('로그인 필요', () => {
    const { result } = renderHook(() => TestHook());

    const utils = render(
      <FavoriteMovie
        likeMovies={{
          loading: false,
          error: false,
        }}
        dragEnd={dragEnd}
        dragOver={dragOver}
        dragStart={dragStart}
        dropLeave={dropLeave}
        dropPoster={dropPoster}
        deleteBox={false}
        boxOver={'false'}
        end={0}
        viewRef={result.current.viewRef}
      />,
      { wrapper: MemoryRouter }
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByText('로그인을 진행해주세요');
  });

  it('저장된 영화 없음', () => {
    const { result } = renderHook(() => TestHook());
    const utils = render(
      <FavoriteMovie
        likeMovies={{
          content: [],
          loading: false,
          error: false,
        }}
        dragEnd={dragEnd}
        dragOver={dragOver}
        dragStart={dragStart}
        dropLeave={dropLeave}
        dropPoster={dropPoster}
        deleteBox={false}
        boxOver={'false'}
        end={0}
        viewRef={result.current.viewRef}
      />,
      { wrapper: MemoryRouter }
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByText('저장된 영화가 없습니다');
  });

  it('에러 발생', () => {
    const { result } = renderHook(() => TestHook());
    const utils = render(
      <FavoriteMovie
        likeMovies={{
          content: [],
          loading: false,
          error: true,
        }}
        dragEnd={dragEnd}
        dragOver={dragOver}
        dragStart={dragStart}
        dropLeave={dropLeave}
        dropPoster={dropPoster}
        deleteBox={false}
        boxOver={'false'}
        end={0}
        viewRef={result.current.viewRef}
      />,
      { wrapper: MemoryRouter }
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByText('오류가 발생하였습니다');
  });

  it('좋아하는 영화 리스트 정상 렌더링', () => {
    const { result } = renderHook(() => TestHook());
    const utils = render(
      <FavoriteMovie
        likeMovies={{
          content: new Array(10).fill({
            id: 1,
            movieId: 123456,
            movieName: 'test',
            posterPath: 'testPath',
          }),
          loading: false,
          error: false,
        }}
        dragEnd={dragEnd}
        dragOver={dragOver}
        dragStart={dragStart}
        dropLeave={dropLeave}
        dropPoster={dropPoster}
        deleteBox={false}
        boxOver={'false'}
        end={0}
        viewRef={result.current.viewRef}
      />,
      { wrapper: MemoryRouter }
    );
    expect(utils.container).toMatchSnapshot();
  });
});

describe('FavoriteMovie Hook', () => {
  const mockStore = configureMockStore();
  const MakemockInitial = (length: number) => {
    return mockStore({
      favoriteMovie: {
        content: new Array(length).fill({
          id: 1,
          movieId: 123456,
          movieName: 'test',
          posterPath: 'testPath',
        }),
        loading: false,
        error: false,
      },
    });
  };
  const wrapper: WrapperComponent<{ length: number }> = ({
    children,
    length,
  }) => <Provider store={MakemockInitial(length)}>{children}</Provider>;

  it('초기값이 10 보다 작은경우 포스트 개수 수정', async () => {
    const { result } = renderHook(() => useFavoriteHook(), {
      wrapper,
      initialProps: {
        length: 1,
      },
    });
    expect(result.current.end).toEqual(1);
  });
  it('스크롤시  다음 포스트  10개 추가', async () => {
    const { result } = renderHook(() => useFavoriteHook(), {
      wrapper,
      initialProps: {
        length: 25,
      },
    });
    const TestComponent = () => {
      return (
        <div ref={result.current.viewRef} id="wrapper">
          test
        </div>
      );
    };
    render(<TestComponent />);
    mockAllIsIntersecting(true);
    expect(result.current.end).toEqual(20);
  });
  it('스크롤시 최대 페이지로 다음 포스트 추가', async () => {
    const { result } = renderHook(() => useFavoriteHook(), {
      wrapper,
      initialProps: {
        length: 15,
      },
    });
    const TestComponent = () => {
      return (
        <div ref={result.current.viewRef} id="wrapper">
          test
        </div>
      );
    };
    render(<TestComponent />);
    mockAllIsIntersecting(true);
    expect(result.current.end).toEqual(15);
  });
});
