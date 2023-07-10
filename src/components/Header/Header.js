// компонент, который отрисовывает шапку сайта на страницу
import './Header.css';
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom';

import AccountLink from '../AccountLink/AccountLink';
import Navigation from '../Navigation/Navigation';
import Menu from '../Menu/Menu';
import MenuButton from '../MenuButton/MenuButton';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import { SIGNINPATH, SIGNUPPATH } from '../../constant/constants';

const Header = ({ isLoggedIn, items }) => {
  const [menuActive, setMenuActive] = useState(false);
  const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const handleMenuClick = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header className='header'>
      <Link className='link header__page-link' to="/">
        <img className="link logo" src={logo} alt="Logo" />
      </Link>

      {
        isLoggedIn ?
          <>
            <Navigation />

            {isBigScreen && <AccountLink />}

            <MenuButton
              menuActive={menuActive}
              handleMenuClick={handleMenuClick}
            />

            <Menu
              menuActive={menuActive}
              handleMenuClick={handleMenuClick}
              isLoggedIn={isLoggedIn}
            />
          </>

          :

          <div className='header__auth'>
            <Link className='link header__register' to={SIGNUPPATH}>Регистрация</Link>
            <Link className='link header__login' to={SIGNINPATH}>Войти</Link>
          </div>
      }
    </header>
  )
}

export default Header;
