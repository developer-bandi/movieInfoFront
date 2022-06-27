/*eslint-disable*/
import nullmovie from '../../../tempdata/nullmovie.webp';
import { useEffect, useState } from 'react';
import { getMovieSearchResultData } from '../../../modules/moviesearch';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import styles from './Style';

interface Info {
  name: string;
  totalpage: number;
}

interface Result {
  title: string;
  id: string;
  posterPath: string;
  rate: number;
  release: string;
}

interface SearchResultProps {
  data: {
    info: Info;
    result: Result[][];
  };
  dispatch: any;
}

const SearchResult = ({ data, dispatch }: SearchResultProps) => {
  const [start, setstart] = useState(1); //현재 페이지네이션으로 보여주고있는 첫페이지
  const [end, setend] = useState(0); //현재 페이지네이션으로 보여주고있는 마지막 페이지
  const [activepage, setactivepage] = useState(1); //현재 결과로 렌더링된 페이지

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  });
  //리렌더링시 맨위로, 즉 페이지를 옮길때 맨위로 올라갑니다.

  useEffect(() => {
    if (data.info.totalpage <= 5) {
      setend(data.info.totalpage);
    } else {
      setend(5);
    }
  }, []);

  const MovePage = (position: number) => {
    if (data.result[activepage + position - 1] === undefined) {
      dispatch(
        getMovieSearchResultData({
          name: data.info.name,
          page: activepage + position,
        })
      );
    }
    setactivepage(activepage + position);
  };

  const prevPage = () => {
    if (activepage % 5 === 1) {
      if (end === data.info.totalpage) {
        setstart(start - 5);
        setend(end - (end % 5));
      } else {
        setstart(start - 5);
        setend(end - 5);
      }
    }
    MovePage(-1);
  };
  //다음페이지로 이동하는데, 이때 페이지네이션하는 페이지의 마지막일경우 다음 페이지네이션을 보여줍니다.
  const nextPage = () => {
    if (activepage % 5 === 0) {
      if (data.info.totalpage > end + 5) {
        setstart(start + 5);
        setend(end + 5);
      } else {
        setstart(start + 5);
        setend(data.info.totalpage);
      }
    }
    MovePage(+1);
  };
  //이전페이지로 이동하는데, 이때 페이지네이션하는 페이지의 처음일경우 이전 페이지네이션을 보여줍니다.
  return (
    <styles.MainBlock>
      {data.result[activepage - 1] === undefined
        ? null
        : data.result[activepage - 1].map((data) => {
            return (
              <styles.PosterBlock to={`/moviedetail/${data.id}`} key={data.id}>
                <styles.MovieImg
                  src={
                    data.posterPath === null
                      ? nullmovie
                      : `https://image.tmdb.org/t/p/w500${data.posterPath}`
                  }
                  alt="x"
                />
                <styles.MovieInfoBlock>
                  <styles.Title> {data.title}</styles.Title>
                  <styles.MovieMoreInfoBlock>
                    <styles.InfoTitle>개봉</styles.InfoTitle>
                    <styles.InfoContent>
                      {data.release === '' ? '정보 없음' : data.release}
                    </styles.InfoContent>
                  </styles.MovieMoreInfoBlock>
                  <styles.MovieMoreInfoBlock>
                    <styles.InfoTitle>평점</styles.InfoTitle>
                    <styles.InfoContent>
                      {data.rate === 0 ? '평가중' : data.rate}
                    </styles.InfoContent>
                  </styles.MovieMoreInfoBlock>
                </styles.MovieInfoBlock>
              </styles.PosterBlock>
            );
          })}
      <styles.PagenationBlock>
        <styles.MovePage
          onClick={prevPage}
          active={activepage === 1 ? 'true' : 'false'}
        >
          <IoIosArrowBack />
        </styles.MovePage>
        {new Array(end - start + 1).fill(0).map((value, index) => {
          return (
            <styles.PageButton
              active={activepage === index + start}
              onClick={function goPage(e) {
                if (data.result[index + start - 1] === undefined) {
                  dispatch(
                    getMovieSearchResultData({
                      name: data.info.name,
                      page: index + start,
                    })
                  );
                }
                setactivepage(index + start);
              }}
              key={index}
            >
              {index + start}
            </styles.PageButton>
          );
        })}
        <styles.MovePage
          onClick={nextPage}
          active={activepage === data.info.totalpage ? 'true' : 'false'}
        >
          <IoIosArrowForward />
        </styles.MovePage>
      </styles.PagenationBlock>
    </styles.MainBlock>
  );
};

export default SearchResult;
