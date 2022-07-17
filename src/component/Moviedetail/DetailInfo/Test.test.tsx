import { renderHook, WrapperComponent } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import useDetailInfo from './Hook';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen } from '@testing-library/react';
import MovieContent from './Presentational';

describe('MovieDetail Presentational', () => {
  const loginUser = {
    content: { id: 1, userid: 'testId', nick: 'testnick' },
    loading: false,
    error: false,
  };
  const logoutUser = { loading: false, error: false };
  const movieDetailData = {
    content: {
      title: 'test',
      releaseDate: 1,
      genres: ['test'],
      nation: 'test',
      runtime: 1,
      rate: 0,
      posterPath: 'testPath',
      overview: 'testOverview',
      tagline: 'testTagline',
    },
    loading: false,
    error: false,
  };
  it('유저가 로그인했을 경우', () => {
    const favoriteSettingMock = jest.fn();
    const utils = render(
      <MovieContent
        movieDetailData={movieDetailData}
        favoriteSetting={favoriteSettingMock}
        favorite={false}
        user={loginUser}
      />
    );
    expect(utils.container).toMatchSnapshot();
    const FavoriteButton = screen.getByTestId('FavoriteButton');
    fireEvent.click(FavoriteButton);
    expect(favoriteSettingMock).toBeCalledTimes(1);
  });
  it('유저가 로그인 하지 않았을 경우', () => {
    const utils = render(
      <MovieContent
        movieDetailData={movieDetailData}
        favoriteSetting={jest.fn()}
        favorite={false}
        user={logoutUser}
      />
    );
    expect(utils.container).toMatchSnapshot();
  });
});

describe('MovieDetail Hook', () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    user: {
      content: { id: 1, userid: 'testId', nick: 'testnick' },
      loading: false,
      error: false,
    },
    favoriteMovie: {
      content: [
        {
          id: 1,
          movieId: 123454,
          movieName: 'test',
          posterPath: 'testPath',
        },
      ],
      loading: false,
      error: false,
    },
    movieDetail: {
      content: {
        title: 'test',
        releaseDate: 1,
        genres: ['test'],
        nation: 'test',
        runtime: 1,
        rate: 0,
        posterPath: 'testPath',
        overview: 'testOverview',
        tagline: 'testTagline',
      },
      loading: false,
      error: false,
    },
  });
  const wrapper: WrapperComponent<{ id: string }> = ({ children, id }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/moviedetail/${id}`]}>
        <Routes>
          <Route path={'/moviedetail/:movieid'} element={children} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  it('즐겨찾기 활성화', async () => {
    const { result } = renderHook(() => useDetailInfo(), {
      wrapper,
      initialProps: {
        id: '123454',
      },
    });
    expect(result.current.id).toBe(1);
    expect(result.current.index).toBe(0);
    expect(result.current.favorite).toBe(true);
    act(() => {
      result.current.favoriteSetting();
    });
    expect(store.getActions()[0]).toStrictEqual({
      type: 'favoriteMovie/deleteFavoriteMovie',
      payload: { id: 1, index: 0 },
    });
    expect(result.current.id).toBe(undefined);
    expect(result.current.index).toBe(-1);
  });

  it('즐겨찾기 비활성화', async () => {
    const { result } = renderHook(() => useDetailInfo(), {
      wrapper,
      initialProps: {
        id: '123455',
      },
    });
    expect(result.current.id).toBe(undefined);
    expect(result.current.index).toBe(-1);
    expect(result.current.favorite).toBe(false);
    act(() => {
      result.current.favoriteSetting();
    });
    expect(store.getActions()[1]).toStrictEqual({
      type: 'favoriteMovie/addFavoriteMovie',
      payload: {
        movieId: '123455',
        movieName: 'test',
        posterPath: 'testPath',
      },
    });
  });
});
