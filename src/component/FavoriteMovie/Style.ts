import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const MainBlock = styled.div`
  background: ${(props) => props.theme.background};
  width: 100%;
`;

const PosterListBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  width: 73rem;
  display: flex;
  flex-wrap: wrap;
  margin: auto;

  @media screen and (max-width: 500px) {
    width: 23rem;
  }
`;

const PosterBlock = styled(Link)<{ name: number }>`
  margin-left: 2rem;
  margin-bottom: 3rem;
  color: inherit;
  text-decoration: none;
  width: 13rem;
  height: 19rem;

  @media screen and (max-width: 500px) {
    width: 5rem;
    height: 10rem;
    margin: 0;
    margin-left: 0.5rem;
    margin-bottom: 1rem;
  }
  ${(props) =>
    props.name % 5 === 0 &&
    css`
      margin-left: 0;
    `}
`;

const MovieImg = styled.img`
  width: 13rem;
  height: 18rem;
  border-radius: 10px;

  @media screen and (max-width: 500px) {
    width: 5rem;
    height: 8rem;
  }
`;

const Moviename = styled.div`
  width: 13rem;
  height: 1rem;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-top: 0.5rem;

  @media screen and (max-width: 500px) {
    width: 5rem;
    font-size: 10px;
    height: 2rem;
  }
`;

const DeleteBox = styled.div<{ active: boolean; Content: string }>`
  display: none;
  ${(props) =>
    props.active &&
    css`
      display: block;
      position: fixed;
      background: white;
      bottom: 0;
      width: 100%;
      height: 12rem;
      opacity: 0.3;
      border-radius: 10px;
      text-align: center;
      padding-top: 6rem;
      font-size: 100px;
    `}
  ${(props) =>
    props.Content === 'true' &&
    css`
      opacity: 0.7;
    `}
`;

const styles = {
  MainBlock,
  PosterListBlock,
  PosterBlock,
  MovieImg,
  Moviename,
  DeleteBox,
};

export default styles;
