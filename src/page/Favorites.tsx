/*eslint-disable*/
import Footer from '../component/common/Footer/Presentational';
import Nav from '../component/common/Navigation/Presentational';
import FavoriteMovieContainer from '../component/FavoriteMovie/Container';
import HeaderContainer from '../component/common/Header/Container';

const Favorites = () => {
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
