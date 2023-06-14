// компонент страницы с сохранёнными карточками фильмов
import { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({ isLoggedIn, handleLogin }) => {

  // временная логика
  useEffect(() => {
    handleLogin()
  }, [])

  return (
    <main className='movies'>
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList />
    </main>

  )
}

export default SavedMovies;

