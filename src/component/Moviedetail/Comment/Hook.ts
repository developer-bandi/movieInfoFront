import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReducerType } from '../../../store';
import { addMovieComment } from '../../../store/movieCommet/Reducer';

const useUploadComment = (comment: string) => {
  const dispatch = useDispatch();
  const loginedUser = useSelector((state: ReducerType) => state.user);
  const { movieid } = useParams<'movieid'>() as { movieid: string };
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

  return uploadComment;
};

export default useUploadComment;
