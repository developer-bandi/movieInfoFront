import { useDispatch, useSelector } from 'react-redux';
import Header from '../component/common/Header';
import { RootState } from '../modules';
import { doLogout } from '../modules/user';

const HeaderContainer = () => {
  const loginUser = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(doLogout());
  };
  if (loginUser.login) {
    return <Header nick={loginUser.nick} logout={logout} />;
  } else {
    return <Header />;
  }
};

export default HeaderContainer;
