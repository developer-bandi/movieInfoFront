import { Link } from 'react-router-dom';
import styles from './Style';

interface HeaderProps {
  nick?: string;
  logout?: () => void;
}

const Header = ({ nick, logout }: HeaderProps) => {
  return (
    <styles.MainBlock>
      <styles.Title>오늘의 영화</styles.Title>
      <styles.UserInfoBlock>
        {nick ? (
          <>
            <styles.Nickname>{nick}</styles.Nickname>님 반갑습니다
            <styles.Button onClick={logout}>로그아웃</styles.Button>
          </>
        ) : (
          <styles.Button>
            <Link to={'/signin'}>로그인</Link>
          </styles.Button>
        )}
      </styles.UserInfoBlock>
    </styles.MainBlock>
  );
};

export default Header;
