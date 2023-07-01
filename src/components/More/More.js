// кнопка Ещё

import './More.css';

const More = ({
  handleMore
}) => {
  return (
    <button onClick={handleMore} className='more movies__more'>
      <p className='more__text'>Ещё</p>
    </button>
  )
}
export default More;
