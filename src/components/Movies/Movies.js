// компонент страницы с поиском по фильмам
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';
import Preloader from '../Preloader/Preloader';

const Movies = ({ isLoading }) => {

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
