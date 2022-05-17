/*eslint-disable*/
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import NullComponent from '../common/NullComponent';

type serverType = {
  id?: string;
  movieId?: string;
  movieName?: string;
  posterPath?: string;
};

interface FavoriteMovieProps {
  likeMovies: serverType[];
  dragStart: (e: any) => void;
  dragEnd: (e: any) => void;
  dragOver: (e: any) => void;
  dropLeave: (e: any) => void;
  dropPoster: (e: any) => void;
  deleteBox: boolean;
  boxOver: string;
}

const FavoriteMovie = ({
  likeMovies,
  dragEnd,
  dragOver,
  dragStart,
  dropLeave,
  dropPoster,
  deleteBox,
  boxOver,
}: FavoriteMovieProps) => {
  const [end, setEnd] = useState(10);
  const [ref, inView] = useInView(); //무한스크롤 훅

  useEffect(() => {
    if (inView) {
      if (likeMovies.length > end) {
        if (likeMovies.length < end + 10) {
          setEnd(likeMovies.length);
        } else {
          setEnd((end) => end + 10);
        }
      }
    }
  }, [inView]);
  // 즐겨찾기 항목의 무한 슬라이드 구현을위해 작성한 코드입니다. 10번째 항목이 화면에 보여질때 마다 항목이 10개씩 추가됩니다.

  useEffect(() => {
    if (likeMovies[0] !== undefined) {
      if (
        likeMovies[0].id !== 'default' &&
        likeMovies.length < 10 &&
        likeMovies.length !== 0
      ) {
        setEnd(likeMovies.length);
      }
    }
  }, [likeMovies]);
  // 처음 렌더링시 항목이 10개보다 작을경우에 end의 초기값을 재설정하기위한 코드입니다.

  return likeMovies[0] === undefined || likeMovies[0].id === 'default' ? (
    <NullComponent text={'저장된 즐겨찾기가 없습니다.'} />
  ) : (
    <FavoriteMovieBlock>
      <ContentBlock>
        {likeMovies.slice(0, end).map((data, index) => {
          return (
            <Content
              ref={(index + 1) % 10 === 0 ? ref : null}
              key={data.id}
              to={`/moviedetail/${data.movieId}`}
              name={index}
              draggable
              onDragStart={dragStart}
              onDragEnd={dragEnd}
            >
              <MovieImg
                src={`https://image.tmdb.org/t/p/w500${data.posterPath}`}
                alt=""
              ></MovieImg>
              <Moviename>{data.movieName}</Moviename>
            </Content>
          );
        })}
      </ContentBlock>
      <DeleteBox
        active={deleteBox}
        draggable
        onDrop={dropPoster}
        onDragOver={dragOver}
        Content={boxOver}
        onDragLeave={dropLeave}
      >
        삭제하세요
      </DeleteBox>
    </FavoriteMovieBlock>
  );
};

export default FavoriteMovie;

const FavoriteMovieBlock = styled.div`
  background: ${(props) => props.theme.background};
  width: 100%;
`;

const ContentBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  width: 73rem;
  display: flex;
  flex-wrap: wrap;
  margin: auto;

  @media screen and (max-width: 500px) {
    width: 23rem;
  }
`;

const Content = styled(Link)<{ name: number }>`
  margin-left: 2rem;
  margin-bottom: 3rem;
  color: inherit;
  text-decoration: none;
  width: 13rem;
  height: 19rem;

  @media screen and (max-width: 500px) {
    width: 5rem;
    height: 10rem;
    margin: 0;
    margin-left: 0.5rem;
    margin-bottom: 1rem;
  }
  ${(props) =>
    props.name % 5 === 0 &&
    css`
      margin-left: 0;
    `}
`;

const MovieImg = styled.img`
  width: 13rem;
  height: 18rem;
  border-radius: 10px;

  @media screen and (max-width: 500px) {
    width: 5rem;
    height: 8rem;
  }
`;

const Moviename = styled.div`
  width: 13rem;
  height: 1rem;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-top: 0.5rem;

  @media screen and (max-width: 500px) {
    width: 5rem;
    font-size: 10px;
    height: 2rem;
  }
`;

const DeleteBox = styled.div<{ active: boolean; Content: string }>`
  display: none;
  ${(props) =>
    props.active &&
    css`
      display: block;
      position: fixed;
      background: white;
      bottom: 0;
      width: 100%;
      height: 12rem;
      opacity: 0.3;
      border-radius: 10px;
      text-align: center;
      padding-top: 6rem;
      font-size: 100px;
    `}
  ${(props) =>
    props.Content === 'true' &&
    css`
      opacity: 0.7;
    `}
`;
