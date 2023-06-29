// компонент страницы с сохранёнными карточками фильмов
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { useEffect } from 'react';

const SavedMovies = ({ isLoading, likedMovies, getLikedMovies }) => {

  useEffect(() => {
    getLikedMovies()
  }, [])

  return (
    <main className='movies'>
      <SearchForm />
      <FilterCheckbox />
      {
        isLoading ?
          <Preloader />
          :
          <MoviesCardList cards={likedMovies} likedMovies={likedMovies} />
      }
    </main>

  )
}

export default SavedMovies;

