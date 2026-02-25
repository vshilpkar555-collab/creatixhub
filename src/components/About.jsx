import React from 'react';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <section id="about" className={styles.section}>
        <h2>About Us</h2>
        <p>
          Founded on the principle of innovation, CreatixHub is a premier IT services company dedicated to helping businesses navigate the complexities of the digital world. We are a team of passionate technologists, strategists, and creative thinkers who believe in the power of technology to solve complex business challenges. Our mission is to be a trusted partner for our clients, providing them with the tools and expertise they need to achieve their goals.
        </p>
      </section>

      <section id="partners" className={styles.section}>
        <h2>Our Partners</h2>
        <p>We are proud to partner with industry leaders to deliver the best possible solutions to our clients.</p>
        <div className={styles.partnersList}>
          <span>AWS</span>
          <span>Microsoft Azure</span>
          <span>Google Cloud</span>
          <span>HashiCorp</span>
          <span>Datadog</span>
        </div>
      </section>
    </div>
  );
}
