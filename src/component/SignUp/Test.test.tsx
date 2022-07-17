import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import useSignUp from './Hook';
import SignUp from './Presentational';

describe('SignIn Presentational', () => {
  it('전체 화면 체크', () => {
    const setIdMock = jest.fn();
    const setPasswordMock = jest.fn();
    const setPasswordCheckMock = jest.fn();
    const setNicknameMock = jest.fn();
    const submitFormMock = jest.fn();
    const utils = render(
      <SignUp
        setId={setIdMock}
        setPassword={setPasswordMock}
        setPasswordCheck={setPasswordCheckMock}
        setNickname={setNicknameMock}
        submitForm={submitFormMock}
      />,
      { wrapper: MemoryRouter }
    );
    expect(utils.container).toMatchSnapshot();
    fireEvent.change(screen.getByTestId('id'), {
      target: { value: 'new value' },
    });
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'new value' },
    });
    fireEvent.change(screen.getByTestId('passwordCheck'), {
      target: { value: 'new value' },
    });
    fireEvent.change(screen.getByTestId('nickname'), {
      target: { value: 'new value' },
    });
    fireEvent.click(screen.getByTestId('submitButton'));

    expect(utils.container).toMatchSnapshot();
    expect(setIdMock).toBeCalledTimes(1);
    expect(setPasswordMock).toBeCalledTimes(1);
    expect(setPasswordCheckMock).toBeCalledTimes(1);
    expect(setNicknameMock).toBeCalledTimes(1);
    expect(submitFormMock).toBeCalledTimes(1);
  });
});

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SignIn Hook', () => {
  afterEach(cleanup);
  window.alert = jest.fn();
  describe('checkLogin함수 테스트', () => {
    describe('아이디 입력 에러 발생', () => {
      it('아이디가 빈칸인 경우', async () => {
        window.confirm = jest.fn(() => true);
        const { result } = renderHook(() => useSignUp(), {
          wrapper: MemoryRouter,
        });

        await act(async () => {
          await result.current.submitForm();
        });
        expect(window.alert).toBeCalledWith('아이디를 정확히 입력하세요');
      });

      it('아이디의 길이가 10 이상인 경우', async () => {
        window.confirm = jest.fn(() => true);
        const { result } = renderHook(() => useSignUp(), {
          wrapper: MemoryRouter,
        });
        act(() => {
          result.current.setId('test1234567890');
        });
        await act(async () => {
          await result.current.submitForm();
        });
        expect(window.alert).toBeCalledWith('아이디를 정확히 입력하세요');
      });
    });

    describe('비밀번호 입력 에러 발생', () => {
      it('비밀번호가 빈칸인 경우', async () => {
        window.confirm = jest.fn(() => true);
        const { result } = renderHook(() => useSignUp(), {
          wrapper: MemoryRouter,
        });
        act(() => {
          result.current.setId('test');
        });
        await act(async () => {
          await result.current.submitForm();
        });
        expect(window.alert).toBeCalledWith('비밀번호를 정확히 입력하세요');
      });

      it('비밀번호 길이가 10 이상', async () => {
        window.confirm = jest.fn(() => true);
        const { result } = renderHook(() => useSignUp(), {
          wrapper: MemoryRouter,
        });
        act(() => {
          result.current.setId('test');
          result.current.setPassword('test1234567890');
        });
        await act(async () => {
          await result.current.submitForm();
        });
        expect(window.alert).toBeCalledWith('비밀번호를 정확히 입력하세요');
      });
    });

    it('비밀번호 확인 입력 에러 발생', async () => {
      window.confirm = jest.fn(() => true);
      const { result } = renderHook(() => useSignUp(), {
        wrapper: MemoryRouter,
      });
      act(() => {
        result.current.setId('test');
        result.current.setPassword('test');
        result.current.setPasswordCheck('notEqule');
      });
      await act(async () => {
        await result.current.submitForm();
      });
      expect(window.alert).toBeCalledWith(
        '확인 비밀번호가 일치하지 않습니다 다시 입력해주세요'
      );
    });
    describe('닉네임 입력 에러 발생', () => {
      it('닉네임이 빈칸인 경우', async () => {
        window.confirm = jest.fn(() => true);
        const { result } = renderHook(() => useSignUp(), {
          wrapper: MemoryRouter,
        });
        act(() => {
          result.current.setId('test');
          result.current.setPassword('test');
          result.current.setPasswordCheck('test');
        });

        await act(async () => {
          await result.current.submitForm();
        });
        expect(window.alert).toBeCalledWith('닉네임을 정확하게 입력하세요');
      });
      it('닉네임 길이가 5이상인 경우', async () => {
        window.confirm = jest.fn(() => true);
        const { result } = renderHook(() => useSignUp(), {
          wrapper: MemoryRouter,
        });
        act(() => {
          result.current.setId('test');
          result.current.setPassword('test');
          result.current.setPasswordCheck('test');
          result.current.setNickname('test1234');
        });
        await act(async () => {
          await result.current.submitForm();
        });
        expect(window.alert).toBeCalledWith('닉네임을 정확하게 입력하세요');
      });
    });

    describe('회원 가입 조건 부합', () => {
      it('회원가입 성공', async () => {
        window.confirm = jest.fn(() => true);
        mockedAxios.post.mockImplementation(() =>
          Promise.resolve({
            status: 200,
            data: '회원가입 성공',
          })
        );
        const { result } = renderHook(() => useSignUp(), {
          wrapper: MemoryRouter,
        });
        act(() => {
          result.current.setId('test');
          result.current.setPassword('test');
          result.current.setPasswordCheck('test');
          result.current.setNickname('test');
        });
        await act(async () => {
          await result.current.submitForm();
        });
        expect(window.alert).toBeCalledWith('회원가입에 성공하였습니다.');
      });
      it('회원가입 에러 발생으로 실패', async () => {
        window.confirm = jest.fn(() => true);
        mockedAxios.post.mockImplementation(() =>
          Promise.reject({
            status: 500,
            data: '회원가입 실패',
          })
        );
        const { result } = renderHook(() => useSignUp(), {
          wrapper: MemoryRouter,
        });
        act(() => {
          result.current.setId('test');
          result.current.setPassword('test');
          result.current.setPasswordCheck('test');
          result.current.setNickname('test');
        });
        await act(async () => {
          await result.current.submitForm();
        });
        expect(window.alert).toBeCalledWith('에러가 발생하였습니다');
      });
    });
  });
});
