import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const FOOTER_NAV = {
  Company: [
    { label: 'About Us',     to: '/company' },
    { label: 'Case Studies', to: '/case-studies' },
    { label: 'Careers',      to: '/careers' },
    { label: 'Blog',         to: '/blog' },
    { label: 'Partners',     to: '/partners' },
  ],
  Services: [
    { label: 'Cloud Solutions',    to: '/#services' },
    { label: 'Cybersecurity',      to: '/#services' },
    { label: 'Custom Development', to: '/#services' },
    { label: 'DevOps',             to: '/#services' },
    { label: 'AI & Analytics',     to: '/#services' },
  ],
  Contact: [
    { label: 'hello@creatixhub.com', to: 'mailto:creatixhub21@gmail.com' },
    { label: '+1 (800) CREATIX',     to: 'tel:+18002732849' },
    { label: 'HQ: Bangalore, India', to: '#' },
    { label: 'Support Portal',       to: '#' },
  ],
};

export default function Footer() {
  const scrollToContact = (e) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              Creatix<span>Hub</span>
            </Link>
            <p className={styles.brandDesc}>
              Future-forward IT solutions for businesses that want to move faster,
              scale smarter, and operate with confidence in the modern digital era.
            </p>
            <div className={styles.socials}>
              {[
                { icon: 'in',  title: 'LinkedIn', href: '#' },
                { icon: '𝕏',  title: 'Twitter',  href: '#' },
                { icon: '⌥',  title: 'GitHub',   href: '#' },
                { icon: '▶',  title: 'YouTube',  href: '#' },
              ].map(s => (
                <a key={s.title} href={s.href} className={styles.social} title={s.title}>{s.icon}</a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_NAV).map(([heading, links]) => (
            <div key={heading} className={styles.col}>
              <h5 className={styles.colTitle}>{heading}</h5>
              {links.map(link =>
                link.to.startsWith('mailto:') || link.to.startsWith('tel:') ? (
                  <a key={link.label} href={link.to} className={styles.link}>{link.label}</a>
                ) : (
                  <Link key={link.label} to={link.to} className={styles.link}>{link.label}</Link>
                )
              )}
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <span>© 2026 CreatixHub Technologies Pvt. Ltd. All rights reserved.</span>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
