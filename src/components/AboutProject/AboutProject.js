// компонент с описанием дипломного проекта

import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className="about-prj main__about-prj">
      <SectionTitle title="О проекте" />
      <div className='about-prj__description' id="about-project">

        <div className='about-prj__item'>
          <h3 className='about-prj__item-heading'>Дипломный проект включал 5 этапов</h3>
          <p className='about-prj__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>

        <div className='about-prj__item'>
          <h3 className='about-prj__item-heading'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-prj__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>

      </div>

      <div className='about-prj__bar'>

        <div className='about-prj__bar-column'>
          <div className='about-prj__bar-box about-prj__bar-box_color_green'>
            <p className='about-prj__text-bar about-prj__text-bar_color_black'>1 неделя</p>
          </div>
          <div className='about-prj__bar-box'>
            <p className='about-prj__text-bar about-prj__text-bar_color_gray'>Back-end</p>
          </div>
        </div>

        <div className='about-prj__bar-column'>
          <div className='about-prj__bar-box about-prj__bar-box_color_gray'>
            <p className='about-prj__text-bar'>4 недели</p>
          </div>

          <div className='about-prj__bar-box'>
            <p className='about-prj__text-bar about-prj__text-bar_color_gray'>Front-end</p>
          </div>
        </div>

      </div>

    </section>
  )
}

export default AboutProject;
