import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import MovieVideo from './Presentational';

const MoiveVideoContainer = () => {
  const data = useSelector((state: RootState) => state.homePosterInfo.key);
  return <MovieVideo moviekey={data} />;
};

export default MoiveVideoContainer;
