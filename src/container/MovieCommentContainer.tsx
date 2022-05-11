/*eslint-disable*/
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieComment from '../component/Moviedetail/MovieComment';

const MovieCommentContainer = () => {
  const [comment, setComment] = useState('');
  const [commentList, setcommentList] = useState([
    { comment: 'defalut', date: 'default' },
  ]);
  const { movieid } = useParams<'movieid'>();
  const notUndefinedMoiveid = movieid || 'default';

  useEffect(() => {
    const output = localStorage.getItem(notUndefinedMoiveid);
    if (output !== null) {
      const outputArr = JSON.parse(output);
      localStorage.setItem(notUndefinedMoiveid, JSON.stringify(outputArr));
      setcommentList(outputArr);
    }
  }, []);
  //댓글을 받아오는 훅입니다. 의존배열을 비워서 최초 한번만 실행됩니다.

  const uploadComment = (e: { type: string; key?: string }) => {
    if (
      (e.type === 'click' && e.key === undefined) ||
      (e.type === 'keypress' && e.key === 'Enter')
    ) {
      // 조건은 클릭, 엔터 모두 입력되도록 하였습니다.
      const output = localStorage.getItem(notUndefinedMoiveid);
      const date = Date().split(' ');
      const setDate =
        date[3] + ' ' + date[1] + ' ' + date[2] + ' ' + date[0] + ' ' + date[4];
      if (output !== null) {
        const outputArr = JSON.parse(output);
        outputArr.push({
          comment,
          date: setDate,
        });
        localStorage.setItem(notUndefinedMoiveid, JSON.stringify(outputArr));
        setcommentList(outputArr);
      } else {
        localStorage.setItem(
          notUndefinedMoiveid,
          JSON.stringify([
            {
              comment,
              date: setDate,
            },
          ])
        ); //로컬스토리지에 댓글을 날짜와함께 저장합니다. 이때 처음작성할경우 데이터가 null이므로 이를 고려하여 작성하였습니다.
        setcommentList([
          {
            comment,
            date: setDate,
          },
        ]); // state 상태값에도 저장합니다.
      }
    }
  };

  const settingComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const deleteComment = (index: number) => {
    const output = localStorage.getItem(notUndefinedMoiveid);
    const notNulloutput = output || 'default';
    const outputArr = JSON.parse(notNulloutput);
    outputArr.splice(index, 1);
    localStorage.setItem(notUndefinedMoiveid, JSON.stringify(outputArr));
    setcommentList(outputArr);
  };
  return (
    <MovieComment
      uploadComment={uploadComment}
      settingComment={settingComment}
      deleteComment={deleteComment}
      commentList={commentList}
    ></MovieComment>
  );
};

export default MovieCommentContainer;
