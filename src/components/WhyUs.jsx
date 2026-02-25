import React from 'react';
import { WHY_POINTS } from '../data/siteData';
import { useScrollReveal } from '../hooks/useAnimations';
import styles from './WhyUs.module.css';

export default function WhyUs() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal();
  const { ref: visualRef, isVisible: visualVisible } = useScrollReveal();
  const { ref: pointsRef, isVisible: pointsVisible } = useScrollReveal();

  return (
    <section className={styles.section} id="why">
      <div className={styles.container}>
        <div ref={headRef} className={`${styles.header} ${headVisible ? styles.visible : ''}`}>
          <div className={styles.tag}>Why CreatixHub</div>
          <h2 className={styles.title}>
            Technology Partners,<br />Not Just Vendors
          </h2>
        </div>

        <div className={styles.grid}>
          {/* Floating Metric Cards */}
          <div ref={visualRef} className={`${styles.visual} ${visualVisible ? styles.visualVisible : ''}`}>
            <div className={`${styles.metricCard} ${styles.mc1}`}>
              <div className={styles.mcLabel}>Uptime SLA</div>
              <div className={styles.mcValue}>99.<span>99%</span></div>
              <div className={styles.bar}>
                <div className={styles.barFill} style={{ width: '99%' }} />
              </div>
              <div className={styles.mcSub}>Guaranteed availability</div>
            </div>

            <div className={`${styles.metricCard} ${styles.mc2}`}>
              <div className={styles.mcIcon}>🚀</div>
              <div className={styles.mcLabel}>Deployment Speed</div>
              <div className={styles.mcValue} style={{ color: '#a78bfa' }}>
                3<span style={{ color: '#7c3aed' }}>×</span> Faster
              </div>
              <div className={styles.mcSub}>vs. industry average</div>
            </div>

            <div className={`${styles.metricCard} ${styles.mc3}`}>
              <div className={styles.mcLabel}>Avg. Cost Reduction</div>
              <div className={styles.mcValue}>
                <span style={{ color: '#ff5c8a' }}>40%</span>
              </div>
              <div className={styles.bar}>
                <div
                  className={styles.barFill}
                  style={{
                    width: '40%',
                    background: 'linear-gradient(90deg, #7c3aed, #ff5c8a)',
                  }}
                />
              </div>
              <div className={styles.mcSub}>First-year savings</div>
            </div>

            <div className={`${styles.metricCard} ${styles.mc4}`}>
              <div className={styles.mcIcon}>⭐</div>
              <div className={styles.mcLabel}>Client Rating</div>
              <div className={styles.mcValue} style={{ color: '#fbbf24' }}>4.9/5</div>
              <div className={styles.stars}>★★★★★</div>
            </div>
          </div>

          {/* Points */}
          <div ref={pointsRef} className={`${styles.points} ${pointsVisible ? styles.pointsVisible : ''}`}>
            {WHY_POINTS.map((p, i) => (
              <div key={p.num} className={styles.point} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={styles.pointNum}>{p.num}</div>
                <div>
                  <h4 className={styles.pointTitle}>{p.title}</h4>
                  <p className={styles.pointDesc}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
