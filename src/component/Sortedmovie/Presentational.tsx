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

interface PosterListProps {
  sortedMovie: {
    [index: string]: Obj[];
    popular: Obj[];
    topRated: Obj[];
    error?: any;
  };
  order: string;
  orderchange: (value: string) => void;
}

const SortedPosterList = ({
  sortedMovie,
  order,
  orderchange,
}: PosterListProps) => {
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
          sortedMovie[order === '인기순' ? 'popular' : 'topRated'].map(
            (data, index) => {
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
            }
          )
        )}
      </styles.PosterListBlock>
    </styles.MainBlock>
  );
};

export default SortedPosterList;
