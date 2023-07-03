// форма поиска, куда пользователь будет вводить запрос
import { useLocation } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useForm';
import './SearchForm.css';

const SearchForm = ({ handleSearch, handleSavedSearch }) => {

  const {
    values,
    onChange,
    formValid,
  } = useFormWithValidation()

  const location = useLocation()
  const savedMoviesLocation = location.pathname === '/saved-movies'

  function onSubmit(e) {
    e.preventDefault()

    if (savedMoviesLocation) {
      handleSavedSearch(values.search)
      return
    }

    handleSearch(values.search)
  }

  return (
    <form
      className='search movies__search'
      onSubmit={onSubmit}

    >
      <input
        name="search"
        className='search__input'
        placeholder='Фильм'
        required

        onChange={onChange}
        value={values.search || ''}

      />

      <button
        className={`search__button button ${formValid ? '' : 'button_disabled'}`}
        type='submit'

        disabled={formValid ? '' : true}

      >Поиск</button>
    </form>
  )
}

export default SearchForm;
