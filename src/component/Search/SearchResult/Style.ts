import { css } from 'styled-components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MainBlock = styled.div`
  background: ${(props) => props.theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;

const PosterBlock = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: black;
  margin-bottom: 2rem;
`;

const MovieImg = styled.img`
  width: 10rem;
  height: 15rem;
  @media screen and (max-width: 500px) {
    width: 6rem;
    height: 9rem;
  }
`;

const MovieInfoBlock = styled.div`
  width: 60rem;
  height: 13rem;
  margin-left: 3rem;
  padding: 0.5rem;
  @media screen and (max-width: 500px) {
    width: 13rem;
    height: 10rem;
    margin-left: 1.5rem;
  }
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 1rem;
  @media screen and (max-width: 500px) {
    font-size: 18px;
  }
`;

const MovieMoreInfoBlock = styled.div`
  display: flex;
  font-size: 20px;
  margin-bottom: 0.5rem;
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const InfoTitle = styled.div`
  font-weight: 550;
`;

const InfoContent = styled.div`
  margin-left: 1rem;
`;

const PagenationBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
`;
const PageButton = styled.div<{ active: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.active &&
    css`
      background: gray;
    `}
`;

const MovePage = styled.div<{ active: string }>`
  display: inline;
  ${(props) =>
    props.active === 'true' &&
    css`
      display: none;
    `}
`;

const styles = {
  MainBlock,
  PosterBlock,
  MovieImg,
  MovieInfoBlock,
  Title,
  MovieMoreInfoBlock,
  InfoTitle,
  InfoContent,
  PagenationBlock,
  PageButton,
  MovePage,
};

export default styles;
