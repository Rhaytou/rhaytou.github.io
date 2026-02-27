import { useEffect, useRef, useState } from 'react';
import './styles/about.css';

function useReveal(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function About({ data }) {
  const headerRef  = useRef(null);
  const bioRef     = useRef(null);
  const expRef     = useRef(null);
  const eduRef     = useRef(null);
  const headerVis  = useReveal(headerRef);
  const bioVis     = useReveal(bioRef);
  const expVis     = useReveal(expRef);
  const eduVis     = useReveal(eduRef);

  const [tab, setTab] = useState('experience');

  return (
    <section id="about" className="about-section">
      <div className="section-container">

        {/* Header */}
        <div ref={headerRef} className={`about-header ${headerVis ? 'visible' : ''}`}>
          <p className="section-label">Background</p>
          <h2 className="section-title">About</h2>
        </div>

        <div className="about-layout">

          {/* Bio column */}
          <div ref={bioRef} className={`about-bio ${bioVis ? 'visible' : ''}`}>
            <div className="about-bio-eyebrow">
              <span className="about-availability">{data.availability}</span>
            </div>
            <p className="about-bio-text">{data.bio}</p>

            <dl className="about-quick-facts">
              <div className="fact">
                <dt>Location</dt>
                <dd>{data.location}</dd>
              </div>
              <div className="fact">
                <dt>Languages</dt>
                <dd>Arabic · French · English</dd>
              </div>
              <div className="fact">
                <dt>Focus</dt>
                <dd>Blockchain · Fullstack · Systems</dd>
              </div>
            </dl>
          </div>

          {/* Timeline column */}
          <div className="about-timeline-col">
            {/* Tabs */}
            <div className="about-tabs">
              <button
                className={tab === 'experience' ? 'active' : ''}
                onClick={() => setTab('experience')}
              >
                Experience
              </button>
              <button
                className={tab === 'education' ? 'active' : ''}
                onClick={() => setTab('education')}
              >
                Education
              </button>
            </div>

            {/* Experience */}
            <div
              ref={expRef}
              className={`about-timeline ${tab === 'experience' ? 'active' : ''} ${expVis ? 'visible' : ''}`}
            >
              {data.experience.map((item, i) => (
                <div key={i} className="timeline-item" style={{ animationDelay: `${i * 0.12}s` }}>
                  <div className="timeline-dot" aria-hidden="true" />
                  <div className="timeline-content">
                    <p className="timeline-period">{item.period}</p>
                    <h4 className="timeline-role">{item.role}</h4>
                    <p className="timeline-org">{item.company}</p>
                    <p className="timeline-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div
              ref={eduRef}
              className={`about-timeline ${tab === 'education' ? 'active' : ''} ${eduVis ? 'visible' : ''}`}
            >
              {data.education.map((item, i) => (
                <div key={i} className="timeline-item" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="timeline-dot" aria-hidden="true" />
                  <div className="timeline-content">
                    <p className="timeline-period">{item.year}</p>
                    <h4 className="timeline-role">{item.degree}</h4>
                    <p className="timeline-org">{item.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;



