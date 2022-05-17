/*eslint-disable*/

import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineStar } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';
import nation from '../../tempdata/nation';
import { useDispatch } from 'react-redux';
import NullComponent from '../common/NullComponent';

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
    <MovieContentBlock>
      <MovieImgInfoBlock>
        <MovieImg
          src={`https://image.tmdb.org/t/p/w500${data.posterPath}`}
          alt=""
        />
        <MovieInfo>
          {user.login ? (
            favorite ? (
              <FavoritesAddButtonFill onClick={favoriteSetting} />
            ) : (
              <FavoritesAddButtonBlank onClick={favoriteSetting} />
            )
          ) : null}

          <MovieTitle>{data.title}</MovieTitle>
          {infoData.map((data, index) => {
            return (
              <MovieInfoContainer key={index}>
                <MovieInfoTitle>{infoTitle[index]}</MovieInfoTitle>
                <MovieInfoContent>{data}</MovieInfoContent>
              </MovieInfoContainer>
            );
          })}
        </MovieInfo>
      </MovieImgInfoBlock>
      <MovieSummury>
        <MovieTagline>{data.tagline}</MovieTagline>
        <MovieOverview>{data.overview}</MovieOverview>
      </MovieSummury>
    </MovieContentBlock>
  );
};

const MovieContentBlock = styled.div`
  background: ${(props) => props.theme.background};
  border-bottom: 1px solid #e8e8e8;
`;

const MovieImgInfoBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  padding-top: 10rem;
  @media screen and (max-width: 500px) {
    padding-top: 2rem;
  }
`;

const MovieImg = styled.img`
  width: 17%;
  border-radius: 10px;
  @media screen and (max-width: 500px) {
    width: 8rem;
    height: 14rem;
  }
`;

const MovieInfo = styled.div`
  width: 60%;
  height: 20rem;
  margin-left: 2rem;
  @media screen and (max-width: 500px) {
    width: 13rem;
    height: 10rem;
    margin-left: 1rem;
  }
`;

const FavoritesAddButtonBlank = styled(AiOutlineStar)`
  width: 3rem;
  height: 3rem;
  float: right;
`;

const FavoritesAddButtonFill = styled(AiFillStar)`
  width: 3rem;
  height: 3rem;
  float: right;
`;

const MovieTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 1rem;
  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`;

const MovieInfoContainer = styled.div`
  display: flex;
  margin-bottom: 0.7rem;
`;

const MovieInfoTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const MovieInfoContent = styled.div`
  font-size: 20px;
  margin-left: 1rem;
  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
`;

const MovieSummury = styled.div`
  width: 80%;
  margin: auto;
  padding-bottom: 3rem;
  border-top: 0.5px solid gray;
  line-height: 1.5;

  @media screen and (max-width: 500px) {
    width: 90%;
    height: 100%;
    padding: 5%;
  }
`;

const MovieTagline = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const MovieOverview = styled.div`
  font-size: 17px;
`;

export default MovieContent;
