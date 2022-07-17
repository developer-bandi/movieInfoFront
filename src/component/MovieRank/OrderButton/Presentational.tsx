import styles from './Style';

interface OrderButtonProps {
  orderchange: (Type: string) => void;
  orderType: string;
}

const OrderButtonPresentational = ({
  orderType,
  orderchange,
}: OrderButtonProps) => {
  return (
    <styles.OrderButtonBlock>
      <styles.OrderButtonSubBlock>
        <styles.OrderButton
          data-testid={'popularOrderButton'}
          onClick={() => orderchange('popular')}
          active={orderType === 'popular'}
        >
          인기순
        </styles.OrderButton>
        <styles.OrderButton
          data-testid={'topRatedOrderButton'}
          onClick={() => orderchange('topRated')}
          active={orderType === 'topRated'}
        >
          별점순
        </styles.OrderButton>
      </styles.OrderButtonSubBlock>
    </styles.OrderButtonBlock>
  );
};

export default OrderButtonPresentational;
