import ReactPlayer from 'react-player/lazy';
import styles from './Style';
interface MovieVideoProps {
  moviekey: string | null;
}

const MovieVideo = ({ moviekey }: MovieVideoProps) => {
  return (
    <styles.MainBlock>
      {moviekey === 'default' ? (
        <styles.Loading />
      ) : (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${moviekey}`}
          loop={true}
          controls={true}
          playing={true}
          muted={true}
          width={'100%'}
          height={'100%'}
        />
      )}
    </styles.MainBlock>
  );
};

export default MovieVideo;
