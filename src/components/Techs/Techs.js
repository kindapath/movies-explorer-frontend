// компонент с использованными технологиями.
import Section from '../Section/Section';
import SectionTitle from '../SectionTitle/SectionTitle';
import './Techs.css';

const Techs = () => {
  return (
    <Section className="techs" modifier={'section_techs'}>
      <SectionTitle title="Технологии" />

      <h2 className='techs__heading'>7 технологий</h2>
      <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>

      <ul className='techs__list'>

        <li className='techs__item'>
          <p className='techs__name'>HTML</p>
        </li>

        <li className='techs__item'>
          <p className='techs__name'>CSS</p>
        </li>

        <li className='techs__item'>
          <p className='techs__name'>JS</p>
        </li>

        <li className='techs__item'>
          <p className='techs__name'>React</p>
        </li>

        <li className='techs__item'>
          <p className='techs__name'>Git</p>
        </li>

        <li className='techs__item'>
          <p className='techs__name'>Express.js</p>
        </li>

        <li className='techs__item'>
          <p className='techs__name'>mongoDB</p>
        </li>

      </ul>

    </Section>
  )
}

export default Techs;
