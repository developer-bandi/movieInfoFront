/*eslint-disable*/
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Footer from '../component/common/Footer';
import Nav from '../component/common/Nav';
import Loading from '../component/Loading';
import HeaderContainer from '../container/HeaderContainer';
import MovieCommentContainer from '../container/MovieCommentContainer';
import MovieContentContainer from '../container/MovieContentContainer';
import { RootState } from '../modules';
import { startLoading } from '../modules/loading';
import { getMovieDetail } from '../modules/moviedetail';

const Moviedetail = () => {
  const dispatch = useDispatch();
  const { movieid } = useParams<'movieid'>();
  const user = useSelector((state: RootState) => state.userReducer);
  const loading = useSelector(
    (state: RootState) => state.loadingReducer.loading
  );
  useLayoutEffect(() => {
    if (movieid !== undefined) {
      if (user.id !== undefined) {
        dispatch(getMovieDetail(movieid, user.id));
      } else {
        dispatch(getMovieDetail(movieid, null));
      }
    }
    return () => {
      dispatch(startLoading());
    };
  }, []);

  return (
    <>
      <HeaderContainer />
      <Nav />
      {loading ? (
        <Loading />
      ) : (
        <>
          <MovieContentContainer />
          <MovieCommentContainer />
        </>
      )}
      <Footer />
    </>
  );
};

export default Moviedetail;
