import ReactPlayer from 'react-player/lazy';
import { HomePosterState } from '../../../store/homePoster/Reducer';
import styles from './Style';
interface MovieVideoProps {
  moviekey: HomePosterState;
}

const MovieVideoPresentational = ({ moviekey }: MovieVideoProps) => {
  if (moviekey.loading) {
    return <styles.Loading />;
  } else if (moviekey.error) {
    return (
      <styles.Error>
        <styles.ErrorMessage>에러가 발생하였습니다</styles.ErrorMessage>
      </styles.Error>
    );
  } else {
    return (
      <styles.MainBlock>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${moviekey.content.posterList?.key}`}
          loop={true}
          controls={true}
          playing={true}
          muted={true}
          width={'100%'}
          height={'100%'}
        />
      </styles.MainBlock>
    );
  }
};

export default MovieVideoPresentational;
