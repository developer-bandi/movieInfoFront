/*eslint-disable*/
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MovieComment from './Presentational';
import { RootState } from '../../../modules';
import {
  addMovieComment,
  deleteMovieComment,
} from '../../../modules/moviecomment';

const MovieCommentContainer = () => {
  const [comment, setComment] = useState('');
  const { movieid } = useParams<'movieid'>();
  const dispatch = useDispatch();
  const commentList = useSelector(
    (state: RootState) => state.movieCommentReducer
  );
  const loginedUser = useSelector((state: RootState) => state.userReducer);

  const uploadComment = (e: { type: string; key?: string }) => {
    if (
      (e.type === 'click' && e.key === undefined) ||
      (e.type === 'keypress' && e.key === 'Enter')
    ) {
      if (loginedUser.login) {
        dispatch(addMovieComment(movieid || 'default', comment));
      } else {
        alert('로그인을 해주세요');
      }
    }
  };

  const settingComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const deleteComment = (id: string, index: number) => {
    dispatch(deleteMovieComment(id, index));
  };
  return (
    <MovieComment
      uploadComment={uploadComment}
      settingComment={settingComment}
      deleteComment={deleteComment}
      commentList={commentList}
      loginedUserId={loginedUser.id}
    ></MovieComment>
  );
};

export default MovieCommentContainer;
