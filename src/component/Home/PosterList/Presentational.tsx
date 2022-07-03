import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import nullmovie from '../../../tempdata/nullmovie.webp';
import { useDispatch } from 'react-redux';
import styles from './Style';
import { HomePosterState, movePage } from '../../../store/homePoster/Reducer';

interface PosterListProps {
  title: string;
  postersData: HomePosterState;
  page: number;
}
const PosterList = ({ title, postersData, page }: PosterListProps) => {
  const [nowPage, setNowPage] = useState(page);
  const dispatch = useDispatch();

  const changePage = (position: string) => {
    setNowPage(position === 'prev' ? nowPage - 1 : nowPage + 1);
    dispatch(
      movePage({
        kind: title === '현재상영중' ? 'nowShowingInfo' : 'nowCommingInfo',
        page: nowPage + 1,
      })
    );
  };

  return (
    <styles.MainBlock>
      <styles.TitleBlock>
        <styles.Title>{title}</styles.Title>
      </styles.TitleBlock>
      <styles.PosterListBlock>
        {page === 0 ? (
          <styles.NullButton />
        ) : (
          <styles.PageButton onClick={() => changePage('prev')}>
            <FiChevronLeft size={40} />
          </styles.PageButton>
        )}
        {
          !postersData.loading && postersData.content.posterList !== undefined
            ? postersData.content.posterList[
                title === '현재상영중' ? 'nowShowingInfo' : 'nowCommingInfo'
              ]
                .slice((page - 1) * 5, 5 * page)
                .map((posterData, index) => {
                  return (
                    <>
                      <styles.PosterBlock
                        to={`/moviedetail/${posterData.id}`}
                        key={index}
                      >
                        <styles.MovieImg
                          src={`https://image.tmdb.org/t/p/w500${posterData.posterPath}`}
                          alt="x"
                        ></styles.MovieImg>
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
                    </>
                  );
                })
            : new Array(5).map((undefinedData, index) => {
                return (
                  <styles.NullPosterBlock key={index}>
                    <styles.MovieImg src={nullmovie} alt="x" />
                  </styles.NullPosterBlock>
                );
              }) /*주어진 start,end범위에 따라 포스터에 마우스를 올리면 요약정보를 보여주는 포스터들 5개를 렌더링 */
        }
        {
          postersData.content.posterList === undefined ||
          page * 5 >=
            postersData.content.posterList[
              title === '현재상영중' ? 'nowShowingInfo' : 'nowCommingInfo'
            ].length ? (
            <styles.NullButton />
          ) : (
            <styles.PageButton onClick={() => changePage('next')}>
              <FiChevronRight size={40} />
            </styles.PageButton>
          ) /*이후로 넘길수 없으면 빈박스만 렌더링하고 버튼을 누르면 start와 end값에 5를 추가 */
        }
      </styles.PosterListBlock>
    </styles.MainBlock>
  );
};

//이미지를 미리 로드해 두는 함수이다.

export default PosterList;
