import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../../store';
import { doLogout } from '../../../store/user/Reducer';
import Header from './Presentational';

const HeaderContainer = () => {
  const userInfo = useSelector((state: ReducerType) => state.user);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(doLogout());
  };

  return <Header userInfo={userInfo} logout={logout} />;
};

export default HeaderContainer;
