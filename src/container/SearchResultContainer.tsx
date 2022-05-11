/*eslint-disable*/

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NullComponent from '../component/common/NullComponent';
import SearchResult from '../component/Search/SearchResult';
import { RootState } from '../modules';
import { initializeMovieSearchResult } from '../modules/moviesearch';

const SearchResultContainer = () => {
  const data = useSelector((state: RootState) => state.movieSearchInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(initializeMovieSearchResult());
    };
  }, []);

  if (data.info.name === 'default') {
    return <NullComponent text={''} />;
  } else {
    return <SearchResult data={data} dispatch={dispatch} />;
  }
};

export default SearchResultContainer;
