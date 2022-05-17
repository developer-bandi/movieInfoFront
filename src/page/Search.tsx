import Footer from '../component/common/Footer';
import Nav from '../component/common/Nav';
import HeaderContainer from '../container/HeaderContainer';
import SearchBarContainer from '../container/SearchBarContainer';
import SearchResultContainer from '../container/SearchResultContainer';
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
