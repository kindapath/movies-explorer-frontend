// компонент, который отвечает за меню навигации на сайте.
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <div className='navigation'>
      <Link className='link navigation__page-link header__page-link_active' to="/movies">Фильмы</Link>
      <Link className='link navigation__page-link' to="/saved-movies">Сохраненные фильмы</Link>
    </div>
  )
}

export default Navigation;
