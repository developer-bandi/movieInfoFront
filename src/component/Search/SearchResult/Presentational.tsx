/*eslint-disable*/
import nullmovie from '../../../imgs/nullmovie.webp';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import styles from './Style';
import { MovieSearchState } from '../../../store/movieSearch/Reducer';
import Loading from '../../common/Loading/Presentational';
import Except from '../../common/Except/Presentational';

interface SearchResultProps {
  searchResult: MovieSearchState;
  prevPage: () => void;
  nextPage: () => void;
  activepage: number;
  start: number;
  end: number;
  goPage: (index: number) => void;
}

const SearchResult = ({
  searchResult,
  activepage,
  prevPage,
  nextPage,
  start,
  end,
  goPage,
}: SearchResultProps) => {
  if (searchResult.loading) {
    return <Loading></Loading>;
  } else if (searchResult.error) {
    return <Except text="에러가 발생하였습니다" />;
  } else if (searchResult.content.searchResult === undefined) {
    return <Except text="" />;
  } else {
    return (
      <styles.MainBlock>
        {searchResult.content.searchResult.results.map((poserInfo) => {
          return (
            <styles.PosterBlock
              to={`/moviedetail/${poserInfo.id}`}
              key={poserInfo.id}
            >
              <styles.MovieImg
                src={
                  poserInfo.posterPath === null
                    ? nullmovie
                    : `https://image.tmdb.org/t/p/w500${poserInfo.posterPath}`
                }
                alt={poserInfo.posterPath === null ? 'notPoster' : 'poster'}
              />
              <styles.MovieInfoBlock>
                <styles.Title> {poserInfo.title}</styles.Title>
                <styles.MovieMoreInfoBlock>
                  <styles.InfoTitle>개봉</styles.InfoTitle>
                  <styles.InfoContent>{poserInfo.release}</styles.InfoContent>
                </styles.MovieMoreInfoBlock>
                <styles.MovieMoreInfoBlock>
                  <styles.InfoTitle>평점</styles.InfoTitle>
                  <styles.InfoContent>
                    {poserInfo.rate === 0 ? '평가중' : poserInfo.rate}
                  </styles.InfoContent>
                </styles.MovieMoreInfoBlock>
              </styles.MovieInfoBlock>
            </styles.PosterBlock>
          );
        })}
        <styles.PagenationBlock>
          <styles.MovePage
            onClick={prevPage}
            active={activepage === 1 ? 'true' : 'false'}
          >
            <IoIosArrowBack />
          </styles.MovePage>
          {new Array(end - start + 1).fill(0).map((value, index) => {
            return (
              <styles.PageButton
                active={activepage === index + start}
                onClick={() => goPage(index)}
                key={index}
              >
                {index + start}
              </styles.PageButton>
            );
          })}
          <styles.MovePage
            onClick={nextPage}
            active={
              activepage === searchResult.content.searchResult?.totalPage
                ? 'true'
                : 'false'
            }
          >
            <IoIosArrowForward />
          </styles.MovePage>
        </styles.PagenationBlock>
      </styles.MainBlock>
    );
  }
};

export default SearchResult;
