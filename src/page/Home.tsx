import Footer from '../component/common/Footer/Presentational';
import Nav from '../component/common/Navigation/Presentational';
import NowShowingContainer from '../component/Home/PosterList/Container';
import { useDispatch } from 'react-redux';
import FirstmoivevideoContainer from '../component/Home/MovieVideo/Container';
import { useLayoutEffect } from 'react';
import HeaderContainer from '../component/common/Header/Container';
import { getHomePoster } from '../store/homePoster/Reducer';
import { checkLoginuser } from '../store/user/Reducer';

const Home = () => {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(checkLoginuser());
    dispatch(getHomePoster());
  });

  return (
    <>
      <HeaderContainer />
      <Nav />
      <FirstmoivevideoContainer />
      <NowShowingContainer title={'현재상영중'} />
      <NowShowingContainer title={'개봉예정작'} />
      <Footer></Footer>
    </>
  );
};
export default Home;
