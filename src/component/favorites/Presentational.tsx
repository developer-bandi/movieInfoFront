/*eslint-disable*/
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FavoriteMovieApiData } from '../../types/apiType/favoriteMovie';
import NullComponent from '../common/Error/Presentational';
import styles from './Style';

type serverType = {
  id?: string;
  movieId?: string;
  movieName?: string;
  posterPath?: string;
};

interface FavoriteMovieProps {
  likeMovies: FavoriteMovieApiData | undefined;
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
    if (likeMovies !== undefined) {
      if (inView) {
        if (likeMovies.length > end) {
          if (likeMovies.length < end + 10) {
            setEnd(likeMovies.length);
          } else {
            setEnd((end) => end + 10);
          }
        }
      }
    }
  }, [inView]);
  // 즐겨찾기 항목의 무한 슬라이드 구현을위해 작성한 코드입니다. 10번째 항목이 화면에 보여질때 마다 항목이 10개씩 추가됩니다.

  useEffect(() => {
    if (likeMovies !== undefined) {
      if (likeMovies[0] !== undefined) {
        if (likeMovies.length < 10 && likeMovies.length !== 0) {
          setEnd(likeMovies.length);
        }
      }
    }
  }, [likeMovies]);
  // 처음 렌더링시 항목이 10개보다 작을경우에 end의 초기값을 재설정하기위한 코드입니다.

  return likeMovies === undefined ? (
    <NullComponent text={'저장된 즐겨찾기가 없습니다.'} />
  ) : (
    <styles.MainBlock>
      <styles.PosterListBlock>
        {likeMovies.slice(0, end).map((data, index) => {
          return (
            <styles.PosterBlock
              ref={(index + 1) % 10 === 0 ? ref : null}
              key={data.id}
              to={`/moviedetail/${data.movieId}`}
              name={index}
              draggable
              onDragStart={dragStart}
              onDragEnd={dragEnd}
            >
              <styles.MovieImg
                src={`https://image.tmdb.org/t/p/w500${data.posterPath}`}
                alt=""
              ></styles.MovieImg>
              <styles.Moviename>{data.movieName}</styles.Moviename>
            </styles.PosterBlock>
          );
        })}
      </styles.PosterListBlock>
      <styles.DeleteBox
        active={deleteBox}
        draggable
        onDrop={dropPoster}
        onDragOver={dragOver}
        Content={boxOver}
        onDragLeave={dropLeave}
      >
        삭제하세요
      </styles.DeleteBox>
    </styles.MainBlock>
  );
};

export default FavoriteMovie;
