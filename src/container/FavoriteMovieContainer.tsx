import { useEffect, useState } from 'react';
import FavoriteMovie from '../component/favorites/FavoriteMovie';
const FavoriteMovieContainer = () => {
  const [data, setData] = useState([
    { id: 'default', name: 'default', url: 'default' },
  ]);
  const [deleteBox, setDeleteBox] = useState(false); //드래그 시작시 , 취소시 드롭공간 on off 하기위한 값
  const [boxOver, setBoxOver] = useState('false'); //드래그 요소 드랍공간에 올라올시 투명도 관리를 위한 값

  useEffect(() => {
    let localData = localStorage.getItem('favoriteMovie');
    if (localData != null) {
      setData(JSON.parse(localData));
    }
  }, []);

  const dragStart = (e: any) => {
    setDeleteBox(!deleteBox);
    e.dataTransfer.setData('text/plain', e.currentTarget.name);
  };
  //드래그 시작시 드래그 요소의 인덱스를 dataTransfer객체에 저장한다.

  const dragEnd = (e: any) => {
    setDeleteBox(!deleteBox);
  };
  //드래그가 드롭공간이 아닌곳에서 끝나면 드롭박스를 감춘다

  const dropPoster = (e: any) => {
    setDeleteBox(!deleteBox);
    const Data = data.filter((data, index) => {
      if (index === +e.dataTransfer.getData('text/plain')) {
        return false;
      } else {
        return true;
      }
    });
    localStorage.setItem('favoriteMovie', JSON.stringify(Data));
    setData(Data);
  };
  //드래그가 드롭공간에 드롭될경우 해당되는 인덱스의 데이터를 배열에서 삭제한뒤, state와 localstorage에 저장한다.

  const dragOver = (e: any) => {
    e.preventDefault();
    setBoxOver('true');
  };
  //드롭요소위에 올라갈경우 투명도를 낮춰서 드롭요소위에 올라갔음을 직관적으로알려준다.

  const dropLeave = () => {
    setBoxOver('false');
  };
  //드롭요소에서 벗어날경우 투명도를 높여준다.

  return (
    <FavoriteMovie
      dragStart={dragStart}
      dragEnd={dragEnd}
      dragOver={dragOver}
      dropLeave={dropLeave}
      dropPoster={dropPoster}
      deleteBox={deleteBox}
      boxOver={boxOver}
      localData={data}
    />
  );
};

export default FavoriteMovieContainer;
