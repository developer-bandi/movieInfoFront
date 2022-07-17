import { FavoriteMovieState } from '../../store/favoriteMovie/Reducer';
import Except from '../common/Except/Presentational';
import styles from './Style';

interface FavoriteMovieProps {
  dragStart: React.DragEventHandler<HTMLAnchorElement>;
  dragEnd: React.DragEventHandler<HTMLAnchorElement>;
  dragOver: React.DragEventHandler<HTMLDivElement>;
  dropLeave: React.DragEventHandler<HTMLDivElement>;
  dropPoster: React.DragEventHandler<HTMLDivElement>;
  likeMovies: FavoriteMovieState;
  deleteBox: boolean;
  boxOver: string;
  end: number;
  viewRef: (node?: Element | null | undefined) => void;
}

const FavoriteMoviePresentational = ({
  likeMovies,
  dragEnd,
  dragOver,
  dragStart,
  dropLeave,
  dropPoster,
  deleteBox,
  boxOver,
  end,
  viewRef,
}: FavoriteMovieProps) => {
  if (likeMovies.error) {
    return <Except text={'오류가 발생하였습니다'} />;
  } else if (likeMovies.content === undefined) {
    return <Except text={'로그인을 진행해주세요'} />;
  } else if (likeMovies.content.length === 0) {
    return <Except text={'저장된 영화가 없습니다'} />;
  } else {
    return (
      <styles.MainBlock>
        <styles.PosterListBlock>
          {likeMovies.content.slice(0, end).map((data, index) => {
            return (
              <styles.PosterBlock
                ref={(index + 1) % 10 === 0 ? viewRef : null}
                key={data.id}
                to={`/moviedetail/${data.movieId}`}
                name={index}
                draggable
                onDragStart={dragStart}
                onDragEnd={dragEnd}
              >
                <styles.MovieImg
                  src={`https://image.tmdb.org/t/p/w500${data.posterPath}`}
                  alt="poster"
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
  }
};

export default FavoriteMoviePresentational;
