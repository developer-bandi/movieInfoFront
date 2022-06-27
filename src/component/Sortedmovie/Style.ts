import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { css } from 'styled-components';

const MainBlock = styled.div`
  padding-top: 5rem;
  width: 100%;
  background: ${(props) => props.theme.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 500px) {
    padding-top: 1.5rem;
  }
`;
const OrderButtonBlock = styled.div`
  width: 83rem;
  height: 2rem;
  margin: auto;
  display: flex;
  justify-content: end;
  margin-bottom: 1rem;
  @media screen and (max-width: 500px) {
    width: 22rem;
  }
`;
const OrderButtonSubBlock = styled.div`
  border: 3px solid black;
  width: 7rem;
  border-radius: 5px;
  display: flex;
  @media screen and (max-width: 500px) {
    width: 5rem;
  }
`;
const OrderButton = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  width: 3.5rem;
  align-items: center;
  font-size: 20px;
  font-weight: bold;

  @media screen and (max-width: 500px) {
    font-size: 12px;
    margin: 0;
    width: 2.5rem;
  }

  ${(props) =>
    props.active &&
    css`
      background: black;
      color: white;
    `}
`;

const PosterListBlock = styled.div`
  width: 87rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const PosterBlock = styled(Link)<{ active: number }>`
  width: 15rem;
  height: 28rem;
  margin-left: 1rem;
  position: relative;
  margin-bottom: 2rem;
  position: relative;
  border-radius: 10px;
  color: inherit;
  text-decoration: none;
  margin-left: 2rem;
  @media (hover: hover) {
    &:hover {
      & > img {
        filter: brightness(20%);
      }
      & > .movieinfo {
        visibility: visible;
        color: white;
      }
      & > .num {
        visibility: hidden;
      }
    }
  }

  ${(props) =>
    props.active % 5 === 0 &&
    css`
      margin-left: 0rem;
    `}

  @media screen and (max-width: 500px) {
    width: 5rem;
    height: 8rem;
    margin-left: 0.5rem;
    ${(props) =>
      props.active % 4 === 0 &&
      css`
        margin-left: 0rem;
      `}
  }
`;

const MovieImg = styled.img`
  width: 15rem;
  height: 25rem;
  border-radius: 10px;
  @media screen and (max-width: 500px) {
    width: 5rem;
    height: 7rem;
  }
`;

const MovieNum = styled.div`
  color: white;
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 30px;
  font-weight: bold;
  @media screen and (max-width: 500px) {
    font-size: 20px;
    top: 0.3rem;
    left: 0.3rem;
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
  top: 22rem;
  color: white;
  width: 100%;
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 10px 10px;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const MoiveName = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

const styles = {
  MainBlock,
  OrderButtonBlock,
  OrderButtonSubBlock,
  OrderButton,
  PosterListBlock,
  PosterBlock,
  MovieImg,
  MovieNum,
  MovieInfo,
  MovieRating,
  MoiveName,
};

export default styles;
