// компонент страницы с сохранёнными карточками фильмов
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const SavedMovies = ({ isLoading }) => {

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
    </main>

  )
}

export default SavedMovies;

