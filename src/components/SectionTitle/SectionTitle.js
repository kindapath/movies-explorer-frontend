// компонент с описанием дипломного проекта
import './SectionTitle.css';

const SectionTitle = ({ title }) => {
  return (
    <article className='section-title'>
      <h2 className='section-title__heading'>{title}</h2>
      <hr className='section-title__line' />
    </article>
  )
}

export default SectionTitle;
