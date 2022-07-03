/*eslint-disable*/
import nullmovie from '../../../tempdata/nullmovie.webp';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import styles from './Style';
import { MovieSearchState } from '../../../store/movieSearch/Reducer';

interface Info {
  name: string;
  totalpage: number;
}

interface Result {
  title: string;
  id: string;
  posterPath: string;
  rate: number;
  release: string;
}

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
  return (
    <styles.MainBlock>
      {searchResult.content.searchResult === undefined
        ? null
        : searchResult.content.searchResult.results.map((poserInfo) => {
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
                  alt="x"
                />
                <styles.MovieInfoBlock>
                  <styles.Title> {poserInfo.title}</styles.Title>
                  <styles.MovieMoreInfoBlock>
                    <styles.InfoTitle>개봉</styles.InfoTitle>
                    <styles.InfoContent>
                      {poserInfo.release === ''
                        ? '정보 없음'
                        : poserInfo.release}
                    </styles.InfoContent>
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
};

export default SearchResult;
