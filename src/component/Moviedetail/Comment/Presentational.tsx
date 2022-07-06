/*eslint-disable*/

import React from 'react';
import setDate from '../../../lib/setDate';
import { MovieCommentState } from '../../../store/movieCommet/Reducer';
import styles from './Style';

interface Props {
  uploadComment: (e: { type: string; key?: string }) => void;
  settingComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  deleteComment: (id: number, index: number) => void;
  commentList: MovieCommentState;
  loginedUserId: undefined | number;
}
const MovieComment = ({
  uploadComment,
  settingComment,
  deleteComment,
  commentList,
  loginedUserId,
}: Props) => {
  return (
    <styles.MainBlock>
      <styles.CommentListBlock>
        {commentList.content !== undefined &&
          commentList.content.map((data, index) => {
            return (
              <styles.CommentBlock key={index}>
                <styles.InfoBlock>
                  <styles.Nickname>{data.User.nick}</styles.Nickname>
                  <styles.Date>{setDate(data.createdAt)}</styles.Date>
                  {loginedUserId == data.User.id ? (
                    <styles.DeleteButton
                      onClick={(e) => {
                        deleteComment(data.id, index);
                      }}
                    />
                  ) : null}
                </styles.InfoBlock>
                <styles.Content>{data.content}</styles.Content>
              </styles.CommentBlock>
            );
          })}
      </styles.CommentListBlock>
      <styles.InputBlock>
        <styles.CommentInput
          onChange={settingComment}
          onKeyPress={uploadComment}
        />
        <styles.UploadButton onClick={uploadComment}>등록</styles.UploadButton>
      </styles.InputBlock>
    </styles.MainBlock>
  );
};

export default MovieComment;
