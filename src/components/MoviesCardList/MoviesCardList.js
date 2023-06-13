// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

const MoviesCardList = () => {


  return (
    <section className='movies-list movies__movies-list'>

      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />

    </section>

  )
}

export default MoviesCardList;
