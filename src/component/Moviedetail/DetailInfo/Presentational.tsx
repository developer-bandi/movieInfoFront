import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import styles from './Style';
import { MovieDetailState } from '../../../store/movieDetail/Reducer';
import { UserState } from '../../../store/user/Reducer';
import { MovieCommentState } from '../../../store/movieCommet/Reducer';

interface MovieContentProps {
  movieDetailData: MovieDetailState;
  favoriteSetting: () => void;
  favorite: boolean;
  user: UserState;
}

const MovieContent = ({
  movieDetailData,
  favoriteSetting,
  favorite,
  user,
}: MovieContentProps) => {
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
          {infoTitleEn.map((titleEn, index) => {
            return (
              <styles.InfoBlock key={index}>
                <styles.InfoTitle>{infoTitle[index]}</styles.InfoTitle>
                <styles.InfoContent>
                  {movieDetailData.content !== undefined &&
                    movieDetailData.content[titleEn]}
                </styles.InfoContent>
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

const infoTitle = ['개봉', '장르', '국가', '러닝타임', '평점'];
const infoTitleEn = ['releaseDate', 'genres', 'nation', 'runtime', 'rate'];

export default MovieContent;
