/*eslint-disable*/

import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineStar } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import nation from '../../tempdata/nation';
import { initializeMovieDetail } from '../../modules/moviedetail';
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

const MovieContent = ({ data }: { data: MovieContentProps }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [favorite, setfavorite] = useState(false);
  const [nowMovieIndex, setNowMovieIndex] = useState(-1);

  const infoTitle: string[] = ['개봉', '장르', '국가', '러닝타임', '평점'];
  const infoData: (string | number)[] = [
    data.releaseDate,
    data.genres.join(' '),
    nation[data.nation] === undefined ? data.nation : nation[data.nation],
    data.runtime + '분',
    data.rate === 0 ? '평가중' : data.rate,
  ];

  useEffect(() => {
    const output = localStorage.getItem('favoriteMovie');
    if (output !== null) {
      const outputArr = JSON.parse(output);
      if (
        outputArr.filter(
          (
            movieinfo: { name: string; id: string; url: string },
            index: number
          ) => {
            if (movieinfo.name === data.title) {
              setNowMovieIndex(index);
              return true;
            } else {
              return false;
            }
          }
        ).length === 1
      ) {
        setfavorite((prev: boolean) => !prev);
      }
    }
  }, [data]);
  //즐겨찾기가 되어있는지 확인하는 로직입니다. 로컬스토리지에서 데이터를 받아온뒤에, api에서 받은 영화제목과 일치하는 객체를 찾고 있으면 favorite을 true로 만듭니다.

  useEffect(() => {
    return () => {
      dispatch(initializeMovieDetail());
    };
  }, []);
  //페이지를 나가면 리덕스를 초기화합니다.

  const favoriteSetting = () => {
    if (favorite) {
      const output = localStorage.getItem('favoriteMovie');
      const notnuloutput = output || 'default';
      const outputarr = JSON.parse(notnuloutput);
      outputarr.splice(nowMovieIndex, 1);
      localStorage.setItem('favoriteMovie', JSON.stringify(outputarr));
      setfavorite(false);
    } else {
      const newmovie = {
        id: params.movieid,
        name: data.title,
        url: data.posterPath,
      };
      const output = localStorage.getItem('favoriteMovie');
      let outputArr = null;
      if (output !== null && !favorite) {
        outputArr = JSON.parse(output);
        outputArr.push(newmovie);
      } else {
        outputArr = [newmovie];
      }

      localStorage.setItem('favoriteMovie', JSON.stringify(outputArr));
      setfavorite(true);
      setNowMovieIndex(outputArr.length - 1);
    }
  };
  //즐겨찾기되어있으면 로컬스토리지 배열과 state에서 삭제하고, 아니라면 로컬스토리 배열과 state에 추가합니다.

  return data.title === 'default' ? (
    <NullComponent text={'로딩중'}></NullComponent>
  ) : (
    <MovieContentBlock>
      <MovieImgInfoBlock>
        <MovieImg
          src={`https://image.tmdb.org/t/p/w500${data.posterPath}`}
          alt=""
        />
        <MovieInfo>
          {favorite ? (
            <FavoritesAddButtonFill onClick={favoriteSetting} />
          ) : (
            <FavoritesAddButtonBlank onClick={favoriteSetting} />
          )}
          <MovieTitle>{data.title}</MovieTitle>
          {infoData.map((data, index) => {
            return (
              <MovieInfoContainer key={data}>
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
  width: 15rem;
  height: 20rem;
  border-radius: 10px;
  @media screen and (max-width: 500px) {
    width: 8rem;
    height: 14rem;
  }
`;

const MovieInfo = styled.div`
  width: 60rem;
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
  width: 77rem;
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
