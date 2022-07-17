import { useSelector } from 'react-redux';
import PosterListPresentational from './Presentational';
import { ReducerType } from '../../../store';

const PosterListContainer = () => {
  const movieRankList = useSelector((state: ReducerType) => state.movieRank);

  return <PosterListPresentational movieRankList={movieRankList} />;
};

export default PosterListContainer;
