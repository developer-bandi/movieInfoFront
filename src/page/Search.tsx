import Footer from '../component/common/Footer';
import Header from '../component/common/Header';
import SearchBarContainer from '../container/SearchBarContainer';
import SearchResultContainer from '../container/SearchResultContainer';
const Search = () => {
  return (
    <>
      <Header />
      <SearchBarContainer />
      <SearchResultContainer />
      <Footer />
    </>
  );
};

export default Search;
