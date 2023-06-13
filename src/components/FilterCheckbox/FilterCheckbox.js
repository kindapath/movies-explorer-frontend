//
import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <div className='filter movies__filter'>
      <label className="filter__switch">
        <input className='filter__input' type="checkbox" />
        <span className="filter__slider"></span>
      </label>
      <p className='filter__text'>Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox;
