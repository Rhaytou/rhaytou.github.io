import { useEffect, useRef } from 'react';
import './styles/hero.css';

function Hero({ data }) {
  const { name, title, tagline } = data;
  const canvasRef = useRef(null);

  // Subtle animated grid / particle canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w, h;

    const resize = () => {
      w = canvas.width  = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Sparse floating dots
    const dots = Array.from({ length: 55 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      dots.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = w;
        if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h;
        if (d.y > h) d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(92, 127, 168, ${d.alpha})`;
        ctx.fill();
      });

      // draw faint connecting lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(59, 87, 122, ${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="home" className="hero">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

      {/* Decorative vertical line left */}
      <div className="hero-line-left" aria-hidden="true" />

      <div className="hero-content">
        <p className="hero-eyebrow reveal" style={{ animationDelay: '0.1s' }}>
          rhaytou.github.io
        </p>

        <h1 className="hero-name reveal" style={{ animationDelay: '0.3s' }}>
          {name}
        </h1>

        <div className="hero-divider reveal" style={{ animationDelay: '0.5s' }} aria-hidden="true" />

        <h2 className="hero-title reveal" style={{ animationDelay: '0.6s' }}>
          {title}
        </h2>

        <p className="hero-tagline reveal" style={{ animationDelay: '0.85s' }}>
          {tagline}
        </p>

        <div className="hero-actions reveal" style={{ animationDelay: '1.1s' }}>
          <a href="#projects" className="btn-primary" onClick={e => {
            e.preventDefault();
            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            View Work
          </a>
          <a href="#contact" className="btn-ghost" onClick={e => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll-cue reveal" style={{ animationDelay: '1.4s' }} aria-hidden="true">
        <span className="scroll-label">scroll</span>
        <div className="scroll-bar"><div className="scroll-bar-inner" /></div>
      </div>
    </section>
  );
}

export default Hero;





