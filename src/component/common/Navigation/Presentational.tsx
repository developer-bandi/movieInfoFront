import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Style';

const Navigation = () => {
  const location = useLocation();
  const [templocation, setTempLocation] = useState(location.pathname);
  return (
    <styles.MainBlock active={location.pathname === '/' ? 'false' : 'true'}>
      <styles.MenuListBlock>
        {menulist.map((data, index) => {
          return (
            <styles.MenuBlock key={menulinklist[index]}>
              <styles.Menu
                active={templocation === menulinklist[index] ? 'true' : 'false'}
                to={menulinklist[index]}
                onMouseOver={() => {
                  setTempLocation(menulinklist[index]);
                }}
                onMouseOut={() => {
                  setTempLocation(location.pathname);
                }}
              >
                {data}
              </styles.Menu>
            </styles.MenuBlock>
          );
        })}
      </styles.MenuListBlock>
    </styles.MainBlock>
  );
};

const menulist: string[] = ['홈', '랭킹', '영화검색', '나만의 영화'];
const menulinklist: string[] = ['/', '/sortedmovie', '/search', '/favorites'];

export default Navigation;
