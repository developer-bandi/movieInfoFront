import { useSelector } from 'react-redux';
import MovieContent from '../component/Moviedetail/MovieContent';
import { RootState } from '../modules';

const MovieContentContainer = () => {
  const data = useSelector((state: RootState) => state.movieDetailInfo);
  return <MovieContent data={data} />;
};

export default MovieContentContainer;
