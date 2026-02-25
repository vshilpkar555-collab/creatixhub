import React from 'react';
import { SERVICES } from '../data/siteData';
import { useScrollReveal, useMouseGlow } from '../hooks/useAnimations';
import styles from './Services.module.css';

function ServiceCard({ service, index }) {
  const { ref: revealRef, isVisible } = useScrollReveal({ threshold: 0.1 });
  const glowRef = useMouseGlow();

  const setRefs = (el) => {
    revealRef.current = el;
    glowRef.current = el;
  };

  return (
    <div
      ref={setRefs}
      className={`${styles.card} ${isVisible ? styles.visible : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={styles.glow} />
      <div className={styles.iconWrap} style={{ background: `${service.color}15`, borderColor: `${service.color}30` }}>
        <span>{service.icon}</span>
      </div>
      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.cardDesc}>{service.desc}</p>
      <div className={styles.cardFooter}>
        <span className={styles.tag} style={{ color: service.color, background: `${service.color}12`, borderColor: `${service.color}25` }}>
          {service.tag}
        </span>
        <span className={styles.arrow}>→</span>
      </div>
    </div>
  );
}

export default function Services() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className={styles.section} id="services">
      <div className={styles.container}>
        <div ref={ref} className={`${styles.header} ${isVisible ? styles.headerVisible : ''}`}>
          <div className={styles.tag}>What We Do</div>
          <h2 className={styles.title}>
            IT Services Built<br />for Modern Business
          </h2>
          <p className={styles.sub}>
            From concept to deployment, we cover every layer of the digital stack
            with precision, purpose, and proven expertise.
          </p>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
