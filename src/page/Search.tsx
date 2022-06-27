import Footer from '../component/common/Footer/Presentational';
import Nav from '../component/common/Navigation/Presentational';
import HeaderContainer from '../component/common/Header/Container';
import SearchBarContainer from '../component/Search/SearchBar/Container';
import SearchResultContainer from '../component/Search/SearchResult/Container';
const Search = () => {
  return (
    <>
      <HeaderContainer />
      <Nav />
      <SearchBarContainer />
      <SearchResultContainer />
      <Footer />
    </>
  );
};

export default Search;
