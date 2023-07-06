// компонент страницы с сохранёнными карточками фильмов
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { useEffect } from 'react';
import Error from '../Error/Error';

const SavedMovies = ({
  isLoading,
  likedMovies,
  getLikedMovies,
  onRemove,
  handleSavedSearch,
  isFilterChecked,
  handleCheckClick,
  setIsFilterChecked,
  lastSearchLiked,
  isError,
  isNotFoundError
}) => {

  useEffect(() => {
    getLikedMovies()
    setIsFilterChecked(lastSearchLiked.filter)
  }, [])

  function renderSwitch(param) {

    switch (true) {
      case isError:
        return (
          <Error
            errorText='Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.' />
        );
      case isNotFoundError:
        return (
          <Error errorText='Ничего не найдено' />
        );
      default:
        return (
          <>
            <MoviesCardList cards={likedMovies} likedMovies={likedMovies} onRemove={onRemove} />
          </>
        );
    }
  }

  return (
    <main className='movies'>
      <SearchForm handleSavedSearch={handleSavedSearch} lastSearchLiked={lastSearchLiked} />
      <FilterCheckbox isFilterChecked={isFilterChecked} handleCheckClick={handleCheckClick} />
      {
        isLoading ?
          <Preloader />
          :
          renderSwitch()
      }
    </main>

  )
}

export default SavedMovies;

