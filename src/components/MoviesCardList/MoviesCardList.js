// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

const MoviesCardList = ({ cards, onLike, likedMovies, onRemove }) => {

  return (
    <section className='movies-list movies__movies-list'>

      <ul className='movies-list__ul'>
        {cards.map((movie) => {
          return (
            <li>
              <MoviesCard
                movie={movie}

                onLike={onLike}
                onRemove={onRemove}
                likedMovies={likedMovies}
              />
            </li>
          )
        })}
      </ul>

    </section >

  )
}

export default MoviesCardList;
