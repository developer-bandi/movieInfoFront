import { useState } from 'react';
import useSearchBar from './Hook';
import SearchBarPresentational from './Presentational';

const SearchBarContainer = () => {
  const { value, latest, searchMovies, settingvalue, deleteComment } =
    useSearchBar();
  const [focus, setFocus] = useState(false);
  return (
    <SearchBarPresentational
      latest={latest}
      searchMovies={searchMovies}
      deleteComment={deleteComment}
      settingvalue={settingvalue}
      value={value}
      focus={focus}
      setFocus={setFocus}
    />
  );
};

export default SearchBarContainer;
