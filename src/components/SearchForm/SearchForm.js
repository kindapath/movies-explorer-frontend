// форма поиска, куда пользователь будет вводить запрос
import { useLocation } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useForm';
import './SearchForm.css';
import { useEffect } from 'react';
import { SAVEDMOVIESPATH } from '../../constant/constants';
import { getLastSearch } from '../../utils/utils';

const SearchForm = ({ handleSearch, handleSavedSearch, lastSearch }) => {

  const {
    values,
    onChange,
    formValid,
    resetForm
  } = useFormWithValidation()

  const location = useLocation()
  const savedMoviesLocation = location.pathname === SAVEDMOVIESPATH

  useEffect(() => {
    if (savedMoviesLocation) {
      resetForm({ search: '' })
    } else {
      resetForm({ search: getLastSearch('text') })
    }
  }, [])

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
        value={values.search}

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
