import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../../store';
import { doLogout } from '../../../store/user/Reducer';
import HeaderPresentational from './Presentational';

const HeaderContainer = () => {
  const userInfo = useSelector((state: ReducerType) => state.user);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(doLogout());
  };

  return <HeaderPresentational userInfo={userInfo} logout={logout} />;
};

export default HeaderContainer;
