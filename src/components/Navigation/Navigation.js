// компонент, который отвечает за меню навигации на сайте.
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation()
  return (
    <div className='navigation'>
      <Link className={`link navigation__page-link ${location.pathname === '/movies' ? 'navigation__page-link_active' : ''} `} to="/movies">Фильмы</Link>
      <Link className={`link navigation__page-link ${location.pathname === '/saved-movies' ? 'navigation__page-link_active' : ''} `} to="/saved-movies">Сохраненные фильмы</Link>
    </div>
  )
}

export default Navigation;
