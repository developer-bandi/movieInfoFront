import styled from 'styled-components';
import { css } from 'styled-components';

const OrderButtonBlock = styled.div`
  width: 83rem;
  height: 2rem;
  margin: auto;
  display: flex;
  justify-content: end;
  margin-bottom: 2rem;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    width: 22rem;
  }
`;
const OrderButtonSubBlock = styled.div`
  border: 3px solid black;
  width: 8rem;
  height: 2rem;
  border-radius: 5px;
  display: flex;
  @media screen and (max-width: 500px) {
    width: 5rem;
  }
`;
const OrderButton = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  width: 4rem;
  align-items: center;
  font-size: 20px;
  font-weight: bold;

  @media screen and (max-width: 500px) {
    font-size: 12px;
    margin: 0;
    width: 2.5rem;
  }

  ${(props) =>
    props.active &&
    css`
      background: black;
      color: white;
    `}
`;

const styles = {
  OrderButtonBlock,
  OrderButtonSubBlock,
  OrderButton,
};

export default styles;
