import { useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { BsXLg } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';

interface SearchBarProps {
  latest: string[];
  searchMovie: any;
  deleteComment: Function;
  settingvalue: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}

const SearchBar = ({
  latest,
  searchMovie,
  deleteComment,
  settingvalue,
  value,
}: SearchBarProps) => {
  const [focus, setFocus] = useState(false);
  const showLatest = () => {
    setFocus(!focus);
  };

  return (
    <SearchBarBlock>
      <InputBlock>
        <SearchInputBox
          type="text"
          onKeyPress={searchMovie}
          onChange={settingvalue}
          onClick={showLatest}
          value={value}
        ></SearchInputBox>
        <SearchButton onClick={searchMovie}></SearchButton>
      </InputBlock>
      <LatestSearchBlock active={focus}>
        {latest[0] === 'default' ? (
          <LatestNullSearchContent>
            {'최근 검색 내용이 없습니다'}
          </LatestNullSearchContent>
        ) : (
          latest.map((data, index) => (
            <LatestSearchContent key={index}>
              <div onClick={searchMovie}>{data}</div>
              <DeleteButton
                onClick={(e) => {
                  deleteComment(index);
                }}
              />
            </LatestSearchContent>
          ))
        )}
      </LatestSearchBlock>
    </SearchBarBlock>
  );
};

const SearchBarBlock = styled.div`
  background: ${(props) => props.theme.background};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 5rem;
  padding-top: 5rem;
  border-bottom: 1px solid #e8e8e8;

  @media screen and (max-width: 500px) {
    padding-bottom: 1rem;
    padding-top: 1rem;
  }
`;
const InputBlock = styled.div`
  display: flex;
  border: 1px solid black;
  width: 55rem;
  background: white;
  @media screen and (max-width: 500px) {
    width: 20rem;
  }
`;

const SearchInputBox = styled.input`
  width: 50rem;
  font-size: 30px;
  height: 4rem;
  border: none;
  &:focus {
    outline: none;
  }

  @media screen and (max-width: 500px) {
    width: 17rem;
    height: 2rem;
    font-size: 20px;
  }
`;

const SearchButton = styled(AiOutlineSearch)`
  width: 3rem;
  height: 3rem;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  margin-left: 1rem;

  &:hover {
    color: #b2b2b2;
  }

  @media screen and (max-width: 500px) {
    width: 2rem;
    height: 2rem;
    font-size: 15px;
    margin-top: 0.1rem;
  }
`;

const LatestSearchBlock = styled.div<{ active: boolean }>`
  background: white;
  border: 1px solid black;
  border-top: none;
  display: none;
  width: 55rem;
  @media screen and (max-width: 500px) {
    width: 20rem;
    font-size: 15px;
  }
  ${(props) =>
    props.active &&
    css`
      display: block;
    `}
`;

const LatestSearchContent = styled.div`
  font-size: 15px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  & + & {
    border-top: 1px solid #e1e1e1;
  }
`;
const DeleteButton = styled(BsXLg)`
  width: 0.7rem;
  height: 0.7rem;
  margin-left: 0.5rem;
  m &:hover {
    color: gray;
  }
  @media screen and (max-width: 500px) {
    &:hover {
      color: black;
    }
  }
`;
const LatestNullSearchContent = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;
  text-align: center;
  @media screen and (max-width: 500px) {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`;

export default SearchBar;
