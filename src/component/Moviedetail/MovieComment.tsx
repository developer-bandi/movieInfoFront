/*eslint-disable*/

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { BsXLg } from 'react-icons/bs';
interface Props {
  uploadComment: (e: { type: string; key?: string }) => void;
  settingComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteComment: (index: number) => void;
  commentList: { comment: string; date: string }[];
}
const MovieComment = ({
  uploadComment,
  settingComment,
  deleteComment,
  commentList,
}: Props) => {
  return (
    <MovieCommentBlock>
      <InputBox>
        <CommentInput onChange={settingComment} onKeyPress={uploadComment} />
        <UploadButton onClick={uploadComment}>등록</UploadButton>
      </InputBox>
      <CommentListBlock>
        {commentList.map((data, index) => {
          if (data.date === 'default') {
            return null;
          }
          return (
            <CommentBlock key={index}>
              <Comment>{data.comment}</Comment>
              <BottomBlock>
                <CommentDate>{data.date}</CommentDate>
                <DeleteButton
                  onClick={(e) => {
                    deleteComment(index);
                  }}
                />
              </BottomBlock>
            </CommentBlock>
          );
        })}
      </CommentListBlock>
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
  margin-top: 3rem;
  display: flex;
  border: 1px solid black;
`;

const CommentInput = styled.input`
  width: 60rem;
  height: 3rem;
  border: 0 solid black;
  font-size: 20px;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 500px) {
    width: 15rem;
  }
`;

const UploadButton = styled.div`
  width: 5rem;
  height: 3.2rem;
  background: #e6e6e6;

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
  width: 65rem;
  @media screen and (max-width: 500px) {
    width: 90%;

    padding: 5%;
  }
`;

const CommentBlock = styled.div`
  border-bottom: 0.5px solid black;
  margin-top: 0.5rem;
`;
const Comment = styled.div`
  font-size: 15px;
  margin-bottom: 0.5rem;
`;

const CommentDate = styled.div`
  font-size: 10px;
  margin-bottom: 0.5rem;
`;
const BottomBlock = styled.div`
  display: flex;
`;

const DeleteButton = styled(BsXLg)`
  width: 0.7rem;
  height: 0.7rem;
  margin-left: 0.5rem;
  &:hover {
    color: gray;
  }
`;

export default MovieComment;
