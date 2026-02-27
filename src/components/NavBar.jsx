import { useState, useEffect } from 'react';
import './styles/navbar.css';

const NAV_LINKS = [
  { label: 'Home',     href: '#home'     },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'About',    href: '#about'    },
  { label: 'Contact',  href: '#contact'  },
];

function NavBar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setActive]  = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="navbar-inner">

        {/* Monogram / Logo */}
        <a
          href="#home"
          className="navbar-logo"
          onClick={e => handleLink(e, '#home')}
          aria-label="Home"
        >
          <span className="logo-initials">SR</span>
        </a>

        {/* Desktop Nav */}
        <nav className="navbar-links" aria-label="Main navigation">
          <ul>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={activeSection === href.slice(1) ? 'active' : ''}
                  onClick={e => handleLink(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <ul>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={activeSection === href.slice(1) ? 'active' : ''}
                onClick={e => handleLink(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default NavBar;






