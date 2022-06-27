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

const styles = {
  MainBlock,
  Loading,
};

export default styles;
