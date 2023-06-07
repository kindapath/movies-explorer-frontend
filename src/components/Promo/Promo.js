// компонент с вёрсткой баннера страницы «О проекте».
import PromoAnchors from '../PromoAnchors/PromoAnchors';
import './Promo.css';

const Promo = () => {
  return (
    <div className='promo main__promo'>
      <h1 className='promo__heading'>Учебный проект студента факультета Веб-разработки.</h1>
      <PromoAnchors />
    </div>
  )
}

export default Promo;
