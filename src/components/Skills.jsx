import { useEffect, useRef, useState } from 'react';
import './styles/skills.css';

const CATEGORY_ORDER = ['blockchain', 'software_engineering', 'hardware_engineering', 'data_engineering'];

function useRevealOnScroll(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function SkillCategory({ category, index }) {
  const ref = useRef(null);
  const visible = useRevealOnScroll(ref);
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div
      ref={ref}
      className={`skill-category ${visible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <button
        className={`skill-cat-header ${expanded ? 'open' : ''}`}
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
      >
        <span className="skill-cat-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="skill-cat-label">{category.label}</span>
        <span className="skill-cat-count">{category.items.length} skills</span>
        <span className="skill-cat-arrow" aria-hidden="true">↓</span>
      </button>

      <div className={`skill-cat-body ${expanded ? 'open' : ''}`}>
        <p className="skill-cat-description">{category.description}</p>
        <ul className="skill-items">
          {category.items.map((item, i) => (
            <li
              key={item.name}
              className="skill-item"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <span className="skill-item-name">{item.name}</span>
              <span className="skill-item-detail">{item.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Skills({ data }) {
  const headerRef = useRef(null);
  const headerVisible = useRevealOnScroll(headerRef);

  const categories = CATEGORY_ORDER
    .filter(k => data[k])
    .map(k => data[k]);

  return (
    <section id="skills" className="skills-section">
      <div className="section-container">

        {/* Header */}
        <div
          ref={headerRef}
          className={`skills-header ${headerVisible ? 'visible' : ''}`}
        >
          <p className="section-label">Expertise</p>
          <h2 className="section-title">Skills &amp; Capabilities</h2>
          <p className="section-subtitle">
            Built from first principles. Every skill listed here is demonstrated
            in working code — not claimed from a course certificate.
          </p>
        </div>

        {/* Categories */}
        <div className="skills-grid">
          {categories.map((cat, i) => (
            <SkillCategory key={cat.label} category={cat} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;














