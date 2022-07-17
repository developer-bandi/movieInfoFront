import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
var CryptoJS = require('crypto-js');

const useSignUp = () => {
  const [userid, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nick, setNickname] = useState('');
  //회원가입 폼 상태값은 컴포넌트 단에서 관리

  const navigate = useNavigate();
  const submitForm = async () => {
    try {
      const agreeSubmit = window.confirm(
        '가입시 닉네임은 변경할수 없습니다 가입하시겠습니까?'
      );
      if (agreeSubmit) {
        if (userid === '' || userid.length > 10) {
          alert('아이디를 정확히 입력하세요');
        } else if (password === '' || password.length > 10) {
          alert('비밀번호를 정확히 입력하세요');
        } else if (password !== passwordCheck) {
          alert('확인 비밀번호가 일치하지 않습니다 다시 입력해주세요');
        } else if (nick === '' || nick.length > 5) {
          alert('닉네임을 정확하게 입력하세요');
        } else {
          const userData = {
            userid,
            password: CryptoJS.AES.encrypt(
              JSON.stringify(password),
              process.env.REACT_APP_SECRET
            ).toString(),
            nick,
          };
          await axios.post(
            `${process.env.REACT_APP_SERVER}/auth/join`,
            userData
          );
          alert('회원가입에 성공하였습니다.');
          navigate('/signin');
        }
        //아이디 비밀번호 닉네임 조건으로 길이수를 설정하고 통과시에는 회원가입 완료처리
      }
    } catch (err) {
      alert('에러가 발생하였습니다');
    }
  };

  return {
    submitForm,
    setId,
    setPassword,
    setPasswordCheck,
    setNickname,
  };
};

export default useSignUp;
