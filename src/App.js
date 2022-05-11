import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Favorites from './page/Favorites';
import Home from './page/Home';
import Moviedetail from './page/Moviedetail';
import Search from './page/Search';
import Sortedmovie from './page/movieranking';
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/sortedmovie'} element={<Sortedmovie />} />
        <Route path={'/favorites'} element={<Favorites />} />
        <Route path={'/search'} element={<Search />} />
        <Route path={'/moviedetail/:movieid'} element={<Moviedetail />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
