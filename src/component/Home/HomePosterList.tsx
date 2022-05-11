import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import nullmovie from '../../tempdata/nullmovie.webp';
import { useDispatch } from 'react-redux';
import {
  getNowCommingPosterposition,
  getNowShowingPosterposition,
} from '../../modules/posterposition';

type Result = {
  id: string;
  title: string;
  overview: string;
  voteAverage: number;
  posterPath: string;
};

interface PosterListProps {
  title: string;
  result: Result[];
  listNumber: { start: number; end: number };
}
const PosterList = ({ title, result, listNumber }: PosterListProps) => {
  const [start, setstart] = useState(listNumber.start);
  const [end, setend] = useState(listNumber.end);
  const dispatch = useDispatch();

  const prevpage = () => {
    setstart((start) => start - 5);
    setend((end) => end - 5);
    if (title === '현재상영중') {
      dispatch(getNowShowingPosterposition({ start: start - 5, end: end - 5 }));
    } else {
      dispatch(getNowCommingPosterposition({ start: start - 5, end: end - 5 }));
    }
  };
  //이전페이지로 이동한뒤, 이동을 리덕스에 저장한다.

  const nextpage = () => {
    setstart((start) => start + 5);
    setend((end) => end + 5);
    if (title === '현재상영중') {
      dispatch(getNowShowingPosterposition({ start: start + 5, end: end + 5 }));
    } else {
      dispatch(getNowCommingPosterposition({ start: start + 5, end: end + 5 }));
    }
  };
  //이후 페이지로 이동한뒤 이동을 리덕스에 저장한다.

  return (
    <PosterListBlock>
      <TitleBlock>
        <Title>{title}</Title>
      </TitleBlock>
      <PostersBlock>
        {
          start === 0 ? (
            <NullButton />
          ) : (
            <PageprevButton onClick={prevpage} />
          ) /*이전으로 넘길수 없으면 빈박스만 렌더링하고 버튼을 누르면 start와 end값에 5를 뺀다*/
        }
        {
          result[0].title === 'default'
            ? result.map((data, index) => {
                return (
                  <NullPosterBlock key={index}>
                    <MovieImg src={nullmovie} alt="x" />
                  </NullPosterBlock>
                );
              })
            : result.slice(start, end).map((data, index) => {
                return (
                  <PosterBlock to={`/moviedetail/${data.id}`} key={index}>
                    <MovieImg
                      src={`https://image.tmdb.org/t/p/w500${data.posterPath}`}
                      alt="x"
                    ></MovieImg>
                    <MovieInfo className="movieinfo">
                      {data.overview.length > 170
                        ? data.overview.substring(0, 170) + '...'
                        : data.overview}
                    </MovieInfo>
                    <MovieRating className="rating">
                      평점 {data.voteAverage}
                    </MovieRating>
                    <MoiveName className="moviename">
                      {data.title.length > 12
                        ? data.title.substring(0, 12) + '...'
                        : data.title}
                    </MoiveName>
                  </PosterBlock>
                );
              }) /*주어진 start,end범위에 따라 포스터에 마우스를 올리면 요약정보를 보여주는 포스터들 5개를 렌더링 */
        }
        {
          end === result.length ? (
            <NullButton />
          ) : (
            <PagenextButton onClick={nextpage} />
          ) /*이후로 넘길수 없으면 빈박스만 렌더링하고 버튼을 누르면 start와 end값에 5를 추가 */
        }
      </PostersBlock>
    </PosterListBlock>
  );
};

//이미지를 미리 로드해 두는 함수이다.

const PosterListBlock = styled.section`
  width: 100rem;
  height: 28rem;
  margin: auto;
  margin-top: 3rem;
  margin-bottom: 7rem;

  @media screen and (max-width: 500px) {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    width: 100%;
    height: 11rem;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
  width: 85rem;
  padding-left: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 50px;

  @media screen and (max-width: 500px) {
    width: 21rem;
    margin-bottom: 0;
    padding: 0;
    font-size: 15px;
  }
`;

const PostersBlock = styled.div`
  width: 100rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 500px) {
    width: 100%;
    height: 10rem;
  }
`;

const PosterBlock = styled(Link)`
  position: relative;
  top: 1rem;
  border-radius: 10px;
  color: inherit;
  text-decoration: none;
  @media (hover: hover) {
    &:hover {
      & > img {
        filter: brightness(20%);
      }
      & > .movieinfo {
        visibility: visible;
        color: white;
      }
    }
  }

  & + & {
    margin-left: 2rem;
  }
  @media screen and (max-width: 500px) {
    width: 4rem;
    height: 8rem;
    top: 0;
    & + & {
      margin-left: 0.3rem;
    }
  }
`;

const NullPosterBlock = styled.div`
  position: relative;
  top: 1rem;
  border-radius: 10px;
  color: inherit;
  text-decoration: none;
  & + & {
    margin-left: 2rem;
  }

  @media screen and (max-width: 500px) {
    width: 4rem;
    height: 8rem;
    top: 0;
    & + & {
      margin-left: 0.3rem;
    }
  }
`;

const MovieImg = styled.img`
  border-radius: inherit;
  width: 15rem;
  height: 20rem;
  @media screen and (max-width: 500px) {
    width: 4rem;
    height: 7rem;
  }
`;

const MovieInfo = styled.div`
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
  line-height: 1.5;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const MovieRating = styled.div`
  position: absolute;
  font-size: 20px;
  font-weight: bold;
  top: 17rem;
  color: white;
  width: 100%;
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 10px 10px;
  @media screen and (max-width: 500px) {
    display:none;
`;

const MoiveName = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

const PagenextButton = styled(FiChevronRight)`
  width: 3rem;
  height: 3rem;
  &:hover {
    color: gray;
  }
  @media screen and (max-width: 500px) {
    position: relative;
    width: 1rem;
    height: 1rem;
    bottom: 0.5rem;
  }
`;

const PageprevButton = styled(FiChevronLeft)`
  width: 3rem;
  height: 3rem;
  &:hover {
    color: gray;
  }
  @media screen and (max-width: 500px) {
    position: relative;
    width: 1rem;
    height: 1rem;
    bottom: 0.5rem;
  }
`;

const NullButton = styled.div`
  width: 3rem;
  height: 3rem;
  @media screen and (max-width: 500px) {
    width: 1rem;
    height: 1rem;
  }
`;

export default PosterList;
