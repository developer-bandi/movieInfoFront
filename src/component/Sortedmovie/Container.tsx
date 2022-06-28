/*eslint-disable*/
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import SortedPosterList from './Presentational';
import imagePreload from '../../lib/imagePreload';
import Loading from '../common/Loading/Presentational';
import { RootState } from '../../modules';

const PosterListContainer = () => {
  const sortedMovie = useSelector((state: RootState) => state.sortedMovieInfo);
  const loading = useSelector(
    (state: RootState) => state.loadingReducer.loading
  );
  const [order, setorder] = useState(() => {
    const localOrder = localStorage.getItem('order');
    if (localOrder == null) {
      localStorage.setItem('order', '인기순');
      return '인기순';
    } else {
      return localOrder;
    }
  });
  //정렬을 어떤 순으로 할것인지 저장하는 상태값입니다.

  useEffect(() => {
    if (sortedMovie.popular[0].title !== 'default') {
      const orderdataname =
        order === '인기순' ? sortedMovie.topRated : sortedMovie.popular;
      orderdataname.forEach((data) => {
        imagePreload(data.posterPath);
      });
    }
  }, [sortedMovie]);
  //이미지를 미리 로드합니다.

  const orderchange = (value: string) => {
    if (value !== order) {
      if (value === '인기순') {
        setorder('인기순');
        localStorage.setItem('order', '인기순');
      } else {
        setorder('별점순');
        localStorage.setItem('order', '별점순');
      }
    }
  }; // 정렬을 바꾸어줍니다.

  const obj = useMemo(() => {
    return {
      인기순: sortedMovie.topRated,
      별점순: sortedMovie.popular,
    };
  }, [sortedMovie.topRated, sortedMovie.popular]);
  //속성값으로 받아온 데이터를 저장해 둡니다.

  return loading ? (
    <Loading />
  ) : (
    <SortedPosterList
      sortedMovie={sortedMovie}
      order={order}
      orderchange={orderchange}
    />
  );
};

export default PosterListContainer;
