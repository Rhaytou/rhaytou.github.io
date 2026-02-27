import { useEffect, useRef, useState } from 'react';
import './styles/projects.css';

const CATEGORY_COLORS = {
  'Blockchain':         '#3B577A',
  'Hardware Engineering': '#2A5A4A',
  'Software Engineering': '#4A3B6A',
};

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

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const visible = useReveal(ref);
  const [open, setOpen] = useState(false);
  const accentColor = CATEGORY_COLORS[project.category] || '#3B577A';

  const allTech = Object.values(project.tech_stack || {}).flat();

  return (
    <article
      ref={ref}
      className={`project-card ${visible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.1}s`, '--accent': accentColor }}
    >
      <div className="project-card-inner">
        {/* Top row */}
        <div className="project-meta">
          <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
          <span className="project-category">{project.category}</span>
          <span className="project-status">{project.status}</span>
        </div>

        {/* Title */}
        <h3 className="project-title">{project.title}</h3>

        {/* Summary */}
        <p className="project-summary">{project.summary}</p>

        {/* Tags */}
        <div className="project-tags">
          {project.tags.slice(0, 5).map(tag => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
          {project.tags.length > 5 && (
            <span className="project-tag project-tag-more">+{project.tags.length - 5}</span>
          )}
        </div>

        {/* Expand toggle */}
        <button
          className={`project-expand-btn ${open ? 'open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
        >
          <span>{open ? 'Collapse' : 'Read more'}</span>
          <span className="expand-arrow" aria-hidden="true">↓</span>
        </button>

        {/* Expanded content */}
        <div className={`project-expanded ${open ? 'open' : ''}`}>
          <p className="project-description">{project.description}</p>

          <div className="project-highlights">
            <p className="highlights-label">Highlights</p>
            <ul>
              {project.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          <div className="project-stack">
            <p className="stack-label">Tech Stack</p>
            <div className="stack-tags">
              {allTech.map(t => (
                <span key={t} className="stack-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Projects({ data }) {
  const headerRef = useRef(null);
  const headerVisible = useReveal(headerRef);

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">

        <div
          ref={headerRef}
          className={`projects-header ${headerVisible ? 'visible' : ''}`}
        >
          <p className="section-label">Work</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            Five systems built from scratch — each one a layer deeper than
            the last, from embedded hardware to live blockchain infrastructure.
          </p>
        </div>

        <div className="projects-list">
          {data.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Projects;





