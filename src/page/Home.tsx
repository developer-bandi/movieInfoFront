import Footer from '../component/common/Footer/Presentational';
import Nav from '../component/common/Navigation/Presentational';
import NowShowingContainer from '../component/Home/PosterList/Container';
import { useDispatch } from 'react-redux';
import FirstmoivevideoContainer from '../component/Home/MovieVideo/Container';
import { useEffect } from 'react';
import HeaderContainer from '../component/common/Header/Container';
import { getHomePoster } from '../store/homePoster/Reducer';

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
