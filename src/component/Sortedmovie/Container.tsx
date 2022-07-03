/*eslint-disable*/
import { useDispatch, useSelector } from 'react-redux';
import SortedPosterList from './Presentational';
import { ReducerType } from '../../store';
import { setRankType } from '../../store/movieRank/Reducer';

const PosterListContainer = () => {
  const sortedMovie = useSelector((state: ReducerType) => state.movieRank);
  const dispatch = useDispatch();
  //정렬을 어떤 순으로 할것인지 저장하는 상태값입니다.

  const orderchange = (orderType: string) => {
    dispatch(setRankType(orderType));
  }; // 정렬을 바꾸어줍니다.

  return (
    <SortedPosterList sortedMovie={sortedMovie} orderchange={orderchange} />
  );
};

export default PosterListContainer;
