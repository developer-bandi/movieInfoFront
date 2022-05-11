import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { css } from 'styled-components';

const Header = () => {
  const location = useLocation();
  const [templocation, setTempLocation] = useState(location.pathname);
  return (
    <HeaderBlock active={location.pathname === '/' ? 'false' : 'true'}>
      <NavBlock>
        <UlBlock>
          {menulist.map((data, index) => {
            return (
              <LiBlock key={menulinklist[index]}>
                <Content
                  active={
                    templocation === menulinklist[index] ? 'true' : 'false'
                  }
                  to={menulinklist[index]}
                  onMouseOver={() => {
                    setTempLocation(menulinklist[index]);
                  }}
                  onMouseOut={() => {
                    setTempLocation(location.pathname);
                  }}
                >
                  {data}
                </Content>
              </LiBlock>
            );
          })}
        </UlBlock>
      </NavBlock>
    </HeaderBlock>
  );
};

const HeaderBlock = styled.header<{ active: string }>`
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

const NavBlock = styled.nav``;

const UlBlock = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding-left: 0;
  margin: 0;
`;

const LiBlock = styled.li`
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

const Content = styled(Link)<{ active: string }>`
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

const menulist: string[] = ['홈', '랭킹', '영화검색', '나만의 영화'];
const menulinklist: string[] = ['/', '/sortedmovie', '/search', '/favorites'];

export default Header;
