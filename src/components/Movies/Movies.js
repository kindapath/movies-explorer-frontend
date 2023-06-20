// компонент страницы с поиском по фильмам
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';
import Preloader from '../Preloader/Preloader';

const Movies = ({ isLoading, handleSearch, cards }) => {

  return (
    <main className='movies'>
      <SearchForm handleSearch={handleSearch} />
      <FilterCheckbox />
      {
        isLoading ?
          <Preloader />
          :
          <MoviesCardList cards={cards} />
      }

      <More />
    </main>

  )
}

export default Movies;
