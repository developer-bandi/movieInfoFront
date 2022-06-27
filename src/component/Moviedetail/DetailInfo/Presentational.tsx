/*eslint-disable*/

import nation from '../../../tempdata/nation';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import styles from './Style';

interface MovieContentProps {
  releaseDate: number;
  genres: string[];
  nation: string;
  runtime: number;
  rate: number;
  title: string;
  posterPath: string;
  overview: string;
  tagline: string;
}

interface user {
  login: boolean;
  id?: string;
  userid?: string;
  nick?: string;
}

const MovieContent = ({
  data,
  user,
  favoriteSetting,
  favorite,
}: {
  data: MovieContentProps;
  user: user;
  favoriteSetting: () => void;
  favorite: boolean;
}) => {
  const infoTitle: string[] = ['개봉', '장르', '국가', '러닝타임', '평점'];
  const infoData: (string | number)[] = [
    data.releaseDate,
    data.genres.join(' '),
    nation[data.nation] === undefined ? data.nation : nation[data.nation],
    data.runtime + '분',
    data.rate === 0 ? '평가중' : data.rate,
  ];

  return (
    <styles.MainBlock>
      <styles.ImgInfoBlock>
        <styles.Img
          src={`https://image.tmdb.org/t/p/w500${data.posterPath}`}
          alt=""
        />
        <styles.InfoListBlock>
          {user.login ? (
            <styles.FavoriteButton onClick={favoriteSetting}>
              {favorite ? <AiFillStar /> : <AiOutlineStar />}
            </styles.FavoriteButton>
          ) : null}

          <styles.MovieTitle>{data.title}</styles.MovieTitle>
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
        <styles.Tagline>{data.tagline}</styles.Tagline>
        <styles.Overview>{data.overview}</styles.Overview>
      </styles.SummuryBlock>
    </styles.MainBlock>
  );
};

export default MovieContent;
