import Footer from '../component/common/Footer';
import Nav from '../component/common/Nav';
import NowShowingContainer from '../container/HomePosterListContainer';
import { useDispatch } from 'react-redux';
import { getHomePoster } from '../modules/homeposter';
import FirstmoivevideoContainer from '../container/MovieVideoContainer';
import { useEffect } from 'react';
import HeaderContainer from '../container/HeaderContainer';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomePoster());
  });

  return (
    <>
      <HeaderContainer />
      <Nav />
      <FirstmoivevideoContainer />
      <NowShowingContainer />
      <Footer></Footer>
    </>
  );
};
export default Home;
