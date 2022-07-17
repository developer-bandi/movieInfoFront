import { useSelector } from 'react-redux';
import { ReducerType } from '../../../store';
import MovieVideoPresentational from './Presentational';

const MoiveVideoContainer = () => {
  const moviekey = useSelector((state: ReducerType) => state.homePoster);
  return <MovieVideoPresentational moviekey={moviekey} />;
};

export default MoiveVideoContainer;
