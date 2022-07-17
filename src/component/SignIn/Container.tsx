import SignInPresentational from './Presentational';
import useSignIn from './Hook';

const SignInContainer = () => {
  const { checkLogin, setId, setPassword } = useSignIn();
  return (
    <SignInPresentational
      setId={setId}
      setPassword={setPassword}
      checkLogin={checkLogin}
    ></SignInPresentational>
  );
};

export default SignInContainer;
