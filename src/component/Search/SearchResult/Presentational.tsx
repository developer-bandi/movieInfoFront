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
  setPrevPageList: () => void;
  setNextPageList: () => void;
  activepageNumber: number;
  selectPage: (index: number) => void;
  pageListNumber: number;
}

const SearchResultPresentational = ({
  searchResult,
  setPrevPageList,
  setNextPageList,
  activepageNumber,
  selectPage,
  pageListNumber,
}: SearchResultProps) => {
  if (searchResult.loading) {
    return <Loading data-testid={'loading'}></Loading>;
  } else if (searchResult.error) {
    return <Except text="에러가 발생하였습니다" data-testid={'error'} />;
  } else if (searchResult.content.searchResult === undefined) {
    return <Except text="" data-testid={'blank'} />;
  } else if (searchResult.content.searchResult.results.length === 0) {
    return <Except text="검색 결과가 없습니다" data-testid={'noResult'} />;
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
          {pageListNumber !== 1 ? (
            <styles.MovePage onClick={setPrevPageList}>
              <IoIosArrowBack data-testid={'prev'} size={20} />
            </styles.MovePage>
          ) : null}
          {new Array(
            pageListNumber * 5 >= searchResult.content.searchResult.totalPage
              ? searchResult.content.searchResult.totalPage -
                (pageListNumber - 1) * 5
              : 5
          )
            .fill(0)
            .map((value, index) => {
              return (
                <styles.PageButton
                  active={
                    activepageNumber === index + 1 + (pageListNumber - 1) * 5
                  }
                  onClick={() => selectPage(index + 1)}
                  key={index}
                >
                  {index + 1 + (pageListNumber - 1) * 5}
                </styles.PageButton>
              );
            })}
          {pageListNumber * 5 < searchResult.content.searchResult.totalPage ? (
            <styles.MovePage onClick={setNextPageList}>
              <IoIosArrowForward data-testid={'next'} size={20} />
            </styles.MovePage>
          ) : null}
        </styles.PagenationBlock>
      </styles.MainBlock>
    );
  }
};

export default SearchResultPresentational;
