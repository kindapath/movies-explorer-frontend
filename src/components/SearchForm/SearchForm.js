// форма поиска, куда пользователь будет вводить запрос
import { useFormWithValidation } from '../../hooks/useForm';
import './SearchForm.css';

const SearchForm = ({ handleSearch }) => {

  const {
    values,
    onChange,
    formValid,
  } = useFormWithValidation()

  function onSubmit(e) {
    e.preventDefault()
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
