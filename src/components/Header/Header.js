// компонент, который отрисовывает шапку сайта на страницу
import './Header.css';
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom';

import AccountLink from '../AccountLink/AccountLink';
import Navigation from '../Navigation/Navigation';

const Header = ({ isLoggedIn }) => {

  return (
    <header className='header'>
      <Link className='link header__page-link header__page-link_active' to="/">
        <img className="link logo" src={logo} alt="Logo" />
      </Link>

      {
        isLoggedIn ?
          <>
            <Navigation />
            <AccountLink />
          </>

          :
          <div className='header__auth'>
            <Link className='link header__register' to="/signup">Регистрация</Link>
            <Link className='link header__login' to="/signin">Войти</Link>
          </div>
      }


    </header>
  )
}

export default Header;
