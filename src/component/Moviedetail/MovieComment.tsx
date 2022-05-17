/*eslint-disable*/

import React from 'react';
import styled from 'styled-components';
import { BsXLg } from 'react-icons/bs';
import setDate from '../../lib/setDate';
interface Props {
  uploadComment: (e: { type: string; key?: string }) => void;
  settingComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  deleteComment: (id: string, index: number) => void;
  commentList: any;
  loginedUserId: undefined | string;
}
const MovieComment = ({
  uploadComment,
  settingComment,
  deleteComment,
  commentList,
  loginedUserId,
}: Props) => {
  return (
    <MovieCommentBlock>
      <CommentListBlock>
        {commentList.map((data: any, index: any) => {
          return (
            <CommentBlock key={index}>
              <CommentInfoBlock>
                <Nickname>{data.nick}</Nickname>
                <CommentDate>{setDate(data.createdAt)}</CommentDate>
                {loginedUserId == data.userid ? (
                  <DeleteButton
                    onClick={(e) => {
                      deleteComment(data.id, index);
                    }}
                  />
                ) : null}
              </CommentInfoBlock>
              <Content>{data.content}</Content>
            </CommentBlock>
          );
        })}
      </CommentListBlock>
      <InputBox>
        <CommentInput onChange={settingComment} onKeyPress={uploadComment} />
        <UploadButton onClick={uploadComment}>등록</UploadButton>
      </InputBox>
    </MovieCommentBlock>
  );
};

const MovieCommentBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.background};
`;

const InputBox = styled.div`
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
const Content = styled.div`
  font-size: 15px;
`;

const Nickname = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-right: 1rem;
`;
const CommentDate = styled.div`
  font-size: 18px;
  color: gray;
`;
const CommentInfoBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const DeleteButton = styled(BsXLg)`
  width: 0.7rem;
  height: 0.7rem;
  margin-left: auto;
  &:hover {
    color: gray;
  }
`;

export default MovieComment;
