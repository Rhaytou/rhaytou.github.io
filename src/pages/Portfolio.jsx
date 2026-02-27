import content from '../data/content.json';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';

function Portfolio() {
  return (
    <>
        <NavBar />
        <main>
            <Hero    data={content.about} />
            <Skills  data={content.skills} />
            <Projects data={content.projects} />
            <Services data={content.services} />
            <About   data={content.about} />
            <Contact data={content.contact} />
        </main>
    </>
  );
}

export default Portfolio;





