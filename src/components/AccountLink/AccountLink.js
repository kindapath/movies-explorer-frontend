import React from 'react';
import { Link } from 'react-router-dom';
import './AccountLink.css';
import accountIcon from '../../images/account.svg'


function AccountLink(props) {
  return (
    <Link className='account link' to='/profile'>
      <img className='account__icon' src={accountIcon} alt="кнопка аккаунта" />
      <p className='account__text'>Аккаунт</p>
    </Link>
  );
}

export default AccountLink;
