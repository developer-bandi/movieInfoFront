import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import useSignIn from './Hook';
import SignIn from './Presentational';

describe('SignIn Presentational', () => {
  it('전체 화면 체크', () => {
    const setIdMock = jest.fn();
    const setPassword = jest.fn();
    const checkLogin = jest.fn();
    const utils = render(
      <SignIn
        setId={setIdMock}
        setPassword={setPassword}
        checkLogin={checkLogin}
      />,
      { wrapper: MemoryRouter }
    );
    expect(utils.container).toMatchSnapshot();
    fireEvent.change(screen.getByPlaceholderText('아이디'), {
      target: { value: 'new value' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'new value' },
    });
    fireEvent.click(screen.getByTestId('login'));
    expect(setIdMock).toBeCalledTimes(1);
    expect(setPassword).toBeCalledTimes(1);
    expect(checkLogin).toBeCalledTimes(1);
  });
});

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SignIn Hook', () => {
  window.alert = jest.fn();
  afterEach(cleanup);
  describe('checkLogin함수 테스트', () => {
    it('에러 발생', async () => {
      const { result } = renderHook(() => useSignIn(), {
        wrapper: MemoryRouter,
      });

      mockedAxios.post.mockImplementation(() =>
        Promise.reject({ status: 500, data: '에러발생' })
      );
      act(() => {
        result.current.setId('testid');
        result.current.setPassword('testpassword');
      });
      await act(async () => {
        await result.current.checkLogin();
      });

      expect(window.alert).toBeCalledWith('서버에 에러가 발생하였습니다');
      expect(window.alert).toBeCalledTimes(1);
    });
    it('로그인 성공', async () => {
      const { result } = renderHook(() => useSignIn(), {
        wrapper: MemoryRouter,
      });
      mockedAxios.post.mockImplementation(() =>
        Promise.resolve({ status: 200, data: { userInfo: {} } })
      );
      act(() => {
        result.current.setId('testid');
        result.current.setPassword('testpassword');
      });
      await act(async () => {
        await result.current.checkLogin();
      });
      expect(window.alert).toBeCalledWith('로그인에 성공하였습니다!');
    });
    it('로그인 실패', async () => {
      const { result } = renderHook(() => useSignIn(), {
        wrapper: MemoryRouter,
      });
      mockedAxios.post.mockImplementation(() =>
        Promise.resolve({ status: 202, data: '로그인 실패' })
      );
      act(() => {
        result.current.setId('testid');
        result.current.setPassword('testpassword');
      });
      await act(async () => {
        await result.current.checkLogin();
      });
      expect(window.alert).toBeCalledWith('로그인 실패');
    });
  });
});
