/*eslint-disable*/
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../../store';
import {
  initializeMovieSearch,
  searchMovie,
} from '../../../store/movieSearch/Reducer';

const useSearchResult = () => {
  const [pageListNumber, setPageListNumber] = useState(1);
  const [activepageNumber, setactivepageNumber] = useState(1); //현재 결과로 렌더링된 페이지
  const searchResult = useSelector((state: ReducerType) => state.movieSearch);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  });
  //리렌더링시 맨위로, 즉 페이지를 옮길때 맨위로 올라갑니다.

  useEffect(() => {
    if (searchResult.content.searchResult?.page === 1) {
      setPageListNumber(1);
      setactivepageNumber(1);
    }
  }, [searchResult.content.keyword, searchResult.content.searchResult?.page]);

  useEffect(() => {
    return () => {
      dispatch(initializeMovieSearch());
    };
  }, []);

  const MovePage = (position: number) => {
    dispatch(
      searchMovie({
        keyword: searchResult.content.keyword,
        page: position,
      })
    );
    setactivepageNumber(position);
  };

  const setPrevPageList = () => {
    if (searchResult.content.searchResult !== undefined) {
      if (pageListNumber !== 1) {
        setPageListNumber(pageListNumber - 1);
        MovePage((pageListNumber - 2) * 5 + 1);
      }
    }
  };
  //다음페이지로 이동하는데, 이때 페이지네이션하는 페이지의 마지막일경우 다음 페이지네이션을 보여줍니다.
  const setNextPageList = () => {
    if (searchResult.content.searchResult !== undefined) {
      if (searchResult.content.searchResult.totalPage > pageListNumber * 5) {
        setPageListNumber(pageListNumber + 1);
        MovePage(pageListNumber * 5 + 1);
      }
    }
  };
  //이전페이지로 이동하는데, 이때 페이지네이션하는 페이지의 처음일경우 이전 페이지네이션을 보여줍니다.

  const selectPage = (index: number) => {
    dispatch(
      searchMovie({
        keyword: searchResult.content.keyword,
        page: index + (pageListNumber - 1) * 5,
      })
    );
    setactivepageNumber(index + (pageListNumber - 1) * 5);
  };
  return {
    setPrevPageList,
    setNextPageList,
    selectPage,
    activepageNumber,
    searchResult,
    pageListNumber,
  };
};

export default useSearchResult;
