import { useDispatch } from 'react-redux';
import Footer from '../component/common/Footer';
import Header from '../component/common/Header';
import PosterListContainer from '../container/RankPosterListContainer';
import { getSortedMovie } from '../modules/sortedmoive';

const Sortedmovie = () => {
  const dispatch = useDispatch();
  dispatch(getSortedMovie());

  return (
    <>
      <Header />
      <PosterListContainer />
      <Footer />
    </>
  );
};

export default Sortedmovie;
