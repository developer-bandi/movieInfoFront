import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../../store';
import { doLogout } from '../../../store/user/Reducer';
import Header from './Presentational';

const HeaderContainer = () => {
  const loginUser = useSelector((state: ReducerType) => state.user);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(doLogout());
  };
  if (loginUser.content !== undefined) {
    return <Header nick={loginUser.content.nick} logout={logout} />;
  } else {
    return <Header />;
  }
};

export default HeaderContainer;
