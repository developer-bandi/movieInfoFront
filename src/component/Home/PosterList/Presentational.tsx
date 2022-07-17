import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import nullmovie from '../../../imgs/nullmovie.webp';
import styles from './Style';
import { HomePosterState } from '../../../store/homePoster/Reducer';
import React from 'react';

interface PosterListProps {
  title: string;
  postersData: HomePosterState;
  changePage: (position: string) => void;
  page: number;
}
const PosterListPresentational = ({
  title,
  postersData,
  changePage,
  page,
}: PosterListProps) => {
  if (postersData.loading) {
    return (
      <styles.MainBlock>
        <styles.TitleBlock>
          <styles.Title>{title}</styles.Title>
        </styles.TitleBlock>
        <styles.PosterListBlock>
          <styles.NullButton />
          {new Array(5).fill(0).map((zero, index) => {
            return (
              <styles.NullPosterBlock key={index}></styles.NullPosterBlock>
            );
          })}
          <styles.NullButton />
        </styles.PosterListBlock>
      </styles.MainBlock>
    );
  } else if (postersData.error) {
    return (
      <styles.MainBlock>
        <styles.TitleBlock>
          <styles.Title>{title}</styles.Title>
        </styles.TitleBlock>
        <styles.PosterListBlock>
          <styles.Error>에러 발생</styles.Error>
        </styles.PosterListBlock>
      </styles.MainBlock>
    );
  } else {
    return (
      <styles.MainBlock>
        <styles.TitleBlock>
          <styles.Title>{title}</styles.Title>
        </styles.TitleBlock>
        <styles.PosterListBlock>
          {page === 1 ? (
            <styles.NullButton />
          ) : (
            <styles.PageButton
              onClick={() => changePage('prev')}
              key={`prev${title}`}
            >
              <FiChevronLeft size={40} />
            </styles.PageButton>
          )}
          {postersData.content.posterList !== undefined &&
            postersData.content.posterList[
              title === '현재상영중' ? 'nowShowingInfo' : 'nowCommingInfo'
            ]
              .slice((page - 1) * 5, 5 * page)
              .map((posterData, index) => {
                return (
                  <React.Fragment key={posterData.id}>
                    <styles.PosterBlock to={`/moviedetail/${posterData.id}`}>
                      {posterData.posterPath === null ? (
                        <styles.MovieImg src={nullmovie} alt="notPoster" />
                      ) : (
                        <styles.MovieImg
                          src={`https://image.tmdb.org/t/p/w500${posterData.posterPath}`}
                          alt="poster"
                        ></styles.MovieImg>
                      )}
                      <styles.MovieInfo className="movieinfo">
                        {posterData.overview.length > 170
                          ? posterData.overview.substring(0, 170) + '...'
                          : posterData.overview}
                      </styles.MovieInfo>
                      <styles.MovieRating className="rating">
                        평점 {posterData.voteAverage}
                      </styles.MovieRating>
                      <styles.MoiveName className="moviename">
                        {posterData.title.length > 12
                          ? posterData.title.substring(0, 12) + '...'
                          : posterData.title}
                      </styles.MoiveName>
                    </styles.PosterBlock>
                  </React.Fragment>
                );
              })}
          {
            postersData.content.posterList === undefined ||
            page * 5 >=
              postersData.content.posterList[
                title === '현재상영중' ? 'nowShowingInfo' : 'nowCommingInfo'
              ].length ? (
              <styles.NullButton />
            ) : (
              <styles.PageButton
                onClick={() => changePage('next')}
                key={`next${title}`}
              >
                <FiChevronRight size={40} />
              </styles.PageButton>
            ) /*이후로 넘길수 없으면 빈박스만 렌더링하고 버튼을 누르면 start와 end값에 5를 추가 */
          }
        </styles.PosterListBlock>
      </styles.MainBlock>
    );
  }
};

//이미지를 미리 로드해 두는 함수이다.

export default PosterListPresentational;
