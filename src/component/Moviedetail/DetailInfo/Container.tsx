/*eslint-disable*/
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MovieContent from './Presentational';
import { RootState } from '../../../modules';
import {
  addLikemovie,
  deleteLikemovie,
  initializeLikemovie,
} from '../../../modules/likemovie';
import { initializeMovieDetail } from '../../../modules/moviedetail';

const MovieContentContainer = () => {
  const data = useSelector((state: RootState) => state.movieDetailInfo);
  const user = useSelector((state: RootState) => state.userReducer);
  const likemovie = useSelector((state: RootState) => state.movieLikeReducer);
  const dispatch = useDispatch();
  const [favorite, setfavorite] = useState(false);
  const [index, setIndex] = useState(-1);
  const [id, setId] = useState('');
  const { movieid } = useParams<'movieid'>();
  const notundefinedMovieId = movieid || 'default';
  useEffect(() => {
    const filterlikemovie = likemovie.filter((value, index) => {
      if (value.movieId == movieid) {
        if (value.id !== undefined) {
          setId(value.id);
          setIndex(index);
        }
        return true;
      }
      return false;
    });

    if (filterlikemovie.length === 1) {
      setfavorite(true);
    } else {
      setfavorite(false);
    }
  }, [likemovie]);

  useEffect(() => {
    return () => {
      dispatch(initializeMovieDetail());
      dispatch(initializeLikemovie());
    };
  }, []);

  const favoriteSetting = () => {
    if (favorite) {
      dispatch(deleteLikemovie(id, index));
      setId('');
      setIndex(-1);
    } else {
      if (user.id !== undefined) {
        dispatch(
          addLikemovie(
            notundefinedMovieId,
            data.title,
            data.posterPath,
            user.id
          )
        );
      }
    }
  };
  //즐겨찾기되어있으면 로컬스토리지 배열과 state에서 삭제하고, 아니라면 로컬스토리 배열과 state에 추가합니다.
  return (
    <MovieContent
      data={data}
      user={user}
      favoriteSetting={favoriteSetting}
      favorite={favorite}
    />
  );
};

export default MovieContentContainer;
