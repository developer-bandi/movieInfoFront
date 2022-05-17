import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../component/common/Footer';
import Nav from '../component/common/Nav';
import HeaderContainer from '../container/HeaderContainer';
import PosterListContainer from '../container/RankPosterListContainer';
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
