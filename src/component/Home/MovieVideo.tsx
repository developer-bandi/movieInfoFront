import ReactPlayer from 'react-player/lazy';
import styled from 'styled-components';

interface MovieVideoProps {
  moviekey: string | null;
}

const MovieVideo = ({ moviekey }: MovieVideoProps) => {
  return (
    <ReactPlayerBlock>
      {moviekey === 'default' ? (
        <Loading />
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
    </ReactPlayerBlock>
  );
};

const ReactPlayerBlock = styled.section`
  height: 35rem;
  @media screen and (max-width: 500px) {
    height: 15rem;
  }
`;

const Loading = styled.div`
  background: black;
  height: 35rem;
  width: 100%;

  @media screen and (max-width: 500px) {
    height: 15rem;
  }
`;

export default MovieVideo;
