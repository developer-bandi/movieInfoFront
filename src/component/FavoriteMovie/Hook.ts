/*eslint-disable*/
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../store';
import { deleteFavoriteMovie } from '../../store/favoriteMovie/Reducer';

const useFavoriteHook = () => {
  const likeMovies = useSelector((state: ReducerType) => state.favoriteMovie);
  const [deleteBox, setDeleteBox] = useState(false); //드래그 시작시 , 취소시 드롭공간 on off 하기위한 값
  const [boxOver, setBoxOver] = useState('false'); //드래그 요소 드랍공간에 올라올시 투명도 관리를 위한 값
  const [end, setEnd] = useState(10);
  const [viewRef, inView] = useInView(); //무한스크롤 훅
  const dispatch = useDispatch();
  useEffect(() => {
    if (likeMovies.content !== undefined) {
      if (inView) {
        if (likeMovies.content.length > end) {
          if (likeMovies.content.length < end + 10) {
            setEnd(likeMovies.content.length);
          } else {
            setEnd((end) => end + 10);
          }
        }
      }
    }
  }, [inView]);
  // 즐겨찾기 항목의 무한 슬라이드 구현을위해 작성한 코드입니다. 10번째 항목이 화면에 보여질때 마다 항목이 10개씩 추가됩니다.

  useEffect(() => {
    if (likeMovies.content !== undefined) {
      if (likeMovies.content.length < 10) {
        setEnd(likeMovies.content.length);
      }
    }
  }, [likeMovies]);
  // 처음 렌더링시 항목이 10개보다 작을경우에 end의 초기값을 재설정하기위한 코드입니다.

  const dragStart: React.DragEventHandler<HTMLAnchorElement> = (e) => {
    setDeleteBox(!deleteBox);
    e.dataTransfer.setData('text/plain', e.currentTarget.name);
  };
  //드래그 시작시 드래그 요소의 인덱스를 dataTransfer객체에 저장한다.

  const dragEnd: React.DragEventHandler<HTMLAnchorElement> = () => {
    setDeleteBox(!deleteBox);
  };
  //드래그가 드롭공간이 아닌곳에서 끝나면 드롭박스를 감춘다

  const dropPoster: React.DragEventHandler<HTMLDivElement> = (e) => {
    setDeleteBox(!deleteBox);
    const id =
      likeMovies.content !== undefined
        ? likeMovies.content[+e.dataTransfer.getData('text/plain')].id
        : undefined;
    if (id !== undefined) {
      dispatch(
        deleteFavoriteMovie({
          id,
          index: +e.dataTransfer.getData('text/plain'),
        })
      );
    }
  };
  //드래그가 드롭공간에 드롭될경우 해당되는 데이터를 삭제합니다.

  const dragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setBoxOver('true');
  };
  //드롭요소위에 올라갈경우 투명도를 낮춰서 드롭요소위에 올라갔음을 직관적으로 알려줍니다

  const dropLeave: React.DragEventHandler<HTMLDivElement> = () => {
    setBoxOver('false');
  };
  //드롭요소에서 벗어날경우 투명도를 높여준다.

  return {
    likeMovies,
    dragStart,
    dragEnd,
    dragOver,
    dropLeave,
    dropPoster,
    deleteBox,
    boxOver,
    end,
    viewRef,
    inView,
  };
};

export default useFavoriteHook;
