import styled from 'styled-components';

const MainBlock = styled.div`
  background: ${(props) => props.theme.background};
  weight: 100%;
  height: 100rem;
  font-size: 20px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 500px) {
    height: 40rem;
  }
`;

const Content = styled.div`
  font-size: 30px;
  margin-top: 10rem;
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const styles = { MainBlock, Content };

export default styles;
