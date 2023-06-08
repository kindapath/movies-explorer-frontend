// компонент с вёрсткой баннера страницы «О проекте».
import { Link } from 'react-router-dom';
import './PromoAnchors.css';

const PromoAnchors = () => {
  return (
    <nav className='promo__anchors'>
      <ul className='promo__list'>

        <li className='link promo__list-item'>
          <Link className='promo__link' to="#about-project">О проекте</Link>
        </li>

        <li className='link promo__list-item'>
          <Link className='promo__link' to="#techs">Технологии</Link>
        </li>

        <li className='link promo__list-item'>
          <Link className='promo__link' to="#student">Студент</Link>
        </li>

      </ul>
    </nav>
  )
}

export default PromoAnchors;
