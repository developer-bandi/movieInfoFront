import { fireEvent, render, screen } from '@testing-library/react';
import OrderButton from './Presentational';

describe('OrderButton Presentational', () => {
  it('전체 화면 검증', () => {
    const orderchangeMock = jest.fn();
    const utils = render(
      <OrderButton orderchange={orderchangeMock} orderType={'popular'} />
    );
    expect(utils.container).toMatchSnapshot();
    fireEvent.click(screen.getByTestId('popularOrderButton'));
    fireEvent.click(screen.getByTestId('popularOrderButton'));
    expect(orderchangeMock).toBeCalledTimes(2);
  });
});
