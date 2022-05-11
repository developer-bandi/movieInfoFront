import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterBlock>
      <Content>이 사이트는 개인 포트폴리오용 사이트입니다</Content>
      <Content>Copyright 2022. 김상두 all right reserved</Content>
      <Content>Source by TMDB</Content>
    </FooterBlock>
  );
};

const FooterBlock = styled.footer`
  width: 100%;
  height: 5rem;
  background: #425a73;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 1rem;
  @media screen and (max-width: 500px) {
    font-size: 8px;
    height: 1.5rem;
  }
`;

const Content = styled.div`
  color: white;
  & + & {
    margin-top: 0.5rem;
  }
`;

export default Footer;
