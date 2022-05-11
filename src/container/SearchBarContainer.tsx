import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchBar from '../component/Search/SearchBar';
import {
  getMovieSearchResultData,
  initializeMovieSearchResult,
} from '../modules/moviesearch';

const SearchBarContainer = () => {
  const [value, setvalue] = useState('');
  const [latest, setlatest] = useState(['default']);
  const dispatch = useDispatch();

  const searchMovie = (e: {
    key?: string;
    type: string;
    target: { innerText: string; tagName: string };
  }) => {
    if (
      (e.type === 'click' && e.key === undefined) ||
      (e.type === 'keypress' && e.key === 'Enter')
    ) {
      //클릭 엔터 모두 영화를 검색할수 있게 합니다.
      let tempValue = value;
      if (e.target.tagName === 'DIV') {
        //이벤트 발생이 div태그 즉 페이지 버튼에 의한 것이면 인덱스를 따로 가져옵니다.
        tempValue = e.target.innerText;
      }
      dispatch(getMovieSearchResultData({ name: tempValue, page: 1 }));
      dispatch(initializeMovieSearchResult());

      if (latest.length === 5) {
        setlatest([latest[1], latest[2], latest[3], latest[4], tempValue]);
        localStorage.setItem('latest', JSON.stringify(latest));
      } else {
        if (latest[0] === 'default') {
          setlatest([tempValue]);
          localStorage.setItem('latest', JSON.stringify([tempValue]));
        } else {
          setlatest([...latest, tempValue]);
          localStorage.setItem(
            'latest',
            JSON.stringify([...latest, tempValue])
          );
        }
      } //최근검색어 처리 로직입니다.

      setvalue(tempValue);
    }
  };

  const settingvalue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setvalue(e.target.value);
  };
  //검색어 입력값을 반영하는 함수압니다.

  const deleteComment = (index: number) => {
    latest.splice(index, 1);
    setlatest([...latest]);
    localStorage.setItem('latest', JSON.stringify(latest));
  };
  //최근검색어를 삭제하는 함수압니다.

  useEffect(() => {
    const data = localStorage.getItem('latest');
    if (data !== null) {
      setlatest(JSON.parse(data));
    }
  }, []);
  //최근 검색어 데이터를 불러옵니다.
  return (
    <SearchBar
      latest={latest}
      searchMovie={searchMovie}
      deleteComment={deleteComment}
      settingvalue={settingvalue}
      value={value}
    />
  );
};

export default SearchBarContainer;
