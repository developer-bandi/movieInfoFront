import { useEffect, useMemo, useState } from 'react';
import NullComponent from '../common/Error/Presentational';
import styles from './Style';

interface Obj {
  id: string;
  title: string;
  overview: string;
  voteAverage: number;
  posterPath: string;
}

interface Order {
  [index: string]: Obj[];
  인기순: Obj[];
  별점순: Obj[];
}

const SortedPosterList = ({
  popular,
  topRated,
  orderdata,
}: {
  popular: Obj[];
  topRated: Obj[];
  orderdata: string;
}) => {
  const [order, setorder] = useState(''); //정렬을 어떤 순으로 할것인지 저장하는 상태값입니다.
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

  useEffect(() => {
    setorder(orderdata);
  }, [orderdata]);
  // 처음 데이터를 받아오면 이전에 보았던 정렬 순서를 불러옵니다.

  const obj: Order = useMemo(() => {
    return {
      인기순: topRated,
      별점순: popular,
    };
  }, [topRated, popular]);
  //속성값으로 받아온 데이터를 저장해 둡니다.

  return (
    <styles.MainBlock>
      <styles.OrderButtonBlock>
        <styles.OrderButtonSubBlock>
          <styles.OrderButton
            onClick={() => orderchange('인기순')}
            active={order === '인기순'}
          >
            인기순
          </styles.OrderButton>
          <styles.OrderButton
            onClick={() => orderchange('별점순')}
            active={order === '별점순'}
          >
            별점순
          </styles.OrderButton>
        </styles.OrderButtonSubBlock>
      </styles.OrderButtonBlock>
      <styles.PosterListBlock>
        {order === '' ? (
          <NullComponent text="로딩중"></NullComponent>
        ) : (
          obj[order].map((data, index) => {
            return (
              <styles.PosterBlock
                key={index}
                to={`/moviedetail/${data.id}`}
                active={index}
              >
                <styles.MovieImg
                  src={`https://image.tmdb.org/t/p/w500${data.posterPath}`}
                  alt="x"
                />
                <styles.MovieNum className="num">{index + 1}</styles.MovieNum>
                <styles.MovieInfo className="movieinfo">
                  {data.overview.length > 220
                    ? data.overview.substr(0, 220) + '...'
                    : data.overview}
                </styles.MovieInfo>
                <styles.MovieRating className="rating">
                  평점 {data.voteAverage}
                </styles.MovieRating>
                <styles.MoiveName className="moviename">
                  {data.title.length > 12
                    ? data.title.substr(0, 12) + '...'
                    : data.title}
                </styles.MoiveName>
              </styles.PosterBlock>
            );
          })
        )}
      </styles.PosterListBlock>
    </styles.MainBlock>
  );
};

export default SortedPosterList;
