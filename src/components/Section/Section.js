// компонент с описанием дипломного проекта
import './Section.css';

const Section = ({ modifier, children }) => {
  return (
    <section className={`section ${modifier}`}>
      {children}
    </section>
  )
}

export default Section;
