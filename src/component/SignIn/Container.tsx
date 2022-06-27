import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignIn from './Presentational';
import { doLocalLogin } from '../../modules/user';
var CryptoJS = require('crypto-js');

const SignInContainer = () => {
  const [userid, setId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkLogin = async () => {
    if (userid !== '' && password !== '') {
      try {
        console.log(process.env.REACT_APP_SECRET);
        const userInfo = await axios.post(
          `${process.env.REACT_APP_SERVER}/auth/login`,
          {
            userid,
            password: CryptoJS.AES.encrypt(
              JSON.stringify(password),
              process.env.REACT_APP_SECRET
            ).toString(),
          }
        );
        if (userInfo.status === 202) {
          alert(userInfo.data);
        } else {
          alert('로그인에 성공하였습니다!');
          dispatch(
            doLocalLogin(
              userInfo.data.id,
              userInfo.data.userid,
              userInfo.data.nick
            )
          );
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
