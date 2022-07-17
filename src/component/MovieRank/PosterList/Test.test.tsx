import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import PosterList from './Presentational';
import configureMockStore from 'redux-mock-store';

describe('PosterList Presentational', () => {
  const topRatedMovieInfo = {
    id: 1,
    title: 'topRated',
    overview: 'topRatedMovieInfotestOverview',
    voteAverage: 9.0,
    posterPath: 'topRatedMovieInfotestPoserPath',
  };
  const popularMovieInfo = {
    id: 2,
    title: 'popular',
    overview: 'populartestOverview',
    voteAverage: 8.0,
    posterPath: 'populartestPoserPath',
  };
  const movieRankList = {
    content: {
      type: 'popular',
      movieInfo: {
        topRated: [topRatedMovieInfo],
        popular: [popularMovieInfo],
      },
    },
    loading: false,
    error: false,
  };
  const mockStore = configureMockStore();
  const store = mockStore({
    movieRank: {
      content: { type: 'popular' },
    },
  });
  const wrapper = ({ children }: { children: React.ReactElement }) => (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
  it('로딩중', () => {
    const movieRankList = {
      content: { type: 'popular' },
      loading: true,
      error: false,
    };
    const utils = render(<PosterList movieRankList={movieRankList} />, {
      wrapper,
    });
    expect(utils.container).toMatchSnapshot();
  });
  it('에러 발생', () => {
    const movieRankList = {
      content: { type: 'popular' },
      loading: false,
      error: true,
    };
    const utils = render(<PosterList movieRankList={movieRankList} />, {
      wrapper,
    });
    expect(utils.container).toMatchSnapshot();
    screen.getByText('에러가 발생하였습니다');
  });
  it('popular 출력', () => {
    const utils = render(<PosterList movieRankList={movieRankList} />, {
      wrapper,
    });
    expect(utils.container).toMatchSnapshot();
    screen.getByText('popular');
    screen.getByText('populartestOverview');
  });
  it('topRated 출력', () => {
    movieRankList.content.type = 'topRated';
    const utils = render(<PosterList movieRankList={movieRankList} />, {
      wrapper,
    });
    expect(utils.container).toMatchSnapshot();
    screen.getByText('topRated');
    screen.getByText('topRatedMovieInfotestOverview');
  });
});
