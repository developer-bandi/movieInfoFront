/*eslint-disable*/
import nullmovie from '../../../tempdata/nullmovie.webp';
import { useEffect, useState } from 'react';
import { getMovieSearchResultData } from '../../../modules/moviesearch';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import styles from './Style';

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
  searchResult: any;
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
      {searchResult.result[activepage - 1] === undefined
        ? null
        : searchResult.result[activepage - 1].map((data: any) => {
            return (
              <styles.PosterBlock to={`/moviedetail/${data.id}`} key={data.id}>
                <styles.MovieImg
                  src={
                    data.posterPath === null
                      ? nullmovie
                      : `https://image.tmdb.org/t/p/w500${data.posterPath}`
                  }
                  alt="x"
                />
                <styles.MovieInfoBlock>
                  <styles.Title> {data.title}</styles.Title>
                  <styles.MovieMoreInfoBlock>
                    <styles.InfoTitle>개봉</styles.InfoTitle>
                    <styles.InfoContent>
                      {data.release === '' ? '정보 없음' : data.release}
                    </styles.InfoContent>
                  </styles.MovieMoreInfoBlock>
                  <styles.MovieMoreInfoBlock>
                    <styles.InfoTitle>평점</styles.InfoTitle>
                    <styles.InfoContent>
                      {data.rate === 0 ? '평가중' : data.rate}
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
          active={activepage === searchResult.info.totalpage ? 'true' : 'false'}
        >
          <IoIosArrowForward />
        </styles.MovePage>
      </styles.PagenationBlock>
    </styles.MainBlock>
  );
};

export default SearchResult;
