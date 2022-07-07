/*eslint-disable*/

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../../store';
import {
  initializeMovieSearch,
  searchMovie,
} from '../../../store/movieSearch/Reducer';
import SearchResult from './Presentational';

const SearchResultContainer = () => {
  const [start, setstart] = useState(1); //현재 페이지네이션으로 보여주고있는 첫페이지
  const [end, setend] = useState(0); //현재 페이지네이션으로 보여주고있는 마지막 페이지
  const [activepage, setactivepage] = useState(1); //현재 결과로 렌더링된 페이지
  const searchResult = useSelector((state: ReducerType) => state.movieSearch);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  });
  //리렌더링시 맨위로, 즉 페이지를 옮길때 맨위로 올라갑니다.

  useEffect(() => {
    return () => {
      dispatch(initializeMovieSearch());
    };
  }, []);

  useEffect(() => {
    if (searchResult.content.searchResult !== undefined) {
      if (searchResult.content.searchResult.totalPage <= 5) {
        setend(searchResult.content.searchResult.totalPage);
      } else {
        setend(5);
      }
    }
  }, [searchResult]);

  const MovePage = (position: number) => {
    dispatch(
      searchMovie({
        keyword: searchResult.content.keyword,
        page: activepage + position,
      })
    );
    setactivepage(activepage + position);
  };

  const prevPage = () => {
    if (activepage % 5 === 1) {
      if (searchResult.content.searchResult !== undefined) {
        if (end === searchResult.content.searchResult.totalPage) {
          setstart(start - 5);
          setend(end - (end % 5));
        } else {
          setstart(start - 5);
          setend(end - 5);
        }
      }
    }
    MovePage(-1);
  };
  //다음페이지로 이동하는데, 이때 페이지네이션하는 페이지의 마지막일경우 다음 페이지네이션을 보여줍니다.
  const nextPage = () => {
    if (activepage % 5 === 0) {
      if (searchResult.content.searchResult !== undefined) {
        if (searchResult.content.searchResult.totalPage > end + 5) {
          setstart(start + 5);
          setend(end + 5);
        } else {
          setstart(start + 5);
          setend(searchResult.content.searchResult.totalPage);
        }
      }
      MovePage(+1);
    }
  };
  //이전페이지로 이동하는데, 이때 페이지네이션하는 페이지의 처음일경우 이전 페이지네이션을 보여줍니다.

  const goPage = (index: number) => {
    dispatch(
      searchMovie({
        keyword: searchResult.content.keyword,
        page: index + start,
      })
    );
    setactivepage(index + start);
  };
  return (
    <SearchResult
      searchResult={searchResult}
      prevPage={prevPage}
      nextPage={nextPage}
      activepage={activepage}
      start={start}
      end={end}
      goPage={goPage}
    />
  );
};

export default SearchResultContainer;
