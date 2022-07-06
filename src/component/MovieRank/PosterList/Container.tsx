import { useSelector } from 'react-redux';
import SortedPosterList from './Presentational';
import { ReducerType } from '../../../store';

const PosterListContainer = () => {
  const movieRankList = useSelector((state: ReducerType) => state.movieRank);

  return <SortedPosterList movieRankList={movieRankList} />;
};

export default PosterListContainer;
