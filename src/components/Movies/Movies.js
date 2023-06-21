// компонент страницы с поиском по фильмам
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';
import Preloader from '../Preloader/Preloader';
import Error from '../Error/Error';

const Movies = ({
  isLoading,
  handleSearch,
  cards,
  isError,
  isNotFoundError
}) => {

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
          <MoviesCardList cards={cards} />
        );
    }
  }

  return (
    <main className='movies'>
      <SearchForm handleSearch={handleSearch} />
      <FilterCheckbox />


      {
        isLoading ?
          <Preloader />
          :
          renderSwitch()
      }

      <More />
    </main>

  )
}

export default Movies;
