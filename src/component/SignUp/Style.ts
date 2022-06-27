import styled from 'styled-components';

const MainBlock = styled.main`
  width: 21rem;
  height: 20.5rem;
  margin: auto;
  margin-top: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  width: 100%;
  font-size: 35px;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const InfoTitle = styled.h5`
  margin: 0;
  margin-bottom: 0.3rem;
`;

const InfoInput = styled.input`
  width: 19rem;
  height: 2.5rem;
  margin-bottom: 1rem;
  border: none;
  border: 1px solid black;
  border-radius: 5px;
  padding-left: 1rem;
`;

const SubmitButton = styled.div`
  width: 20.15rem;
  border-radius: 10px;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #39373a;
  color: white;
`;

const styles = { MainBlock, Title, InfoTitle, InfoInput, SubmitButton };

export default styles;
