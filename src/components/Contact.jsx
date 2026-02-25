import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import styles from './Contact.module.css';

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div ref={ref} className={`${styles.inner} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.bg} />

          <div className={styles.left}>
            <div className={styles.tag}>Get In Touch</div>
            <h2 className={styles.title}>
              Ready to Build<br />Something Remarkable?
            </h2>
            <p className={styles.sub}>
              Free consultation, no pressure — just expert insight tailored to your
              goals and technology landscape.
            </p>

            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📧</div>
                <div>
                  <div className={styles.contactLabel}>Email Us</div>
                  <div className={styles.contactValue}>hello@creatixhub.com</div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📞</div>
                <div>
                  <div className={styles.contactLabel}>Call Us</div>
                  <div className={styles.contactValue}>+1 (800) CREATIX</div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📍</div>
                <div>
                  <div className={styles.contactLabel}>Headquarters</div>
                  <div className={styles.contactValue}>Bangalore, India</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.right}>
            {submitted ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✅</div>
                <h3>Message Received!</h3>
                <p>Our team will reach out within 24 hours. Looking forward to working with you.</p>
                <button className={styles.resetBtn} onClick={() => setSubmitted(false)}>
                  Send Another
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>Service Interested In</label>
                  <select name="service" value={form.service} onChange={handleChange} required>
                    <option value="">Select a service...</option>
                    <option>Cloud Solutions</option>
                    <option>Cybersecurity</option>
                    <option>Custom Software Dev</option>
                    <option>DevOps & Automation</option>
                    <option>AI & Data Analytics</option>
                    <option>IT Consulting</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label>Project Description</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className={styles.submitBtn}>
                  Send Message
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
