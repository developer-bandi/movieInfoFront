import { Link } from 'react-router-dom';
import styled from 'styled-components';
import kakao5 from '../tempdata/kakaoicon.png';
interface SignInProps {
  setId: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  checkLogin: () => Promise<void>;
}

const SignIn = ({ setId, setPassword, checkLogin }: SignInProps) => {
  return (
    <SignInBlock>
      <Title>로그인</Title>
      <section>
        <NaverLoginButton
          href={`${process.env.REACT_APP_SERVER}/auth/naver`}
          target="_blank"
        >
          <NaverContentBlock>
            <NaverLogo>N</NaverLogo>
            <NaverText>네이버 로그인</NaverText>
          </NaverContentBlock>
        </NaverLoginButton>
        <KakaoLoginButton
          href={`${process.env.REACT_APP_SERVER}/auth/kakao`}
          target="_blank"
        >
          <KakaoContentBlock>
            <KakaologoImg src={kakao5} alt="x"></KakaologoImg>
            <KakaoLoginText>카카오 로그인</KakaoLoginText>
          </KakaoContentBlock>
        </KakaoLoginButton>
        <Notice>
          네이버 로그인의 경우 검수를 받지않아 관리자만 이용할수 있습니다
        </Notice>
      </section>
      <ContentBarBlock>
        <ContentBar />
        <ContentBarText>또는</ContentBarText>
        <ContentBar />
      </ContentBarBlock>
      <section>
        <InfoInput
          onChange={(e) => {
            setId(e.target.value);
          }}
          placeholder="아이디"
        />

        <InfoInput
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="비밀번호"
        />
        <LoginButton onClick={checkLogin}>로그인하기</LoginButton>
        <LocalLoginToolBlock>
          <LocalLoginTool>
            <Link to={'/signup'}>회원가입</Link>
          </LocalLoginTool>
          <LocalLoginTool>아이디 찾기</LocalLoginTool>
          <LocalLoginTool>비밀번호 찾기</LocalLoginTool>
        </LocalLoginToolBlock>
      </section>
    </SignInBlock>
  );
};

const SignInBlock = styled.main`
  width: 500px;
  margin: auto;
  margin-top: 3rem;
`;

const Title = styled.h1`
  font-size: 35px;
  font-weight: bold;
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const NaverLoginButton = styled.a`
  width: 500px;
  height: 65px;
  background: #03c75a;
  border-radius: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const NaverContentBlock = styled.div`
  display: flex;
  margin: auto;
`;

const NaverLogo = styled.div`
  color: white;
  font-weight: 900;
  font-size: 30px;
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const NaverText = styled.div`
  color: white;
  font-size: 20px;
  text-align: center;
  display: flex;
  align-items: center;
`;

const KakaoLoginButton = styled.a`
  width: 500px;
  height: 65px;
  background: #fee500;
  border-radius: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  cursor: pointer;
`;

const KakaoContentBlock = styled.div`
  display: flex;
  margin: auto;
`;

const KakaologoImg = styled.img`
  width: 30px;
  height: 65px;
  object-fit: cover;
  margin-right: 5px;
`;

const KakaoLoginText = styled.div`
  color: #000000;
  font-size: 20px;
  text-align: center;
  display: flex;
  align-items: center;
`;

const Notice = styled.div`
  width: 500px;
  text-align: center;
  color: red;
  margin-bottom: 1rem;
`;

const ContentBarBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;
const ContentBar = styled.hr`
  flex: auto;
  border: none;
  height: 1px;
  background-color: #e3e3e3;
`;

const ContentBarText = styled.span`
  padding: 0 10px;
  color: #b5b5b5;
`;

const InfoInput = styled.input`
  height: 3rem;
  width: 500px;
  display: block;
  margin: auto;
  margin-bottom: 1rem;
  border: none;
  border-bottom: 1px solid black;
  font-size: 20px;
  padding: 0;
`;

const LoginButton = styled.button`
  height: 65px;
  width: 500px;
  display: block;
  margin: auto;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #39373a;
  border-radius: 12px;
  border: none;
  color: white;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  font-size: 20px;
  margin-top: 2rem;
`;

const LocalLoginToolBlock = styled.ul`
  display: flex;
  justify-content: center;
`;

const LocalLoginTool = styled.li`
  padding: 0 1rem 0 1rem;
  cursor: pointer;
  & + & {
    border-left: 1px solid black;
  }
`;

export default SignIn;
