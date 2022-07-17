import React from 'react';
import styles from './Style';

interface SignUpProps {
  setId: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setPasswordCheck: React.Dispatch<React.SetStateAction<string>>;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  submitForm: () => void;
}
const SignUpPresentational = ({
  setId,
  setPassword,
  setPasswordCheck,
  setNickname,
  submitForm,
}: SignUpProps) => {
  return (
    <styles.MainBlock>
      <styles.Title>회원가입</styles.Title>
      <section>
        <styles.InfoTitle>아이디</styles.InfoTitle>
        <styles.InfoInput
          placeholder="아이디를 10자리 미만으로 기입하세요"
          onChange={(e) => {
            setId(e.target.value);
          }}
          data-testid={'id'}
        ></styles.InfoInput>
      </section>
      <section>
        <styles.InfoTitle>비밀번호</styles.InfoTitle>
        <styles.InfoInput
          placeholder="비밀번호를 10자리 미만으로 기입하세요"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          data-testid={'password'}
        />
      </section>
      <section>
        <styles.InfoTitle>비밀번호 확인</styles.InfoTitle>
        <styles.InfoInput
          placeholder="위와 동일한 비밀번호를 입력하세요"
          onChange={(e) => {
            setPasswordCheck(e.target.value);
          }}
          type="password"
          data-testid={'passwordCheck'}
        />
      </section>
      <section>
        <styles.InfoTitle>닉네임</styles.InfoTitle>
        <styles.InfoInput
          placeholder="닉네임을 5자리 미만으로 기입하세요"
          onChange={(e) => {
            setNickname(e.target.value);
          }}
          data-testid={'nickname'}
        />
      </section>
      <styles.SubmitButton onClick={submitForm} data-testid={'submitButton'}>
        가입하기
      </styles.SubmitButton>
    </styles.MainBlock>
  );
};

export default SignUpPresentational;
