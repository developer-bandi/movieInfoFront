import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface HeaderProps {
  nick?: string;
  logout?: () => void;
}

const Header = ({ nick, logout }: HeaderProps) => {
  return (
    <HeaderBlock>
      <Title>오늘의 영화</Title>
      <UserInfoBlock>
        {nick ? (
          <>
            <LoginUser>{nick}</LoginUser>님 반갑습니다
            <LoginoutButton onClick={logout}>로그아웃</LoginoutButton>
          </>
        ) : (
          <LoginoutButton>
            <Link to={'/signin'}>로그인</Link>
          </LoginoutButton>
        )}
      </UserInfoBlock>
    </HeaderBlock>
  );
};

const HeaderBlock = styled.header`
  height: 5rem;
  border-bottom: 2px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin-left: 1rem;
  @media screen and (max-width: 500px) {
    font-size: 25px;
  }
`;

const UserInfoBlock = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
`;

const LoginoutButton = styled.button`
  background: white;
  border: none;
  border: 1px solid black;
  border-radius: 3px;
  padding: 5px;
  margin-left: 1rem;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

const LoginUser = styled.div`
  margin-right: 5px;
  font-size: 20px;
  font-weight: bold;
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

export default Header;
