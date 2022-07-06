import styles from './Style';
import nullMovie from '../../../imgs/nullmovie.webp';
import OrderButtonContainer from '../OrderButton/Container';
import NullComponent from '../../common/Error/Presentational';
import { MovieRankState } from '../../../store/movieRank/Reducer';

interface PosterListProps {
  movieRankList: MovieRankState;
}

const PosterList = ({ movieRankList }: PosterListProps) => {
  if (movieRankList.loading) {
    return (
      <styles.MainBlock>
        <OrderButtonContainer />
        <styles.PosterListBlock>
          {new Array(20).fill(0).map((zero, index) => {
            return (
              <styles.PosterBlock
                key={index}
                to={`/moviedetail`}
                active={index}
              >
                <styles.MovieImg src={nullMovie} alt="loading" />
              </styles.PosterBlock>
            );
          })}
        </styles.PosterListBlock>
      </styles.MainBlock>
    );
  } else if (movieRankList.error) {
    return (
      <styles.MainBlock>
        <NullComponent text="에러가 발생하였습니다" />
      </styles.MainBlock>
    );
  } else {
    return (
      <styles.MainBlock>
        <OrderButtonContainer />
        <styles.PosterListBlock>
          {movieRankList.content.movieInfo !== undefined &&
            movieRankList.content.movieInfo[movieRankList.content.type].map(
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
                    <styles.MovieNum className="num">
                      {index + 1}
                    </styles.MovieNum>
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
            )}
        </styles.PosterListBlock>
      </styles.MainBlock>
    );
  }
};

export default PosterList;