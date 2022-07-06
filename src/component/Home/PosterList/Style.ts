import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MainBlock = styled.section`
  width: 89rem;
  height: 28rem;
  margin: auto;
  margin-top: 3rem;
  margin-bottom: 7rem;

  @media screen and (max-width: 500px) {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    width: 100%;
    height: 11rem;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  width: 89rem;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const Title = styled.h2`
  width: 89rem;
  padding-left: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 50px;

  @media screen and (max-width: 500px) {
    width: 100%;
    margin-bottom: 0;
    padding: 0;
    font-size: 15px;
    margin-left: 1rem;
  }
`;

const PosterListBlock = styled.div`
  width: 89rem;
  height: 20rem;
  display: flex;
  align-items: center;

  @media screen and (max-width: 500px) {
    width: 100%;
    height: 10rem;
  }
`;

const Error = styled.div`
  font-size: 40px;
  color: gray;
  margin: auto;
`;

const PosterBlock = styled(Link)`
  position: relative;
  top: 1rem;
  border-radius: 10px;
  color: inherit;
  text-decoration: none;
  @media (hover: hover) {
    &:hover {
      & > img {
        filter: brightness(20%);
      }
      & > .movieinfo {
        visibility: visible;
        color: white;
      }
    }
  }

  & + & {
    margin-left: 2rem;
  }
  @media screen and (max-width: 500px) {
    width: 4rem;
    height: 8rem;
    top: 0;
    & + & {
      margin-left: 0.3rem;
    }
  }
`;

const NullPosterBlock = styled.div`
  position: relative;
  top: 1rem;
  border-radius: 10px;
  color: inherit;
  text-decoration: none;
  & + & {
    margin-left: 2rem;
  }

  @media screen and (max-width: 500px) {
    width: 4rem;
    height: 8rem;
    top: 0;
    & + & {
      margin-left: 0.3rem;
    }
  }
`;

const MovieImg = styled.img`
  border-radius: inherit;
  width: 15rem;
  height: 20rem;
  @media screen and (max-width: 500px) {
    width: 4rem;
    height: 7rem;
  }
`;

const MovieInfo = styled.div`
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
  line-height: 1.5;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const MovieRating = styled.div`
  position: absolute;
  font-size: 20px;
  font-weight: bold;
  top: 17rem;
  color: white;
  width: 100%;
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 10px 10px;
  @media screen and (max-width: 500px) {
    display:none;
`;

const MoiveName = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

const PageButton = styled.div`
  width: 3rem;
  height: 3rem;
  &:hover {
    color: gray;
  }
  @media screen and (max-width: 500px) {
    position: relative;
    width: 1rem;
    height: 1rem;
    bottom: 0.5rem;
  }
`;

const NullButton = styled.div`
  width: 3rem;
  height: 3rem;
  @media screen and (max-width: 500px) {
    width: 1rem;
    height: 1rem;
  }
`;

const styles = {
  MainBlock,
  MoiveName,
  MovieImg,
  MovieInfo,
  MovieRating,
  NullButton,
  NullPosterBlock,
  PageButton,
  PosterBlock,
  PosterListBlock,
  Error,
  Title,
  TitleBlock,
};

export default styles;
