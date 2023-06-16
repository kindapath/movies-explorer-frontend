// компонент формы аутентификации
import './AuthPage.css';
import logo from '../../images/logo.svg'

import { Link } from 'react-router-dom';

const AuthPage = ({
  welcomeText,
  questionText,
  linkText,
  linkTo,
  children
}) => {
  return (
    <section className='auth-page'>
      <div className='auth-page__container'>
        <img className="logo" src={logo} alt="Логотип" />

        <h1 className='auth-page__hello'>{welcomeText}</h1>

        {children}

        <p className='auth-page__text'>{questionText} <Link className='auth-page__link link' to={linkTo}>{linkText}</Link></p>

      </div>
    </section>
  )
}

export default AuthPage;
