import { useSelector } from 'react-redux';
import { ReducerType } from '../../../store';
import MovieVideo from './Presentational';

const MoiveVideoContainer = () => {
  const moviekey = useSelector(
    (state: ReducerType) => state.homePoster.content.posterList?.key
  );
  return <MovieVideo moviekey={moviekey} />;
};

export default MoiveVideoContainer;
