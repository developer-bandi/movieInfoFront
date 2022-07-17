/*eslint-disable*/
import useSearchResult from './Hook';
import SearchResultPresentational from './Presentational';

const SearchResultContainer = () => {
  const {
    setPrevPageList,
    setNextPageList,
    selectPage,
    activepageNumber,
    searchResult,
    pageListNumber,
  } = useSearchResult();
  return (
    <SearchResultPresentational
      searchResult={searchResult}
      setPrevPageList={setPrevPageList}
      setNextPageList={setNextPageList}
      activepageNumber={activepageNumber}
      selectPage={selectPage}
      pageListNumber={pageListNumber}
    />
  );
};

export default SearchResultContainer;
