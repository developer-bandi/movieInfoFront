/*eslint-disable*/
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReducerType } from '../../../store';
import {
  addMovieComment,
  deleteMovieComment,
} from '../../../store/movieCommet/Reducer';
import MovieComment from './Presentational';

const MovieCommentContainer = () => {
  const commentList = useSelector((state: ReducerType) => state.moiveComment);
  const loginedUser = useSelector((state: ReducerType) => state.user);
  const [comment, setComment] = useState('');
  const { movieid } = useParams<'movieid'>() as { movieid: string };
  const dispatch = useDispatch();

  const uploadComment = (e: { type: string; key?: string }) => {
    if (
      (e.type === 'click' && e.key === undefined) ||
      (e.type === 'keypress' && e.key === 'Enter')
    ) {
      if (loginedUser.content) {
        dispatch(addMovieComment({ movieId: movieid, content: comment }));
      } else {
        alert('로그인을 해주세요');
      }
    }
  };

  const settingComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const deleteComment = (id: number, index: number) => {
    dispatch(deleteMovieComment({ id, index }));
  };

  return (
    <MovieComment
      uploadComment={uploadComment}
      settingComment={settingComment}
      deleteComment={deleteComment}
      commentList={commentList}
      loginedUserId={loginedUser.content?.id}
    ></MovieComment>
  );
};

export default MovieCommentContainer;
