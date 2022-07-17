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
const CommentPresentational = ({
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
          commentList.content.map((comment, index) => {
            return (
              <styles.CommentBlock key={index}>
                <styles.InfoBlock>
                  <styles.Nickname>{comment.User.nick}</styles.Nickname>
                  <styles.Date>{setDate(comment.createdAt)}</styles.Date>
                  {loginedUserId == comment.User.id ? (
                    <styles.DeleteButton
                      onClick={(e) => {
                        deleteComment(comment.id, index);
                      }}
                      data-testid={'deleteButton'}
                    />
                  ) : null}
                </styles.InfoBlock>
                <styles.Content>{comment.content}</styles.Content>
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

export default CommentPresentational;
