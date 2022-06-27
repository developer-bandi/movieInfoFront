/*eslint-disable*/
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Footer from '../component/common/Footer/Presentational';
import Nav from '../component/common/Navigation/Presentational';
import Loading from '../component/common/Loading/Presentational';
import HeaderContainer from '../component/common/Header/Container';
import MovieCommentContainer from '../component/Moviedetail/Comment/Container';
import MovieContentContainer from '../component/Moviedetail/DetailInfo/Container';
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
