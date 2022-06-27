import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { css } from 'styled-components';

const MainBlock = styled.nav<{ active: string }>`
  width: 100%;
  height: 4rem;
  @media screen and (max-width: 500px) {
    height: 3rem;
  }

  ${(props) =>
    props.active === 'true' &&
    css`
      border-bottom: 1px solid #e8e8e8;
    `}
`;

const MenuListBlock = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding-left: 0;
  margin: 0;
`;

const MenuBlock = styled.li`
  background-color: transparent;
  font-weight: bold;
  font-size: 25px;
  margin-top: 1rem;
  flex-basis: 25%;
  text-align: center;

  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const Menu = styled(Link)<{ active: string }>`
  display: block;
  text-decoration: none;
  width: 100%;
  height: 3rem;
  color: gray;
  &:hover {
    color: black;
    border-bottom: 3px solid black;
  }

  ${(props) =>
    props.active === 'true' &&
    css`
      color: black;
      border-bottom: 3px solid black;
    `}

  @media screen and (max-width: 500px) {
    height: 2rem;
  }
`;

const styles = { MainBlock, MenuListBlock, MenuBlock, Menu };

export default styles;
