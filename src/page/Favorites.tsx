/*eslint-disable*/
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../component/common/Footer';
import Nav from '../component/common/Nav';
import FavoriteMovieContainer from '../container/FavoriteMovieContainer';
import HeaderContainer from '../container/HeaderContainer';
import { RootState } from '../modules';
import { getLikemovie } from '../modules/likemovie';

const Favorites = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer.id);
  useEffect(() => {
    if (user) {
      dispatch(getLikemovie(user));
    }
  }, []);
  return (
    <>
      <HeaderContainer />
      <Nav />
      <FavoriteMovieContainer />
      <Footer />
    </>
  );
};

export default Favorites;
