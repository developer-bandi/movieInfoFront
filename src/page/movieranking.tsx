import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../component/common/Footer/Presentational';
import Nav from '../component/common/Navigation/Presentational';
import HeaderContainer from '../component/common/Header/Container';
import PosterListContainer from '../component/Sortedmovie/Container';
import { startLoading } from '../modules/loading';
import { getSortedMovie } from '../modules/sortedmoive';

const Sortedmovie = () => {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(getSortedMovie());
    return () => {
      dispatch(startLoading());
    };
  });

  return (
    <>
      <HeaderContainer />
      <Nav />
      <PosterListContainer />
      <Footer />
    </>
  );
};

export default Sortedmovie;
