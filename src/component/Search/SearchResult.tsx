/*eslint-disable*/

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import nullmovie from '../../tempdata/nullmovie.webp';
import { useEffect, useState } from 'react';
import { getMovieSearchResultData } from '../../modules/moviesearch';
import { css } from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

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
    <SearchResultBlock>
      {data.result[activepage - 1] === undefined
        ? null
        : data.result[activepage - 1].map((data) => {
            return (
              <PosterBlock to={`/moviedetail/${data.id}`} key={data.id}>
                <MovieImg
                  src={
                    data.posterPath === null
                      ? nullmovie
                      : `https://image.tmdb.org/t/p/w500${data.posterPath}`
                  }
                  alt="x"
                />
                <MovieInfoBlock>
                  <Title> {data.title}</Title>
                  <MovieMoreInfoBlock>
                    <InfoTitle>개봉</InfoTitle>
                    <InfoContent>
                      {data.release === '' ? '정보 없음' : data.release}
                    </InfoContent>
                  </MovieMoreInfoBlock>
                  <MovieMoreInfoBlock>
                    <InfoTitle>평점</InfoTitle>
                    <InfoContent>
                      {data.rate === 0 ? '평가중' : data.rate}
                    </InfoContent>
                  </MovieMoreInfoBlock>
                </MovieInfoBlock>
              </PosterBlock>
            );
          })}
      <PagenationBlock>
        <PagenationLeft
          onClick={prevPage}
          firstpage={activepage === 1 ? 'true' : 'false'}
        />
        {new Array(end - start + 1).fill(0).map((value, index) => {
          return (
            <PagenationButton
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
            </PagenationButton>
          );
        })}
        <PagenationRight
          onClick={nextPage}
          lastpage={activepage === data.info.totalpage ? 'true' : 'false'}
        />
      </PagenationBlock>
    </SearchResultBlock>
  );
};

const SearchResultBlock = styled.div`
  background: ${(props) => props.theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;

const PosterBlock = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: black;
  margin-bottom: 2rem;
`;

const MovieImg = styled.img`
  width: 10rem;
  height: 15rem;
  @media screen and (max-width: 500px) {
    width: 6rem;
    height: 9rem;
  }
`;

const MovieInfoBlock = styled.div`
  width: 60rem;
  height: 13rem;
  margin-left: 3rem;
  padding: 0.5rem;
  @media screen and (max-width: 500px) {
    width: 13rem;
    height: 10rem;
    margin-left: 1.5rem;
  }
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 1rem;
  @media screen and (max-width: 500px) {
    font-size: 18px;
  }
`;

const MovieMoreInfoBlock = styled.div`
  display: flex;
  font-size: 20px;
  margin-bottom: 0.5rem;
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const InfoTitle = styled.div`
  font-weight: 550;
`;

const InfoContent = styled.div`
  margin-left: 1rem;
`;

const PagenationBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
`;
const PagenationButton = styled.div<{ active: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.active &&
    css`
      background: gray;
    `}
`;
const PagenationLeft = styled(IoIosArrowBack)<{ firstpage: string }>`
  display: inline;
  ${(props) =>
    props.firstpage === 'true' &&
    css`
      display: none;
    `}
`;
const PagenationRight = styled(IoIosArrowForward)<{ lastpage: string }>`
  display: inline;
  ${(props) =>
    props.lastpage === 'true' &&
    css`
      display: none;
    `}
`;
export default SearchResult;
