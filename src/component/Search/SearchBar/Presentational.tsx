import { useState } from 'react';
import styles from './Style';

interface SearchBarProps {
  latest: string[];
  searchMovies: any;
  deleteComment: Function;
  settingvalue: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}

const SearchBar = ({
  latest,
  searchMovies,
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
          onKeyPress={searchMovies}
          onChange={settingvalue}
          onClick={showLatest}
          value={value}
        ></styles.SearchInput>
        <styles.SearchButton onClick={searchMovies}></styles.SearchButton>
      </styles.InputBlock>
      <styles.LatestSearchListBlock active={focus}>
        {latest[0] === 'default' ? (
          <styles.LatestSearchNull>
            {'최근 검색 내용이 없습니다'}
          </styles.LatestSearchNull>
        ) : (
          latest.map((data, index) => (
            <styles.LatestSearch key={index}>
              <div onClick={searchMovies}>{data}</div>
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
