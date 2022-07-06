import { Link } from 'react-router-dom';
import { UserState } from '../../../store/user/Reducer';
import styles from './Style';

interface HeaderProps {
  userInfo: UserState;
  logout: () => void;
}

const Header = ({ userInfo, logout }: HeaderProps) => {
  return (
    <styles.MainBlock>
      <styles.Title>오늘의 영화</styles.Title>
      <styles.UserInfoBlock>
        {userInfo.content !== undefined ? (
          <>
            <styles.Nickname>{userInfo.content?.nick}</styles.Nickname>님
            반갑습니다
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
