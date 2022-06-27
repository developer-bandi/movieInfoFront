import styled from 'styled-components';

const MainBlock = styled.footer`
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

const styles = { MainBlock, Content };

export default styles;
