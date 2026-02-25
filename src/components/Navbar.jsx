import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const ANCHOR_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us',   href: '#why' },
  { label: 'Process',  href: '#process' },
  { label: 'Clients',  href: '#testimonials' },
];

const PAGE_LINKS = [
  {
    label: 'Company',
    children: [
      { label: 'About Us',     to: '/company' },
      { label: 'Case Studies', to: '/case-studies' },
      { label: 'Partners',     to: '/partners' },
    ],
  },
  { label: 'Careers', to: '/careers' },
  { label: 'Blog',    to: '/blog' },
];

function Dropdown({ item }) {
  const location = useLocation();
  const isActive = item.children?.some(c => location.pathname === c.to);
  return (
    <div className={styles.dropdownWrap}>
      <button className={`${styles.navLink} ${styles.dropdownTrigger} ${isActive ? styles.navLinkActive : ''}`}>
        {item.label}
        <svg className={styles.chevron} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div className={styles.dropdown}>
        <div className={styles.dropdownInner}>
          {item.children.map(child => (
            <Link
              key={child.to}
              to={child.to}
              className={`${styles.dropdownItem} ${location.pathname === child.to ? styles.dropdownItemActive : ''}`}
            >
              <span className={styles.dropdownDot} />
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome   = location.pathname === '/';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); setMobileCompanyOpen(false); }, [location.pathname]);

  const handleAnchor = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    if (isHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 400);
    }
  };

  const handleContact = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (isHome) {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 400);
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>Creatix<span className={styles.logoAccent}>Hub</span></Link>

        <ul className={styles.navLinks}>
          {ANCHOR_LINKS.map(link => (
            <li key={link.label}>
              <a href={link.href} className={styles.navLink} onClick={e => handleAnchor(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
          <li className={styles.navDivider} />
          {PAGE_LINKS.map(link => (
            <li key={link.label}>
              {link.children ? (
                <Dropdown item={link} />
              ) : (
                <Link to={link.to} className={`${styles.navLink} ${location.pathname === link.to ? styles.navLinkActive : ''}`}>
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.navRight}>
          <a href="#contact" className={styles.navCta} onClick={handleContact}>Get Started</a>
          <button className={`${styles.menuBtn} ${menuOpen ? styles.menuOpen : ''}`}
            onClick={() => setMenuOpen(p => !p)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.mobileSection}>
          <div className={styles.mobileSectionLabel}>On This Page</div>
          {ANCHOR_LINKS.map(link => (
            <a key={link.label} href={link.href} className={styles.mobileLink} onClick={e => handleAnchor(e, link.href)}>
              {link.label}
            </a>
          ))}
        </div>
        <div className={styles.mobileDivider} />
        <div className={styles.mobileSection}>
          <div className={styles.mobileSectionLabel}>Pages</div>
          <button className={`${styles.mobileLink} ${styles.mobileAccordionBtn}`}
            onClick={() => setMobileCompanyOpen(p => !p)}>
            Company
            <svg style={{ transform: mobileCompanyOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }}
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <div className={`${styles.mobileAccordion} ${mobileCompanyOpen ? styles.mobileAccordionOpen : ''}`}>
            {PAGE_LINKS[0].children.map(child => (
              <Link key={child.to} to={child.to} className={styles.mobileSubLink}>→ {child.label}</Link>
            ))}
          </div>
          {PAGE_LINKS.slice(1).map(link => (
            <Link key={link.to} to={link.to}
              className={`${styles.mobileLink} ${location.pathname === link.to ? styles.mobileLinkActive : ''}`}>
              {link.label}
            </Link>
          ))}
        </div>
        <a href="#contact" className={styles.mobileCtaBtn} onClick={handleContact}>Get Started →</a>
      </div>
    </header>
  );
}
