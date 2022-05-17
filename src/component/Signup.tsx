import React from 'react';
import styled from 'styled-components';
interface SignUpProps {
  setId: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setPasswordCheck: React.Dispatch<React.SetStateAction<string>>;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  submitForm: () => void;
}
const SignUp = ({
  setId,
  setPassword,
  setPasswordCheck,
  setNickname,
  submitForm,
}: SignUpProps) => {
  return (
    <SignUpBlock>
      <Title>회원가입</Title>
      <section>
        <InfoTitle>아이디</InfoTitle>
        <InfoInput
          placeholder="아이디를 10자리 미만으로 기입하세요"
          onChange={(e) => {
            setId(e.target.value);
          }}
        ></InfoInput>
      </section>
      <section>
        <InfoTitle>비밀번호</InfoTitle>
        <InfoInput
          placeholder="비밀번호를 10자리 미만으로 기입하세요"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
        />
      </section>
      <section>
        <InfoTitle>비밀번호 확인</InfoTitle>
        <InfoInput
          placeholder="위와 동일한 비밀번호를 입력하세요"
          onChange={(e) => {
            setPasswordCheck(e.target.value);
          }}
          type="password"
        />
      </section>
      <section>
        <InfoTitle>닉네임</InfoTitle>
        <InfoInput
          placeholder="닉네임을 5자리 미만으로 기입하세요"
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
      </section>
      <SubmitButton onClick={submitForm}>가입하기</SubmitButton>
    </SignUpBlock>
  );
};

const SignUpBlock = styled.main`
  width: 21rem;
  height: 20.5rem;
  margin: auto;
  margin-top: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  width: 100%;
  font-size: 35px;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const InfoTitle = styled.h5`
  margin: 0;
  margin-bottom: 0.3rem;
`;

const InfoInput = styled.input`
  width: 19rem;
  height: 2.5rem;
  margin-bottom: 1rem;
  border: none;
  border: 1px solid black;
  border-radius: 5px;
  padding-left: 1rem;
`;

const SubmitButton = styled.div`
  width: 20.15rem;
  border-radius: 10px;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #39373a;
  color: white;
`;
export default SignUp;
