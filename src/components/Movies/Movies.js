// компонент страницы с поиском по фильмам
import { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css';

const Movies = ({ isLoggedIn, handleLogin }) => {

  // временная логика
  useEffect(() => {
    handleLogin()
  }, [])

  return (
    <main>
      <Header isLoggedIn={isLoggedIn} />
      <Footer />
    </main>

  )
}

export default Movies;
