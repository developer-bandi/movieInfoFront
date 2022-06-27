/*eslint-disable*/

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NullComponent from '../../common/Error/Presentational';
import Loading from '../../common/Loading/Presentational';
import SearchResult from './Presentational';
import { RootState } from '../../../modules';
import { initializeMovieSearchResult } from '../../../modules/moviesearch';

const SearchResultContainer = () => {
  const data = useSelector((state: RootState) => state.movieSearchInfo);
  const loading = useSelector(
    (state: RootState) => state.loadingReducer.loading
  );

  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(initializeMovieSearchResult());
    };
  }, []);

  if (!loading) {
    return <Loading />;
  } else if (data.info.name === 'default') {
    return <NullComponent text={''} />;
  } else if (data.info.name === 'noResult') {
    return <NullComponent text={'검색 결과 없음'} />;
  } else {
    return <SearchResult data={data} dispatch={dispatch} />;
  }
};

export default SearchResultContainer;
