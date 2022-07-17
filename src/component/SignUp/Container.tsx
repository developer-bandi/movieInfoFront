import useSignUp from './Hook';
import SignUpPresentational from './Presentational';

const SignUpContainer = () => {
  const { submitForm, setId, setPassword, setPasswordCheck, setNickname } =
    useSignUp();
  return (
    <SignUpPresentational
      setId={setId}
      setPassword={setPassword}
      setNickname={setNickname}
      setPasswordCheck={setPasswordCheck}
      submitForm={submitForm}
    />
  );
};

export default SignUpContainer;
