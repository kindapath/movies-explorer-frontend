// компонент страницы с поиском по фильмам
import { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';
import Preloader from '../Preloader/Preloader';

const Movies = ({ handleLogin }) => {

  const isLoading = false

  // временная логика
  useEffect(() => {
    handleLogin()
  }, [])

  return (
    <main className='movies'>
      <SearchForm />
      <FilterCheckbox />
      {
        isLoading ?
          <Preloader />
          :
          <MoviesCardList />
      }

      <More />
    </main>

  )
}

export default Movies;
