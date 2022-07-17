import styles from './Style';

interface SearchBarProps {
  latest: string[];
  searchMovies: any;
  deleteComment: (index: number) => void;
  settingvalue: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  focus: boolean;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBarPresentational = ({
  latest,
  searchMovies,
  deleteComment,
  settingvalue,
  value,
  focus,
  setFocus,
}: SearchBarProps) => {
  return (
    <styles.MainBlock>
      <styles.InputBlock>
        <styles.SearchInput
          type="text"
          onKeyPress={(e) => searchMovies(e)}
          onChange={(e) => settingvalue(e)}
          onClick={() => setFocus(!focus)}
          value={value}
          data-testid={'searchInput'}
        ></styles.SearchInput>
        <styles.SearchButton
          data-testid={'searchButton'}
          onClick={searchMovies}
        ></styles.SearchButton>
      </styles.InputBlock>
      <styles.LatestSearchListBlock>
        {focus ? (
          latest.length === 0 ? (
            <styles.LatestSearchNull>
              {'최근 검색 내용이 없습니다'}
            </styles.LatestSearchNull>
          ) : (
            latest.map((data, index) => (
              <styles.LatestSearch key={index}>
                <div data-testid={'data'} onClick={searchMovies}>
                  {data}
                </div>
                <styles.DeleteButton
                  onClick={(e) => {
                    deleteComment(index);
                  }}
                  data-testid={'deleteButton'}
                />
              </styles.LatestSearch>
            ))
          )
        ) : null}
      </styles.LatestSearchListBlock>
    </styles.MainBlock>
  );
};

export default SearchBarPresentational;
