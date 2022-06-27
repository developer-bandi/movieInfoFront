/*eslint-disable*/

import React from 'react';
import setDate from '../../../lib/setDate';
import styles from './Style';

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
    <styles.MainBlock>
      <styles.CommentListBlock>
        {commentList.map((data: any, index: any) => {
          return (
            <styles.CommentBlock key={index}>
              <styles.InfoBlock>
                <styles.Nickname>{data.nick}</styles.Nickname>
                <styles.Date>{setDate(data.createdAt)}</styles.Date>
                {loginedUserId == data.userid ? (
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
