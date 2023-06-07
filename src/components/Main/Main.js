// компонент страницы «О проекте». Он будет содержать только презентационные компоненты и в будущем, за исключением шапки навигации.
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import './Main.css';

const Main = () => {
  return (
    <div className='main'>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </div>
  )
}

export default Main;
