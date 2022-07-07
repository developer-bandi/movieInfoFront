import { Link } from 'react-router-dom';
import kakao5 from '../../imgs/kakaoicon.png';
import styles from './Style';

interface SignInProps {
  setId: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  checkLogin: () => Promise<void>;
}

const SignIn = ({ setId, setPassword, checkLogin }: SignInProps) => {
  return (
    <styles.MainBlock>
      <styles.Title>로그인</styles.Title>
      <section>
        <styles.NaverLoginButton
          href={`${process.env.REACT_APP_SERVER}/auth/naver`}
          target="_blank"
        >
          <styles.NaverContentBlock>
            <styles.NaverLogo>N</styles.NaverLogo>
            <styles.NaverText>네이버 로그인</styles.NaverText>
          </styles.NaverContentBlock>
        </styles.NaverLoginButton>
        <styles.KakaoLoginButton
          href={`${process.env.REACT_APP_SERVER}/auth/kakao`}
          target="_blank"
        >
          <styles.KakaoContentBlock>
            <styles.KakaologoImg src={kakao5} alt="x"></styles.KakaologoImg>
            <styles.KakaoLoginText>카카오 로그인</styles.KakaoLoginText>
          </styles.KakaoContentBlock>
        </styles.KakaoLoginButton>
        <styles.Notice>
          네이버 로그인의 경우 검수를 받지않아 관리자만 이용할수 있습니다
        </styles.Notice>
      </section>
      <styles.BarBlock>
        <styles.Bar />
        <styles.BarText>또는</styles.BarText>
        <styles.Bar />
      </styles.BarBlock>
      <section>
        <styles.InfoInput
          onChange={(e) => {
            setId(e.target.value);
          }}
          placeholder="아이디"
        />
        <styles.InfoInput
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="비밀번호"
        />
        <styles.LoginButton onClick={checkLogin}>로그인하기</styles.LoginButton>
        <styles.LocalLoginToolBlock>
          <styles.LocalLoginTool>
            <Link to={'/signup'}>회원가입</Link>
          </styles.LocalLoginTool>
        </styles.LocalLoginToolBlock>
      </section>
    </styles.MainBlock>
  );
};

export default SignIn;
