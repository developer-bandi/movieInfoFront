import styled from 'styled-components';
import { BsXLg } from 'react-icons/bs';

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.background};
`;

const CommentListBlock = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 80%;
  @media screen and (max-width: 500px) {
    width: 90%;
    padding: 5%;
  }
`;

const CommentBlock = styled.div`
  border-bottom: 0.5px solid black;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
`;

const InfoBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Nickname = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-right: 1rem;
`;

const Date = styled.div`
  font-size: 18px;
  color: gray;
`;

const DeleteButton = styled(BsXLg)`
  width: 0.7rem;
  height: 0.7rem;
  margin-left: auto;
  &:hover {
    color: gray;
  }
`;

const Content = styled.div`
  font-size: 15px;
`;

const InputBlock = styled.div`
  width: 80%;
  margin-top: 1rem;
  margin-bottom: 2rem;
  display: flex;
  border: 1px solid black;
  border-radius: 5px;
`;

const CommentInput = styled.textarea`
  width: 90%;
  height: 5rem;
  border: 0 solid black;
  font-size: 20px;
  border-radius: 5px 0 0 5px;
  padding: 5px;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 500px) {
    width: 15rem;
  }
`;

const UploadButton = styled.div`
  width: 10%;
  background: #e6e6e6;
  border-radius: 0 5px 5px 0;
  &:hover {
    background: #c0c0c0;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;

const styles = {
  MainBlock,
  CommentListBlock,
  CommentBlock,
  Nickname,
  Date,
  DeleteButton,
  Content,
  InfoBlock,
  InputBlock,
  CommentInput,
  UploadButton,
};

export default styles;
