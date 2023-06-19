// компонент с вёрсткой баннера страницы «О проекте».
import NavTab from '../NavTab/NavTab';
import './Promo.css';

const Promo = () => {
  return (
    <section className='promo main__promo'>
      <h1 className='promo__heading'>Учебный проект студента факультета Веб-разработки.</h1>
      <NavTab />
    </section>
  )
}

export default Promo;
