import FavoriteMoviePresentational from './Presentational';
import useFavoriteHook from './Hook';

const FavoriteMovieContainer = () => {
  const {
    likeMovies,
    dragStart,
    dragEnd,
    dragOver,
    dropLeave,
    dropPoster,
    deleteBox,
    boxOver,
    end,
    viewRef,
  } = useFavoriteHook();

  return (
    <FavoriteMoviePresentational
      dragStart={dragStart}
      dragEnd={dragEnd}
      dragOver={dragOver}
      dropLeave={dropLeave}
      dropPoster={dropPoster}
      likeMovies={likeMovies}
      deleteBox={deleteBox}
      boxOver={boxOver}
      end={end}
      viewRef={viewRef}
    />
  );
};

export default FavoriteMovieContainer;
