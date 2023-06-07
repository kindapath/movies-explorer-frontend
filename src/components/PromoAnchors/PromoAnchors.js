// компонент с вёрсткой баннера страницы «О проекте».
import './PromoAnchors.css';

const PromoAnchors = () => {
  return (
    <nav className='promo__anchors'>
      <ul className='promo__list'>

        <li className='promo__list-item'>
          <a className='promo__link' href="#about-project">О проекте</a>
        </li>

        <li className='promo__list-item'>
          <a className='promo__link' href="#techs">Технологии</a>
        </li>

        <li className='promo__list-item'>
          <a className='promo__link' href="#student">Студент</a>
        </li>

      </ul>
    </nav>
  )
}

export default PromoAnchors;
