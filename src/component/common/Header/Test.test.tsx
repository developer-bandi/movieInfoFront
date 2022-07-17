import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Presentational';
import { MemoryRouter } from 'react-router-dom';
/// <reference types="@types/jest" />;
describe('Header Presentational', () => {
  it('로그인 하지 않았을 경우', () => {
    const utils = render(
      <Header userInfo={{ loading: false, error: false }} logout={jest.fn()} />,
      { wrapper: MemoryRouter }
    );
    expect(utils.container).toMatchSnapshot();
  });
  it('로그인 했을경우', () => {
    const logoutMockFn = jest.fn();
    const utils = render(
      <Header
        userInfo={{
          content: { id: 1, userid: 'test', nick: 'testname' },
          loading: false,
          error: false,
        }}
        logout={logoutMockFn}
      />,
      { wrapper: MemoryRouter }
    );
    fireEvent.click(screen.getByText('로그아웃'));
    expect(logoutMockFn).toBeCalledTimes(1);
    expect(utils.container).toMatchSnapshot();
  });
});
