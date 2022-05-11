import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Footer from '../component/common/Footer';
import Header from '../component/common/Header';
import MovieCommentContainer from '../container/MovieCommentContainer';
import MovieContentContainer from '../container/MovieContentContainer';
import { getMovieDetail } from '../modules/moviedetail';

const Moviedetail = () => {
  const dispatch = useDispatch();
  const { movieid } = useParams<'movieid'>();
  if (movieid !== undefined) {
    dispatch(getMovieDetail(movieid));
  }
  return (
    <>
      <Header />
      <MovieContentContainer />
      <MovieCommentContainer />
      <Footer />
    </>
  );
};

export default Moviedetail;
