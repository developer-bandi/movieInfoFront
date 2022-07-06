import styles from './Style';

interface OrderButtonProps {
  orderchange: (Type: string) => void;
  orderType: string;
}

const OrderButton = ({ orderType, orderchange }: OrderButtonProps) => {
  return (
    <styles.OrderButtonBlock>
      <styles.OrderButtonSubBlock>
        <styles.OrderButton
          onClick={() => orderchange('인기순')}
          active={orderType === 'popular'}
        >
          인기순
        </styles.OrderButton>
        <styles.OrderButton
          onClick={() => orderchange('별점순')}
          active={orderType === 'topRated'}
        >
          별점순
        </styles.OrderButton>
      </styles.OrderButtonSubBlock>
    </styles.OrderButtonBlock>
  );
};

export default OrderButton;
