// компонент с информацией о студенте.
import Section from '../Section/Section';
import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <Section className="about-me" modifier={'section_about-me'}>
      <SectionTitle title="Студент" />

    </Section>
  )
}

export default AboutMe;
