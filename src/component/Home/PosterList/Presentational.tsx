import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import nullmovie from '../../../tempdata/nullmovie.webp';
import { useDispatch } from 'react-redux';
import {
  getNowCommingPosterposition,
  getNowShowingPosterposition,
} from '../../../modules/posterposition';
import styles from './Style';
type Result = {
  id: string;
  title: string;
  overview: string;
  voteAverage: number;
  posterPath: string;
};

interface PosterListProps {
  title: string;
  result: Result[];
  listNumber: { start: number; end: number };
}
const PosterList = ({ title, result, listNumber }: PosterListProps) => {
  const [start, setstart] = useState(listNumber.start);
  const [end, setend] = useState(listNumber.end);
  const dispatch = useDispatch();

  const changePage = (position: String) => {
    const chageStartValue = position === 'prev' ? start - 5 : start + 5;
    const chageEndValue = position === 'prev' ? end - 5 : end + 5;
    setstart(chageStartValue);
    setend(chageEndValue);
    if (title === '현재상영중') {
      dispatch(
        getNowShowingPosterposition({
          start: chageStartValue,
          end: chageEndValue,
        })
      );
    } else {
      dispatch(
        getNowCommingPosterposition({
          start: chageStartValue,
          end: chageEndValue,
        })
      );
    }
  };
  //매개 변수 값에 따라 이전 혹은 이후 페이지로 이동한뒤, 이동을 리덕스에 저장한다.

  return (
    <styles.MainBlock>
      <styles.TitleBlock>
        <styles.Title>{title}</styles.Title>
      </styles.TitleBlock>
      <styles.PosterListBlock>
        {
          start === 0 ? (
            <styles.NullButton />
          ) : (
            <styles.PageButton onClick={() => changePage('prev')}>
              <FiChevronLeft size={40} />
            </styles.PageButton>
          ) /*이전으로 넘길수 없으면 빈박스만 렌더링하고 버튼을 누르면 start와 end값에 5를 뺀다*/
        }
        {
          result[0].title === 'default'
            ? result.map((data, index) => {
                return (
                  <styles.NullPosterBlock key={index}>
                    <styles.MovieImg src={nullmovie} alt="x" />
                  </styles.NullPosterBlock>
                );
              })
            : result.slice(start, end).map((data, index) => {
                return (
                  <styles.PosterBlock
                    to={`/moviedetail/${data.id}`}
                    key={index}
                  >
                    <styles.MovieImg
                      src={`https://image.tmdb.org/t/p/w500${data.posterPath}`}
                      alt="x"
                    ></styles.MovieImg>
                    <styles.MovieInfo className="movieinfo">
                      {data.overview.length > 170
                        ? data.overview.substring(0, 170) + '...'
                        : data.overview}
                    </styles.MovieInfo>
                    <styles.MovieRating className="rating">
                      평점 {data.voteAverage}
                    </styles.MovieRating>
                    <styles.MoiveName className="moviename">
                      {data.title.length > 12
                        ? data.title.substring(0, 12) + '...'
                        : data.title}
                    </styles.MoiveName>
                  </styles.PosterBlock>
                );
              }) /*주어진 start,end범위에 따라 포스터에 마우스를 올리면 요약정보를 보여주는 포스터들 5개를 렌더링 */
        }
        {
          end === result.length ? (
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
