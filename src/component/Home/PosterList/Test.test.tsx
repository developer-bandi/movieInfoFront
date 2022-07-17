import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PosterList from './Presentational';

describe('PosterList Presentational', () => {
  const PosterInfo = {
    id: 1,
    title: 'test',
    overview: 'testOverview',
    voteAverage: 9.0,
    posterPath: 'testPath',
  };

  it('로딩중', () => {
    const utils = render(
      <PosterList
        title={'현재상영중'}
        postersData={{
          content: {
            page: {
              nowShowingInfo: 1,
              nowCommingInfo: 1,
            },
          },
          loading: true,
          error: false,
        }}
        changePage={jest.fn()}
        page={1}
      />,
      { wrapper: MemoryRouter }
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByText('현재상영중');
  });

  it('에러발생', () => {
    const utils = render(
      <PosterList
        title={'현재상영중'}
        postersData={{
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
          error: true,
        }}
        changePage={jest.fn()}
        page={1}
      />,
      { wrapper: MemoryRouter }
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByText('현재상영중');
    screen.getByText('에러 발생');
  });

  it('정상 작동 첫번째 페이지', () => {
    const utils = render(
      <PosterList
        title={'현재상영중'}
        postersData={{
          content: {
            posterList: {
              nowShowingInfo: new Array(15).fill(0).map((zero, index) => {
                const PosterInfoIdChange = { ...PosterInfo };
                PosterInfoIdChange.id = index + 1;
                return PosterInfoIdChange;
              }),
              nowCommingInfo: new Array(15).fill(0).map((zero, index) => {
                const PosterInfoIdChange = { ...PosterInfo };
                PosterInfoIdChange.id = index + 1;
                return PosterInfoIdChange;
              }),
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
        changePage={jest.fn()}
        page={1}
      />,
      { wrapper: MemoryRouter }
    );
    expect(utils.container).toMatchSnapshot();
  });
  it('정상 작동 중간 페이지', () => {
    const utils = render(
      <PosterList
        title={'현재상영중'}
        postersData={{
          content: {
            posterList: {
              nowShowingInfo: new Array(15).fill(0).map((zero, index) => {
                const PosterInfoIdChange = { ...PosterInfo };
                PosterInfoIdChange.id = index + 1;
                return PosterInfoIdChange;
              }),
              nowCommingInfo: new Array(15).fill(0).map((zero, index) => {
                const PosterInfoIdChange = { ...PosterInfo };
                PosterInfoIdChange.id = index + 1;
                return PosterInfoIdChange;
              }),
              key: '12345',
            },
            page: {
              nowShowingInfo: 2,
              nowCommingInfo: 1,
            },
          },
          loading: false,
          error: false,
        }}
        changePage={jest.fn()}
        page={1}
      />,
      { wrapper: MemoryRouter }
    );
    expect(utils.container).toMatchSnapshot();
  });

  it('정상 작동 마지막 페이지', () => {
    const utils = render(
      <PosterList
        title={'현재상영중'}
        postersData={{
          content: {
            posterList: {
              nowShowingInfo: new Array(15).fill(0).map((zero, index) => {
                const PosterInfoIdChange = { ...PosterInfo };
                PosterInfoIdChange.id = index + 1;
                return PosterInfoIdChange;
              }),
              nowCommingInfo: new Array(15).fill(0).map((zero, index) => {
                const PosterInfoIdChange = { ...PosterInfo };
                PosterInfoIdChange.id = index + 1;
                return PosterInfoIdChange;
              }),
              key: '12345',
            },
            page: {
              nowShowingInfo: 3,
              nowCommingInfo: 1,
            },
          },
          loading: false,
          error: false,
        }}
        changePage={jest.fn()}
        page={1}
      />,
      { wrapper: MemoryRouter }
    );
    expect(utils.container).toMatchSnapshot();
  });
});
