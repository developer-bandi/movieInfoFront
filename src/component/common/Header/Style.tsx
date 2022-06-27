import styled from 'styled-components';

const MainBlock = styled.header`
  height: 5rem;
  border-bottom: 2px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin-left: 1rem;
  @media screen and (max-width: 500px) {
    font-size: 25px;
  }
`;

const UserInfoBlock = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background: white;
  border: none;
  border: 1px solid black;
  border-radius: 3px;
  padding: 5px;
  margin-left: 1rem;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

const Nickname = styled.div`
  margin-right: 5px;
  font-size: 20px;
  font-weight: bold;
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const styles = { MainBlock, Title, UserInfoBlock, Button, Nickname };

export default styles;
