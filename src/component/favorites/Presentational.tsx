import { FavoriteMovieState } from '../../store/favoriteMovie/Reducer';
import NullComponent from '../common/Error/Presentational';
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
  ref: (node?: Element | null | undefined) => void;
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
  end,
  ref,
}: FavoriteMovieProps) => {
  if (likeMovies.content === undefined) {
    return <NullComponent text={'로그인을 진행해주세요'} />;
  } else if (likeMovies.content.length === 0) {
    return <NullComponent text={'저장한 영화가 없습니다'} />;
  } else if (likeMovies.error) {
    return <NullComponent text={'오류가 발생하였습니다'} />;
  } else {
    return (
      <styles.MainBlock>
        <styles.PosterListBlock>
          {likeMovies.content.slice(0, end).map((data, index) => {
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
  }
};

export default FavoriteMovie;
