// компонент страницы с сохранёнными карточками фильмов
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { useEffect } from 'react';

const SavedMovies = ({
  isLoading,
  likedMovies,
  getLikedMovies,
  onRemove,
  handleSavedSearch,
  isFilterChecked,
  handleCheckClick,
  setIsFilterChecked
}) => {

  useEffect(() => {
    getLikedMovies()
    setIsFilterChecked(false)
  }, [])

  return (
    <main className='movies'>
      <SearchForm handleSavedSearch={handleSavedSearch} />
      <FilterCheckbox isFilterChecked={isFilterChecked} handleCheckClick={handleCheckClick} />
      {
        isLoading ?
          <Preloader />
          :
          <MoviesCardList cards={likedMovies} likedMovies={likedMovies} onRemove={onRemove} />
      }
    </main>

  )
}

export default SavedMovies;

