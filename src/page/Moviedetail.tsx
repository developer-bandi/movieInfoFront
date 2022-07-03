/*eslint-disable*/
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Footer from '../component/common/Footer/Presentational';
import Nav from '../component/common/Navigation/Presentational';
import HeaderContainer from '../component/common/Header/Container';
import MovieCommentContainer from '../component/Moviedetail/Comment/Container';
import MovieContentContainer from '../component/Moviedetail/DetailInfo/Container';
import { getMovieDetail } from '../store/movieDetail/Reducer';

const Moviedetail = () => {
  const dispatch = useDispatch();
  const { movieid } = useParams<'movieid'>();
  useLayoutEffect(() => {
    if (movieid !== undefined) {
      dispatch(getMovieDetail({ id: Number(movieid) }));
    }
  }, []);

  return (
    <>
      <HeaderContainer />
      <Nav />
      <MovieContentContainer />
      <MovieCommentContainer />
      <Footer />
    </>
  );
};

export default Moviedetail;
