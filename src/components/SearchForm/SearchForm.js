// форма поиска, куда пользователь будет вводить запрос
import './SearchForm.css';

const SearchForm = () => {
  return (
    <form className='search movies__search '>
      <input className='search__input' placeholder='Фильм' />
      <button className='search__button button'>Поиск</button>
    </form>
  )
}

export default SearchForm;
