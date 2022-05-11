import Footer from '../component/common/Footer';
import Header from '../component/common/Header';
import NowShowingContainer from '../container/HomePosterListContainer';
import { useDispatch } from 'react-redux';
import { getHomePoster } from '../modules/homeposter';
import FirstmoivevideoContainer from '../container/MovieVideoContainer';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomePoster());
  });

  return (
    <>
      <Header />
      <FirstmoivevideoContainer />
      <NowShowingContainer />
      <Footer></Footer>
    </>
  );
};
export default Home;
