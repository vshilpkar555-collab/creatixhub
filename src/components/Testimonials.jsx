import React from 'react';
import { TESTIMONIALS } from '../data/siteData';
import { useScrollReveal } from '../hooks/useAnimations';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();

  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.container}>
        <div ref={headRef} className={`${styles.header} ${headVisible ? styles.visible : ''}`}>
          <div className={styles.tag}>Client Stories</div>
          <h2 className={styles.title}>Trusted by Industry Leaders</h2>
          <p className={styles.sub}>
            Real results from real partnerships. Here's what our clients say about
            working with CreatixHub.
          </p>
        </div>

        <div ref={gridRef} className={`${styles.grid} ${gridVisible ? styles.gridVisible : ''}`}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={styles.card} style={{ transitionDelay: `${i * 120}ms` }}>
              <div className={styles.quoteIcon}>"</div>
              <div className={styles.stars}>{'★'.repeat(t.stars)}</div>
              <blockquote className={styles.quote}>{t.quote}</blockquote>
              <div className={styles.author}>
                <div className={styles.avatar} style={{ background: t.gradient }}>
                  {t.initials}
                </div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
