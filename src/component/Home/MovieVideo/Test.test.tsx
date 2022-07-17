import { render, screen } from '@testing-library/react';
import MovieVideo from './Presentational';

describe('<MovieVideo/> Presentational', () => {
  const PosterInfo = {
    id: 1,
    title: 'test',
    overview: 'testOverview',
    voteAverage: 9.0,
    posterPath: 'testPath',
  };

  it('로딩중', () => {
    const utils = render(
      <MovieVideo
        moviekey={{
          content: {
            page: {
              nowShowingInfo: 1,
              nowCommingInfo: 1,
            },
          },
          loading: true,
          error: false,
        }}
      />
    );
    expect(utils.container).toMatchSnapshot();
  });

  it('에러발생', () => {
    const utils = render(
      <MovieVideo
        moviekey={{
          content: {
            page: {
              nowShowingInfo: 1,
              nowCommingInfo: 1,
            },
          },
          loading: false,
          error: true,
        }}
      />
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByText('에러가 발생하였습니다');
  });

  it('정상 작동', () => {
    const utils = render(
      <MovieVideo
        moviekey={{
          content: {
            posterList: {
              nowShowingInfo: [PosterInfo],
              nowCommingInfo: [PosterInfo],
              key: '12345',
            },
            page: {
              nowShowingInfo: 1,
              nowCommingInfo: 1,
            },
          },
          loading: false,
          error: false,
        }}
      />
    );
    expect(utils.container).toMatchSnapshot();
  });
});
