import styled from 'styled-components';

const MainBlock = styled.section`
  height: 35rem;
  @media screen and (max-width: 500px) {
    height: 15rem;
  }
`;

const Loading = styled.div`
  background: black;
  height: 35rem;
  width: 100%;

  @media screen and (max-width: 500px) {
    height: 15rem;
  }
`;

const Error = styled.div`
  background: black;
  height: 35rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ErrorMessage = styled.div`
  font-size: 40px;
  color: white;
`;

const styles = {
  MainBlock,
  Loading,
  Error,
  ErrorMessage,
};

export default styles;
