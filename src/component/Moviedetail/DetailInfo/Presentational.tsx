import nation from '../../../tempdata/nation';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import styles from './Style';
import { MovieDetailState } from '../../../store/movieDetail/Reducer';
import { UserState } from '../../../store/user/Reducer';

const MovieContent = ({
  movieDetailData,
  favoriteSetting,
  favorite,
  user,
}: {
  movieDetailData: MovieDetailState;
  favoriteSetting: () => void;
  favorite: boolean;
  user: UserState;
}) => {
  const infoTitle: string[] = ['개봉', '장르', '국가', '러닝타임', '평점'];
  const infoData: (string | number)[] =
    movieDetailData.content !== undefined
      ? [
          movieDetailData.content.releaseDate,
          movieDetailData.content.genres.join(' '),
          nation[movieDetailData.content.nation] === undefined
            ? movieDetailData.content.nation
            : nation[movieDetailData.content.nation],
          movieDetailData.content.runtime + '분',
          movieDetailData.content.rate === 0
            ? '평가중'
            : movieDetailData.content.rate,
        ]
      : [];

  return (
    <styles.MainBlock>
      <styles.ImgInfoBlock>
        <styles.Img
          src={`https://image.tmdb.org/t/p/w500${movieDetailData.content?.posterPath}`}
          alt=""
        />
        <styles.InfoListBlock>
          {user.content ? (
            <styles.FavoriteButton onClick={favoriteSetting}>
              {favorite ? <AiFillStar /> : <AiOutlineStar />}
            </styles.FavoriteButton>
          ) : null}

          <styles.MovieTitle>
            {movieDetailData.content?.title}
          </styles.MovieTitle>
          {infoData.map((data, index) => {
            return (
              <styles.InfoBlock key={index}>
                <styles.InfoTitle>{infoTitle[index]}</styles.InfoTitle>
                <styles.InfoContent>{data}</styles.InfoContent>
              </styles.InfoBlock>
            );
          })}
        </styles.InfoListBlock>
      </styles.ImgInfoBlock>
      <styles.SummuryBlock>
        <styles.Tagline>{movieDetailData.content?.tagline}</styles.Tagline>
        <styles.Overview>{movieDetailData.content?.overview}</styles.Overview>
      </styles.SummuryBlock>
    </styles.MainBlock>
  );
};

export default MovieContent;
