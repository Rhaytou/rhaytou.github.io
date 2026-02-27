import { useEffect, useRef, useState } from 'react';
import './styles/contact.css';

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

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/Rhaytou',
    label: 'github.com/Rhaytou',
  },
  {
    name: 'Twitter / X',
    url: 'https://x.com/Slimane_Rhaytou',
    label: 'x.com/Slimane_Rhaytou',
  },
  {
    name: 'TradingView',
    url: 'https://tradingview.com/u/Slimane-Rhaytou',
    label: 'tradingview.com/u/Slimane-Rhaytou',
  },
];

function Contact({ data }) {
  const headerRef = useRef(null);
  const cardRef   = useRef(null);
  const headerVis = useReveal(headerRef);
  const cardVis   = useReveal(cardRef);

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">

        <div ref={headerRef} className={`contact-header ${headerVis ? 'visible' : ''}`}>
          <p className="section-label">Reach out</p>
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">{data.cta}</p>
        </div>

        <div ref={cardRef} className={`contact-layout ${cardVis ? 'visible' : ''}`}>

          {/* Direct info */}
          <div className="contact-info">
            <p className="contact-info-label">Direct</p>

            <a href={`mailto:${data.email}`} className="contact-item contact-item-main">
              <span className="contact-item-type">Email</span>
              <span className="contact-item-value">{data.email}</span>
              <span className="contact-item-arrow" aria-hidden="true">↗</span>
            </a>

            <a href={`tel:${data.phone.replace(/\s/g, '')}`} className="contact-item">
              <span className="contact-item-type">Phone</span>
              <span className="contact-item-value">{data.phone}</span>
              <span className="contact-item-arrow" aria-hidden="true">↗</span>
            </a>

            <div className="contact-item contact-item-location">
              <span className="contact-item-type">Location</span>
              <span className="contact-item-value">{data.location}</span>
            </div>

            <div className="contact-availability">
              <span>{data.availability}</span>
            </div>
          </div>

          {/* Social links */}
          <div className="contact-social">
            <p className="contact-info-label">Online</p>
            {SOCIAL_LINKS.map(link => (
              <a
                key={link.name}
                href={link.url}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="social-name">{link.name}</span>
                <span className="social-url">{link.label}</span>
                <span className="social-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* Footer line */}
      <footer className="site-footer">
        <div className="section-container">
          <div className="footer-inner">
            <span className="footer-name">Slimane Rhaytou</span>
            <span className="footer-copy">
              © {new Date().getFullYear()} — All rights reserved
            </span>
            <span className="footer-built">
              Built with React + Vite
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default Contact;


