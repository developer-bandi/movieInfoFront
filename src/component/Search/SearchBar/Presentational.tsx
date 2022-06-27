import { useState } from 'react';
import styles from './Style';

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
    <styles.MainBlock>
      <styles.InputBlock>
        <styles.SearchInput
          type="text"
          onKeyPress={searchMovie}
          onChange={settingvalue}
          onClick={showLatest}
          value={value}
        ></styles.SearchInput>
        <styles.SearchButton onClick={searchMovie}></styles.SearchButton>
      </styles.InputBlock>
      <styles.LatestSearchListBlock active={focus}>
        {latest[0] === 'default' ? (
          <styles.LatestSearchNull>
            {'최근 검색 내용이 없습니다'}
          </styles.LatestSearchNull>
        ) : (
          latest.map((data, index) => (
            <styles.LatestSearch key={index}>
              <div onClick={searchMovie}>{data}</div>
              <styles.DeleteButton
                onClick={(e) => {
                  deleteComment(index);
                }}
              />
            </styles.LatestSearch>
          ))
        )}
      </styles.LatestSearchListBlock>
    </styles.MainBlock>
  );
};

export default SearchBar;
