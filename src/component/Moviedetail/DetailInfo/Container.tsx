/*eslint-disable*/
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReducerType } from '../../../store';
import {
  addFavoriteMovie,
  deleteFavoriteMovie,
} from '../../../store/favoriteMovie/Reducer';
import { initializeMovieDetail } from '../../../store/movieDetail/Reducer';
import MovieContent from './Presentational';

const MovieContentContainer = () => {
  const movieDetailData = useSelector(
    (state: ReducerType) => state.movieDetail
  );
  const likemovie = useSelector((state: ReducerType) => state.favoriteMovie);
  const user = useSelector((state: ReducerType) => state.user);
  const dispatch = useDispatch();
  const [favorite, setfavorite] = useState(false);
  const [index, setIndex] = useState(-1);
  const [id, setId] = useState<number>();
  const { movieid } = useParams<'movieid'>();
  const notundefinedMovieId = movieid || 'default';
  useEffect(() => {
    if (likemovie.content !== undefined) {
      const filterlikemovie = likemovie.content.filter((movieInfo, index) => {
        if (movieInfo.movieId == Number(movieid)) {
          setId(movieInfo.id);
          setIndex(index);
          return true;
        }
        return false;
      });
      if (filterlikemovie.length === 1) {
        setfavorite(true);
      } else {
        setfavorite(false);
      }
    }
  }, [likemovie]);

  useEffect(() => {
    return () => {
      dispatch(initializeMovieDetail());
    };
  }, []);

  const favoriteSetting = () => {
    if (favorite && id !== undefined) {
      dispatch(deleteFavoriteMovie({ id, index }));
      setId(undefined);
      setIndex(-1);
    } else {
      if (
        likemovie.content !== undefined &&
        movieDetailData.content !== undefined
      ) {
        dispatch(
          addFavoriteMovie({
            movieId: notundefinedMovieId,
            movieName: movieDetailData.content.title,
            posterPath: movieDetailData.content.posterPath,
          })
        );
      }
    }
  };
  //즐겨찾기되어있으면 로컬스토리지 배열과 state에서 삭제하고, 아니라면 로컬스토리 배열과 state에 추가합니다.
  return (
    <MovieContent
      movieDetailData={movieDetailData}
      favoriteSetting={favoriteSetting}
      favorite={favorite}
      user={user}
    />
  );
};

export default MovieContentContainer;
