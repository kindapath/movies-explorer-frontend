// компонент, который отрисовывает шапку сайта на страницу
import './Header.css';
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom';

import AccountLink from '../AccountLink/AccountLink';
import Navigation from '../Navigation/Navigation';
import Menu from '../Menu/Menu';
import MenuButton from '../MenuButton/MenuButton';
import { useEffect, useState } from 'react';

const Header = ({ isLoggedIn, items }) => {
  const [menuActive, setMenuActive] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null);

  const handleMenuClick = () => {
    setMenuActive(!menuActive);
  };

  const handleScreenWidth = () => {
    setScreenWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleScreenWidth);
    console.log('size')

    return (() => {
      window.removeEventListener('resize', handleScreenWidth);
    })
  }, [screenWidth])

  return (
    <header className='header'>
      <Link className='link header__page-link' to="/">
        <img className="link logo" src={logo} alt="Logo" />
      </Link>

      {
        isLoggedIn ?
          <>
            <Navigation />

            {screenWidth > 1024 && <AccountLink />}

            <MenuButton
              menuActive={menuActive}
              handleMenuClick={handleMenuClick}
            />

            <Menu
              menuActive={menuActive}
              handleMenuClick={handleMenuClick}
            />
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
