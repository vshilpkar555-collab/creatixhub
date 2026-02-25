import React, { useEffect, useRef, useState } from 'react';
import styles from './Company.module.css';

// ── DATA ──────────────────────────────────────────────────────────────────────

const MISSION_PILLARS = [
  {
    icon: '🎯',
    title: 'Our Mission',
    desc: 'To accelerate digital transformation by delivering intelligent, secure, and scalable technology solutions that create measurable business value for every client we serve.',
    accent: '#00e5ff',
  },
  {
    icon: '🔭',
    title: 'Our Vision',
    desc: 'To be the most trusted IT partner in South Asia — where innovation meets integrity, and every line of code contributes to a smarter, more connected world.',
    accent: '#7c3aed',
  },
  {
    icon: '💡',
    title: 'Our Approach',
    desc: 'We combine deep technical expertise with strategic thinking to architect solutions that are not just built for today, but engineered to evolve with your business tomorrow.',
    accent: '#ff5c8a',
  },
];

const STATS = [
  { num: 250, suffix: '+', label: 'Projects Delivered' },
  { num: 98, suffix: '%', label: 'Client Satisfaction' },
  { num: 12, suffix: '+', label: 'Years of Excellence' },
  { num: 40, suffix: '+', label: 'Expert Engineers' },
  { num: 30, suffix: '+', label: 'Industries Served' },
  { num: 15, suffix: '+', label: 'Countries Reached' },
];

const VALUES = [
  {
    icon: '🛡️',
    title: 'Integrity First',
    desc: 'We operate with radical transparency. No hidden costs, no overpromising — just honest, accountable delivery on every commitment we make.',
  },
  {
    icon: '⚡',
    title: 'Engineering Excellence',
    desc: 'Clean code, scalable architecture, rigorous testing. We hold ourselves to the highest technical standards so your systems never let you down.',
  },
  {
    icon: '🤝',
    title: 'Client Partnership',
    desc: 'We dont just build and leave. We embed ourselves in your success, acting as a true technology partner with long-term skin in the game.',
  },
  {
    icon: '🌱',
    title: 'Continuous Innovation',
    desc: 'Technology never stands still, and neither do we. Our teams invest 20% of their time in R&D, bringing cutting-edge solutions to your challenges.',
  },
  {
    icon: '🌍',
    title: 'Inclusive Growth',
    desc: 'We believe in building technology that creates opportunities — for our clients, our team, and the communities we operate in across India and beyond.',
  },
  {
    icon: '🔒',
    title: 'Security by Design',
    desc: 'Security is never bolted on at the end. It\'s woven into every layer of everything we build — from architecture decisions to deployment pipelines.',
  },
];

const TEAM = [
  {
    name: 'Rohan Sharma',
    role: 'Chief Executive Officer',
    bio: '15+ years in enterprise tech. Previously VP Engineering at TCS. IIT Bombay alumni passionate about scaling startups.',
    initials: 'RS',
    gradient: 'linear-gradient(135deg, #00e5ff 0%, #0077ff 100%)',
  },
  {
    name: 'Priya Mehta',
    role: 'Chief Technology Officer',
    bio: 'Cloud architecture expert. AWS Certified Solutions Architect Pro. Led 60+ large-scale cloud migrations across APAC.',
    initials: 'PM',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)',
  },
  {
    name: 'Arjun Nair',
    role: 'Head of AI & Data',
    bio: 'PhD in Machine Learning from IISc. Published researcher turned practitioner. Specialist in production ML systems at scale.',
    initials: 'AN',
    gradient: 'linear-gradient(135deg, #ff5c8a 0%, #7c3aed 100%)',
  },
  {
    name: 'Sneha Patel',
    role: 'VP of Client Success',
    bio: 'Decade of experience in digital transformation consulting. Former Deloitte principal. 100% client retention record.',
    initials: 'SP',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  },
];

const EXPERTISE = [
  { label: 'Cloud Infrastructure (AWS/Azure/GCP)', pct: 96 },
  { label: 'Custom Software Development', pct: 94 },
  { label: 'AI & Machine Learning', pct: 88 },
  { label: 'Cybersecurity & Compliance', pct: 92 },
  { label: 'DevOps & CI/CD Automation', pct: 95 },
  { label: 'Mobile App Development', pct: 90 },
];

const MILESTONES = [
  { year: '2012', event: 'Founded in Bangalore by a team of IIT engineers with a vision to democratize enterprise technology.' },
  { year: '2015', event: 'Crossed 50 clients and expanded to Mumbai. Became an AWS Select Consulting Partner.' },
  { year: '2018', event: 'Launched dedicated AI & Data practice. Opened our first international office in Singapore.' },
  { year: '2020', event: 'Achieved ISO 27001 certification. Pivoted rapidly to help 30+ clients go fully remote during the pandemic.' },
  { year: '2022', event: 'Recognized as one of India\'s Top 50 IT Service Providers by NASSCOM. Team grew to 100+ engineers.' },
  { year: '2024', event: 'Expanded to Indore, India and beyond. Surpassed 250 projects delivered across 15+ countries.' },
];

