import { MovieRankState } from '../../store/movieRank/Reducer';
import NullComponent from '../common/Error/Presentational';
import styles from './Style';

interface PosterListProps {
  sortedMovie: MovieRankState;
  orderchange: (orderType: string) => void;
}

const SortedPosterList = ({ sortedMovie, orderchange }: PosterListProps) => {
  return (
    <styles.MainBlock>
      <styles.OrderButtonBlock>
        <styles.OrderButtonSubBlock>
          <styles.OrderButton
            onClick={() => orderchange('인기순')}
            active={sortedMovie.content.type === 'popular'}
          >
            인기순
          </styles.OrderButton>
          <styles.OrderButton
            onClick={() => orderchange('별점순')}
            active={sortedMovie.content.type === 'topRated'}
          >
            별점순
          </styles.OrderButton>
        </styles.OrderButtonSubBlock>
      </styles.OrderButtonBlock>
      <styles.PosterListBlock>
        {sortedMovie.loading ? (
          <NullComponent text="로딩중"></NullComponent>
        ) : sortedMovie.content.movieInfo !== undefined ? (
          sortedMovie.content.movieInfo[sortedMovie.content.type].map(
            (movieInfo, index) => {
              return (
                <styles.PosterBlock
                  key={index}
                  to={`/moviedetail/${movieInfo.id}`}
                  active={index}
                >
                  <styles.MovieImg
                    src={`https://image.tmdb.org/t/p/w500${movieInfo.posterPath}`}
                    alt="x"
                  />
                  <styles.MovieNum className="num">{index + 1}</styles.MovieNum>
                  <styles.MovieInfo className="movieinfo">
                    {movieInfo.overview.length > 220
                      ? movieInfo.overview.substring(0, 220) + '...'
                      : movieInfo.overview}
                  </styles.MovieInfo>
                  <styles.MovieRating className="rating">
                    평점 {movieInfo.voteAverage}
                  </styles.MovieRating>
                  <styles.MoiveName className="moviename">
                    {movieInfo.title.length > 12
                      ? movieInfo.title.substring(0, 12) + '...'
                      : movieInfo.title}
                  </styles.MoiveName>
                </styles.PosterBlock>
              );
            }
          )
        ) : null}
      </styles.PosterListBlock>
    </styles.MainBlock>
  );
};

export default SortedPosterList;
