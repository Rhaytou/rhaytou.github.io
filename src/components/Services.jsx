import { useEffect, useRef, useState } from 'react';
import './styles/services.css';

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

const SERVICE_ICONS = {
  consulting:   '◈',
  development:  '◉',
};

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const visible = useReveal(ref);

  return (
    <div
      ref={ref}
      className={`service-card ${visible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="service-icon-wrap" aria-hidden="true">
        {SERVICE_ICONS[service.icon] || '◆'}
      </div>

      <div className="service-body">
        <h3 className="service-title">{service.title}</h3>
        <p className="service-tagline">{service.tagline}</p>
        <p className="service-description">{service.description}</p>

        <div className="service-offerings">
          <p className="offerings-label">What I deliver</p>
          <ul>
            {service.offerings.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Services({ data }) {
  const headerRef = useRef(null);
  const headerVisible = useReveal(headerRef);

  return (
    <section id="services" className="services-section">
      <div className="section-container">

        <div
          ref={headerRef}
          className={`services-header ${headerVisible ? 'visible' : ''}`}
        >
          <p className="section-label">Offerings</p>
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">
            Two ways to engage — strategic consulting or hands-on engineering.
            Both start with a conversation.
          </p>
        </div>

        <div className="services-grid">
          {data.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;




