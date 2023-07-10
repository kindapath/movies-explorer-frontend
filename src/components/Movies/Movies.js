// компонент страницы с поиском по фильмам
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';
import Preloader from '../Preloader/Preloader';
import Error from '../Error/Error';
import { useEffect } from 'react';

const Movies = ({
  isLoading,
  handleSearch,
  cards,
  isError,
  isNotFoundError,
  onLike,
  likedMovies,
  getLikedMovies,
  handleMore,
  isFilterChecked,
  handleCheckClick,
  setIsFilterChecked,
  lastSearch,
  hiddenMore
}) => {

  useEffect(() => {
    setIsFilterChecked(lastSearch.filter)
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
            <MoviesCardList likedMovies={likedMovies} onLike={onLike} cards={cards} />
            <More hiddenMore={hiddenMore} handleMore={handleMore} />
          </>
        );
    }
  }

  return (
    <main className='movies'>
      <SearchForm handleSearch={handleSearch} lastSearch={lastSearch} />
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

export default Movies;
