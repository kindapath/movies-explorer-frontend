// компонент одной карточки фильма
import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';


const MoviesCard = ({ image, name, duration }) => {
  //temporary solution
  const [isLiked, setIsLiked] = useState(false)
  const location = useLocation()

  return (
    <article className='card'>
      <img className='card__image' src={image} alt='Фото карточки' />

      <div className='card__row'>

        <div className='card__column'>
          <h2 className='card__heading'>{name}</h2>
          <p className='card__time'>{duration}</p>
        </div>

        <div className='card__column card__column_like'>
          {location.pathname === '/movies' &&
            <button className="card__like" onClick={() => { setIsLiked(!isLiked) }}>
              <svg
                className={`card__like-icon ${isLiked ? 'card__like-icon_liked' : ''}`}
                viewBox="0 0 14 12"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M6.65242 1.89789L7.01419 2.24773L7.36168 1.8837C8.08219 1.12888 8.97817 0.5 10.1818 0.5C12.1019 0.5 13.5 2.02862 13.5 4C13.5 4.9368 13.0747 5.73587 12.3847 6.40496L7 11.3228L1.60992 6.40004L1.59988 6.39087L1.58936 6.38227C0.885614 5.80642 0.5 4.96765 0.5 4C0.5 2.02862 1.89813 0.5 3.81818 0.5C5.01333 0.5 5.90847 1.17846 6.65242 1.89789Z" stroke="currentColor" />
              </svg>
            </button>
          }

          {location.pathname === '/saved-movies' &&
            <button className="card__remove" onClick={() => { setIsLiked(!isLiked) }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.06077 3.8822L7.30003 1.64294L6.23937 0.582275L4.00011 2.82154L1.76097 0.582391L0.700309 1.64305L2.93945 3.8822L0.58252 6.23913L1.64318 7.29979L4.00011 4.94286L6.35716 7.29991L7.41782 6.23925L5.06077 3.8822Z" fill="white" />
              </svg>

            </button>
          }
        </div>

      </div>
    </article>
  )
}

export default MoviesCard;
