import React, { useEffect, useRef } from 'react';
import { STATS } from '../data/siteData';
import { useScrollReveal, useCountUp } from '../hooks/useAnimations';
import styles from './Hero.module.css';

function StatItem({ stat }) {
  const { ref, isVisible } = useScrollReveal();
  const count = useCountUp(parseInt(stat.num), isVisible, 1800);
  return (
    <div ref={ref} className={styles.stat}>
      <div className={styles.statNum}>
        {count}<span>{stat.suffix}</span>
      </div>
      <div className={styles.statLabel}>{stat.label}</div>
    </div>
  );
}

export default function Hero() {
  const canvasRef = useRef(null);

  // Particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
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
    <section className={styles.hero} id="home">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.grid} />
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.blink} />
          Now Accepting New Clients for 2026
        </div>

        <h1 className={styles.heading}>
          <span className={styles.line1}>We Build</span>
          <span className={styles.line2}>Digital Futures</span>
          <span className={styles.line3}>That Scale.</span>
        </h1>

        <p className={styles.sub}>
          CreatixHub delivers end-to-end IT solutions — from cloud infrastructure
          to cutting-edge software — that transform how businesses operate and grow
          in the modern digital landscape.
        </p>

        <div className={styles.actions}>
          <a href="#services" className={styles.btnPrimary}
            onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Explore Services
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a href="#contact" className={styles.btnGhost}
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Talk to an Expert
          </a>
        </div>

        <div className={styles.stats}>
          {STATS.map((s) => <StatItem key={s.label} stat={s} />)}
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollDot} />
      </div>
    </section>
  );
}
