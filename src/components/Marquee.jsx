import React from 'react';
import { MARQUEE_ITEMS } from '../data/siteData';
import styles from './Marquee.module.css';

export default function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
