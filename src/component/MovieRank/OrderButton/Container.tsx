import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../../store';
import { setRankType } from '../../../store/movieRank/Reducer';
import OrderButton from './Presentational';

const OrderButtonContainer = () => {
  const orderType = useSelector(
    (state: ReducerType) => state.movieRank.content.type
  );
  const dispatch = useDispatch();
  const orderchange = (Type: string) => {
    dispatch(setRankType(Type));
  };
  return (
    <OrderButton orderchange={orderchange} orderType={orderType}></OrderButton>
  );
};

export default OrderButtonContainer;
