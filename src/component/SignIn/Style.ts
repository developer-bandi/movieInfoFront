import styled from 'styled-components';

const MainBlock = styled.main`
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

const BarBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;
const Bar = styled.hr`
  flex: auto;
  border: none;
  height: 1px;
  background-color: #e3e3e3;
`;

const BarText = styled.span`
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

const LocalLoginToolBlock = styled.div`
  display: flex;
  justify-content: center;
`;

const LocalLoginTool = styled.div`
  cursor: pointer;
`;

const styles = {
  MainBlock,
  Title,
  NaverContentBlock,
  NaverLoginButton,
  NaverLogo,
  NaverText,
  KakaoContentBlock,
  KakaoLoginButton,
  KakaologoImg,
  KakaoLoginText,
  Notice,
  BarBlock,
  Bar,
  BarText,
  InfoInput,
  LoginButton,
  LocalLoginToolBlock,
  LocalLoginTool,
};

export default styles;
