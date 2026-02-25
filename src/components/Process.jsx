import React from 'react';
import { PROCESS_STEPS } from '../data/siteData';
import { useScrollReveal } from '../hooks/useAnimations';
import styles from './Process.module.css';

export default function Process() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal();
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollReveal();

  return (
    <section className={styles.section} id="process">
      <div className={styles.container}>
        <div ref={headRef} className={`${styles.header} ${headVisible ? styles.visible : ''}`}>
          <div className={styles.tag}>How It Works</div>
          <h2 className={styles.title}>Our Proven Process</h2>
          <p className={styles.sub}>
            A clear, collaborative methodology that takes you from first conversation
            to a live, scalable product — delivered on time and on budget.
          </p>
        </div>

        <div ref={stepsRef} className={`${styles.steps} ${stepsVisible ? styles.stepsVisible : ''}`}>
          <div className={styles.connector} />
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.num}
              className={styles.step}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className={styles.iconRow}>
                <div className={styles.circle}>
                  <span className={styles.stepIcon}>{step.icon}</span>
                </div>
              </div>
              <div className={styles.stepNum}>{step.num}</div>
              <h4 className={styles.stepTitle}>{step.title}</h4>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