const CERTIFICATIONS = [
  { logo: '☁️', name: 'AWS Select Partner', color: '#FF9900' },
  { logo: '🔷', name: 'Microsoft Azure Partner', color: '#0078D4' },
  { logo: '🌐', name: 'Google Cloud Partner', color: '#4285F4' },
  { logo: '🛡️', name: 'ISO 27001 Certified', color: '#00e5ff' },
  { logo: '⚡', name: 'HashiCorp Partner', color: '#7c3aed' },
  { logo: '📊', name: 'Datadog Partner', color: '#632CA6' },
];

// ── HOOKS ─────────────────────────────────────────────────────────────────────

function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCountUp(target, active, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let n = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      n += step;
      if (n >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(n));
    }, 16);
    return () => clearInterval(t);
  }, [active, target, duration]);
  return val;
}

// ── SUB-COMPONENTS ─────────────────────────────────────────────────────────────

function StatCard({ stat, delay }) {
  const { ref, visible } = useScrollReveal();
  const count = useCountUp(stat.num, visible);
  return (
    <div ref={ref} className={`${styles.statCard} ${visible ? styles.statVisible : ''}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className={styles.statNum}>{count}<span className={styles.statSuffix}>{stat.suffix}</span></div>
      <div className={styles.statLabel}>{stat.label}</div>
    </div>
  );
}

function SkillBar({ label, pct, delay, active }) {
  return (
    <div className={styles.skillRow} style={{ transitionDelay: `${delay}ms` }}>
      <div className={styles.skillMeta}>
        <span className={styles.skillLabel}>{label}</span>
        <span className={styles.skillPct}>{pct}%</span>
      </div>
      <div className={styles.skillTrack}>
        <div
          className={styles.skillFill}
          style={{ width: active ? `${pct}%` : '0%', transitionDelay: `${delay + 200}ms` }}
        />
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────

export default function Company() {
  const hero = useScrollReveal();
  const pillars = useScrollReveal();
  const statsSection = useScrollReveal();
  const values = useScrollReveal();
  const team = useScrollReveal();
  const expertise = useScrollReveal();
  const timeline = useScrollReveal();
  const certs = useScrollReveal();

  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg} />
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
        <div ref={hero.ref} className={`${styles.heroContent} ${hero.visible ? styles.fadeIn : ''}`}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} /> Est. 2012 · Bangalore, India
          </div>
          <h1 className={styles.heroTitle}>
            We Are <span className={styles.accent}>CreatixHub</span>
          </h1>
          <p className={styles.heroSub}>
            A premier IT services company where passionate technologists, strategic thinkers, and
            creative engineers come together to solve the problems that matter most — and build the
            digital futures that businesses deserve.
          </p>
          <div className={styles.heroDivider} />
          <p className={styles.heroTagline}>
            Founded on innovation. Driven by excellence. Measured by your success.
          </p>
        </div>
      </section>

      {/* ── MISSION / VISION / APPROACH ── */}
      <section className={styles.pillarsSection}>
        <div className={styles.sectionWrap}>
          <div ref={pillars.ref} className={`${styles.pillarsGrid} ${pillars.visible ? styles.pillarsVisible : ''}`}>
            {MISSION_PILLARS.map((p, i) => (
              <div key={p.title} className={styles.pillarCard} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className={styles.pillarIcon} style={{ background: `${p.accent}18`, borderColor: `${p.accent}30` }}>
                  {p.icon}
                </div>
                <h3 className={styles.pillarTitle} style={{ color: p.accent }}>{p.title}</h3>
                <p className={styles.pillarDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className={styles.storySection}>
        <div className={styles.sectionWrap}>
          <div className={styles.storyGrid}>
            <div>
              <div className={styles.sectionTag}>Our Story</div>
              <h2 className={styles.sectionTitle}>Built by Engineers,<br />Shaped by Clients</h2>
              <p className={styles.storyText}>
                CreatixHub was born in 2012 out of a simple frustration: too many businesses were being
                sold technology without strategy, and too many engineers were building without purpose.
                Our founders — a group of IIT engineers who had seen both sides — decided to do things
                differently.
              </p>
              <p className={styles.storyText}>
                We started small, with a handful of clients and a deep belief that technology's greatest
                power lies not in the tools themselves, but in how intelligently they're applied to real
                human and business challenges.
              </p>
              <p className={styles.storyText}>
                Over twelve years, that belief has been validated 250+ times across industries ranging
                from fintech and healthcare to e-commerce and manufacturing. Today, CreatixHub is home
                to 40+ engineers, consultants, and strategists spread across India and Southeast Asia —
                all united by a single purpose: making technology work harder for the people who depend
                on it.
              </p>
            </div>
            <div className={styles.storyVisual}>
              <div className={styles.storyCard1}>
                <div className={styles.scLabel}>Headquartered In</div>
                <div className={styles.scValue}>Bangalore <span>🇮🇳</span></div>
                <div className={styles.scSub}>With offices in Mumbai & Indore</div>
              </div>
              <div className={styles.storyCard2}>
                <div className={styles.scLabel}>Operating Since</div>
                <div className={styles.scValue}><span>2012</span></div>
                <div className={styles.scSub}>12+ years of trusted delivery</div>
              </div>
              <div className={styles.storyCard3}>
                <div className={styles.scIcon}>🌏</div>
                <div className={styles.scLabel}>Global Reach</div>
                <div className={styles.scValue}><span>15+</span> Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className={styles.statsSection}>
        <div className={styles.sectionWrap}>
          <div ref={statsSection.ref} className={styles.statsGrid}>
            {STATS.map((s, i) => <StatCard key={s.label} stat={s} delay={i * 80} />)}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className={styles.valuesSection}>
        <div className={styles.sectionWrap}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTag}>What Drives Us</div>
            <h2 className={styles.sectionTitle}>Core Values</h2>
            <p className={styles.sectionSub}>
              Our values aren't words on a wall — they're the principles we apply
              to every decision, every deadline, and every line of code.
            </p>
          </div>
          <div ref={values.ref} className={`${styles.valuesGrid} ${values.visible ? styles.valuesVisible : ''}`}>
            {VALUES.map((v, i) => (
              <div key={v.title} className={styles.valueCard} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h4 className={styles.valueTitle}>{v.title}</h4>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className={styles.teamSection}>
        <div className={styles.sectionWrap}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTag}>The People</div>
            <h2 className={styles.sectionTitle}>Leadership Team</h2>
            <p className={styles.sectionSub}>
              Seasoned engineers, consultants, and strategists who've collectively built
              and scaled technology for hundreds of companies worldwide.
            </p>
          </div>
          <div ref={team.ref} className={`${styles.teamGrid} ${team.visible ? styles.teamVisible : ''}`}>
            {TEAM.map((m, i) => (
              <div key={m.name} className={styles.teamCard} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={styles.teamAvatar} style={{ background: m.gradient }}>{m.initials}</div>
                <h4 className={styles.teamName}>{m.name}</h4>
                <div className={styles.teamRole}>{m.role}</div>
                <p className={styles.teamBio}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERTISE BARS ── */}
      <section className={styles.expertiseSection}>
        <div className={styles.sectionWrap}>
          <div className={styles.expertiseGrid}>
            <div>
              <div className={styles.sectionTag}>Capabilities</div>
              <h2 className={styles.sectionTitle}>Our Technical<br />Expertise</h2>
              <p className={styles.sectionSub}>
                Across twelve years, we've developed deep specializations that
                translate directly into faster delivery and better outcomes for clients.
              </p>
              <div className={styles.expertiseBadges}>
                <span className={styles.badge}>Full-Stack</span>
                <span className={styles.badge}>Cloud-Native</span>
                <span className={styles.badge}>AI-Ready</span>
                <span className={styles.badge}>Security-First</span>
              </div>
            </div>
            <div ref={expertise.ref} className={styles.barsWrap}>
              {EXPERTISE.map((e, i) => (
                <SkillBar key={e.label} label={e.label} pct={e.pct} delay={i * 100} active={expertise.visible} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className={styles.timelineSection}>
        <div className={styles.sectionWrap}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTag}>Our Journey</div>
            <h2 className={styles.sectionTitle}>Milestones That<br />Define Us</h2>
          </div>
          <div ref={timeline.ref} className={`${styles.timeline} ${timeline.visible ? styles.timelineVisible : ''}`}>
            {MILESTONES.map((m, i) => (
              <div key={m.year} className={styles.timelineItem} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={styles.timelineLeft}>
                  <div className={styles.timelineYear}>{m.year}</div>
                </div>
                <div className={styles.timelineDot} />
                <div className={styles.timelineRight}>
                  <p className={styles.timelineEvent}>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className={styles.certsSection}>
        <div className={styles.sectionWrap}>
          <div ref={certs.ref} className={styles.certsInner}>
            <div className={`${styles.certsHeader} ${certs.visible ? styles.certsHeaderVisible : ''}`}>
              <div className={styles.sectionTag}>Verified Partnerships</div>
              <h2 className={styles.sectionTitle}>Certified & Trusted</h2>
              <p className={styles.sectionSub}>
                Our certifications and partnerships reflect our commitment to operating at
                the highest standard across every technology we deliver.
              </p>
            </div>
            <div className={`${styles.certsGrid} ${certs.visible ? styles.certsGridVisible : ''}`}>
              {CERTIFICATIONS.map((c, i) => (
                <div key={c.name} className={styles.certCard} style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className={styles.certLogo} style={{ color: c.color }}>{c.logo}</div>
                  <div className={styles.certName}>{c.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className={styles.ctaStrip}>
        <div className={styles.sectionWrap}>
          <div className={styles.ctaInner}>
            <div>
              <h3 className={styles.ctaTitle}>Ready to partner with us?</h3>
              <p className={styles.ctaSub}>Let's turn your technology challenges into competitive advantages.</p>
            </div>
            <a href="#contact" className={styles.ctaBtn}>
              Start a Conversation →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
