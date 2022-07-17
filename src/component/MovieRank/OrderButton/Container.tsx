import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../../store';
import { setRankType } from '../../../store/movieRank/Reducer';
import OrderButtonPresentational from './Presentational';

const OrderButtonContainer = () => {
  const orderType = useSelector(
    (state: ReducerType) => state.movieRank.content.type
  );
  const dispatch = useDispatch();
  const orderchange = (Type: string) => {
    dispatch(setRankType(Type));
  };
  return (
    <OrderButtonPresentational
      orderchange={orderchange}
      orderType={orderType}
    />
  );
};

export default OrderButtonContainer;
