// компонент с описанием дипломного проекта
import './Section.css';

const Section = ({ addClass, children }) => {
  return (
    <section className={`section ${addClass}`}>
      {children}
    </section>
  )
}

export default Section;
