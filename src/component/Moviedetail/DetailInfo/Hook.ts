/*eslint-disable*/
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReducerType } from '../../../store';
import {
  addFavoriteMovie,
  deleteFavoriteMovie,
} from '../../../store/favoriteMovie/Reducer';

const useDetailInfo = () => {
  const movieDetailData = useSelector(
    (state: ReducerType) => state.movieDetail
  );
  const likemovie = useSelector((state: ReducerType) => state.favoriteMovie);
  const user = useSelector((state: ReducerType) => state.user);

  const [favorite, setfavorite] = useState(false);
  const [index, setIndex] = useState(-1);
  const [id, setId] = useState<number>();
  const dispatch = useDispatch();
  const { movieid } = useParams<'movieid'>();
  const notundefinedMovieId = movieid || 'default';
  useEffect(() => {
    if (likemovie.content !== undefined) {
      const filterlikemovie = likemovie.content.filter((movieInfo, index) => {
        if (movieInfo.movieId === movieid) {
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

  return {
    movieDetailData,
    favoriteSetting,
    favorite,
    user,
    id,
    index,
  };
};

export default useDetailInfo;
