// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

const MoviesCardList = ({ cards }) => {

  return (
    <section className='movies-list movies__movies-list'>

      <ul className='movies-list__ul'>
        {cards.map((movie) => {
          return (
            <li>
              <MoviesCard image={`https://api.nomoreparties.co${movie.image.url}`} name={movie.nameRU} duration={movie.duration} />
            </li>
          )
        })}
      </ul>

    </section >

  )
}

export default MoviesCardList;
