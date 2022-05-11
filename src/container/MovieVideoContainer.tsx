import { useSelector } from 'react-redux';
import MovieVideo from '../component/Home/MovieVideo';
import { RootState } from '../modules';

const MoiveVideoContainer = () => {
  const data = useSelector((state: RootState) => state.homePosterInfo.key);
  return <MovieVideo moviekey={data} />;
};

export default MoiveVideoContainer;
