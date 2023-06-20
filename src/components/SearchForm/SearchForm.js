// форма поиска, куда пользователь будет вводить запрос
import './SearchForm.css';

const SearchForm = ({ handleSearch }) => {

  function onSubmit(e) {
    e.preventDefault()
    handleSearch()
  }

  return (
    <form className='search movies__search' onSubmit={onSubmit}>
      <input className='search__input' placeholder='Фильм' required />
      <button className='search__button button' type='submit'>Поиск</button>
    </form>
  )
}

export default SearchForm;
