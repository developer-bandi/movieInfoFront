import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from './Presentational';
import { axiosPostLogin } from '../../lib/api';

const SignInContainer = () => {
  const [userid, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const checkLogin = async () => {
    if (userid !== '' && password !== '') {
      try {
        const userInfo = await axiosPostLogin({
          userid,
          password,
        });
        if (userInfo.status === 202) {
          alert(userInfo.data);
        } else {
          alert('로그인에 성공하였습니다!');
          navigate('/');
        }
      } catch (err) {
        alert('서버에 에러가 발생하였습니다');
      }
    }
  };

  return (
    <SignIn
      setId={setId}
      setPassword={setPassword}
      checkLogin={checkLogin}
    ></SignIn>
  );
};

export default SignInContainer;
