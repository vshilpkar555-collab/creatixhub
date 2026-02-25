import React, { useState, useRef, useEffect } from 'react';
import styles from './CaseStudies.module.css';

// ── DATA ──────────────────────────────────────────────────────────────────────

const FILTERS = ['All', 'Cloud', 'AI & Data', 'Cybersecurity', 'DevOps', 'Custom Dev'];

const CASE_STUDIES = [
  {
    id: 1,
    category: 'Cloud',
    badge: 'Cloud Migration',
    title: 'Fintech Startup Scales Securely on AWS with 99.99% Uptime',
    client: 'FinEdge Solutions',
    industry: 'Financial Technology',
    duration: '4 Months',
    team: '6 Engineers',
    tags: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
    challenge:
      'A rapidly growing fintech startup needed to migrate from a monolithic architecture to a scalable, secure cloud infrastructure to handle a 10× increase in user traffic and comply with strict RBI & PCI-DSS financial regulations.',
    solution:
      'CreatixHub designed a multi-account AWS strategy using Kubernetes for container orchestration, implemented a full CI/CD pipeline with automated security scanning, and deployed a real-time threat detection system with AWS GuardDuty.',
    results: [
      { metric: '99.99%', label: 'Uptime SLA Achieved' },
      { metric: '30%', label: 'Infrastructure Cost Reduction' },
      { metric: '10×', label: 'Traffic Capacity Increase' },
      { metric: '0', label: 'Security Audit Failures' },
    ],
    outcome:
      'Passed all security audits, achieved PCI-DSS compliance, and the client successfully secured Series B funding of ₹85 Cr citing their robust tech infrastructure.',
    accentColor: '#00e5ff',
  },
  {
    id: 2,
    category: 'AI & Data',
    badge: 'Machine Learning',
    title: 'E-commerce Giant Boosts Conversions 22% with Custom AI Recommendation Engine',
    client: 'SwiftCommerce',
    industry: 'E-commerce & Retail',
    duration: '3 Months',
    team: '5 Engineers',
    tags: ['Python', 'TensorFlow', 'AWS SageMaker', 'React'],
    challenge:
      'A major e-commerce player with 2M+ monthly users was struggling with a 76% cart abandonment rate. Their off-the-shelf recommendation engine was producing generic suggestions that failed to connect with customer intent.',
    solution:
      'Our AI & Data Analytics team developed a custom collaborative filtering + NLP-based recommendation model, trained on 18 months of purchase history. Integrated seamlessly via REST APIs into their existing Next.js storefront.',
    results: [
      { metric: '22%', label: 'Conversion Rate Increase' },
      { metric: '15%', label: 'Higher Average Order Value' },
      { metric: '25%', label: 'Better Customer Retention' },
      { metric: '40%', label: 'Cart Abandonment Reduction' },
    ],
    outcome:
      'The recommendation engine now drives 34% of total revenue. The client expanded the engagement to include demand forecasting and inventory optimization.',
    accentColor: '#7c3aed',
  },
  {
    id: 3,
    category: 'Cybersecurity',
    badge: 'Security Audit',
    title: 'Healthcare Provider Achieves ISO 27001 on First Attempt After Critical Vulnerability Remediation',
    client: 'MediCore Group',
    industry: 'Healthcare & MedTech',
    duration: '5 Months',
    team: '4 Engineers',
    tags: ['ISO 27001', 'Penetration Testing', 'SIEM', 'Zero Trust'],
    challenge:
      'A 500-bed hospital network handling sensitive patient data was facing increasing cyber threats. Their legacy systems had not undergone a formal security audit in 3 years, and a routine scan had flagged multiple critical open ports.',
    solution:
      'Conducted a full penetration test uncovering 14 critical vulnerabilities. Designed and implemented a Zero Trust network architecture, deployed a SIEM solution with 24/7 alerting, and trained 200+ staff on security protocols.',
    results: [
      { metric: '14', label: 'Critical Vulnerabilities Fixed' },
      { metric: '100%', label: 'ISO 27001 First Attempt Pass' },
      { metric: '200+', label: 'Staff Security-Trained' },
      { metric: '0', label: 'Breaches Post-Implementation' },
    ],
    outcome:
      'MediCore passed ISO 27001 certification on their first attempt and was able to onboard two major insurance partners who had previously rejected them due to security concerns.',
    accentColor: '#ff5c8a',
  },
  {
    id: 4,
    category: 'DevOps',
    badge: 'DevOps Transformation',
    title: 'Manufacturing Firm Cuts Release Cycles from 3 Weeks to 2 Days with Full DevOps Overhaul',
    client: 'PrecisionMfg Ltd.',
    industry: 'Manufacturing & IoT',
    duration: '6 Months',
    team: '7 Engineers',
    tags: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Grafana'],
    challenge:
      'A mid-size manufacturing company with a growing IoT platform was releasing software updates every 3 weeks due to manual, error-prone deployment processes. Each release required 2-day downtime and a 10-person manual review.',
    solution:
      'CreatixHub designed a complete CI/CD pipeline using Jenkins + Argo CD, containerized all 22 microservices with Docker, and implemented blue-green deployment to achieve zero-downtime releases. Full infrastructure moved to IaC with Terraform.',
    results: [
      { metric: '93%', label: 'Faster Release Cycles' },
      { metric: '0', label: 'Downtime per Deployment' },
      { metric: '85%', label: 'Reduction in Deploy Errors' },
      { metric: '3×', label: 'Developer Productivity Gain' },
    ],
    outcome:
      'The engineering team went from releasing every 3 weeks to shipping multiple times per day. Developer satisfaction scores increased by 40%, and two senior engineers who had resigned re-joined the team.',
    accentColor: '#00e5ff',
  },
  {
    id: 5,
    category: 'Custom Dev',
    badge: 'Platform Build',
    title: 'EdTech Startup Launches Multi-Tenant LMS Serving 50,000 Learners in 90 Days',
    client: 'LearnBridge',
    industry: 'Education Technology',
    duration: '3 Months',
    team: '8 Engineers',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'WebRTC'],
    challenge:
      'An edtech startup had secured a government contract to deliver an online learning platform to 50,000 students across 200 schools. They had 90 days, no existing codebase, and needed live video, offline mode, and regional language support.',
    solution:
      'Built a full-stack multi-tenant LMS from scratch — React frontend, Node.js microservices backend, WebRTC for live classes, Service Workers for offline capability, and AWS CloudFront for low-latency delivery across India.',
    results: [
      { metric: '50K+', label: 'Students Onboarded' },
      { metric: '90', label: 'Days to Full Launch' },
      { metric: '99.9%', label: 'Platform Uptime' },
      { metric: '8', label: 'Regional Languages Supported' },
    ],
    outcome:
      'Platform launched on time and under budget. The government extended the contract for 3 more states. LearnBridge was featured in Economic Times as a top EdTech startup of 2024.',
    accentColor: '#7c3aed',
  },
  {
    id: 6,
    category: 'AI & Data',
    badge: 'Data Engineering',
    title: 'Logistics Company Reduces Delivery Delays 35% with Real-Time Analytics Pipeline',
    client: 'SwiftMove Logistics',
    industry: 'Logistics & Supply Chain',
    duration: '4 Months',
    team: '5 Engineers',
    tags: ['Apache Kafka', 'Spark', 'Databricks', 'Power BI', 'Python'],
    challenge:
      'A logistics company managing 10,000+ daily shipments was operating on batch reports that were 24 hours stale. Fleet managers had no real-time visibility into delays, rerouting opportunities, or driver performance.',
    solution:
      'Built a real-time data streaming pipeline using Kafka + Spark, developed predictive delay models with 91% accuracy, and delivered a Power BI dashboard giving fleet managers live visibility into every active shipment.',
    results: [
      { metric: '35%', label: 'Reduction in Delivery Delays' },
      { metric: '91%', label: 'Prediction Model Accuracy' },
      { metric: '18%', label: 'Fuel Cost Savings' },
      { metric: 'Real-Time', label: 'From 24hr Stale Reports' },
    ],
    outcome:
      'SwiftMove became the first logistics operator in their region to offer customers live delivery ETAs. Customer satisfaction scores jumped from 3.2 to 4.6 out of 5 within two quarters.',
    accentColor: '#ff5c8a',
  },
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

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function CaseCard({ cs, index }) {
  const { ref, visible } = useScrollReveal();
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      ref={ref}
      className={`${styles.card} ${visible ? styles.cardVisible : ''}`}
      style={{ transitionDelay: `${(index % 2) * 120}ms` }}
    >
      <div className={styles.cardTop} style={{ borderColor: `${cs.accentColor}25` }}>
        <div className={styles.cardMeta}>
          <span className={styles.cardBadge} style={{ color: cs.accentColor, background: `${cs.accentColor}12`, borderColor: `${cs.accentColor}25` }}>
            {cs.badge}
          </span>
          <div className={styles.cardInfo}>
            <span>🏢 {cs.client}</span>
            <span>🏭 {cs.industry}</span>
            <span>⏱ {cs.duration}</span>
            <span>👥 {cs.team}</span>
          </div>
        </div>
        <h3 className={styles.cardTitle}>{cs.title}</h3>
        <div className={styles.tagRow}>
          {cs.tags.map(t => <span key={t} className={styles.techTag}>{t}</span>)}
        </div>
      </div>

      <div className={styles.resultsRow}>
        {cs.results.map(r => (
          <div key={r.label} className={styles.resultItem}>
            <div className={styles.resultMetric} style={{ color: cs.accentColor }}>{r.metric}</div>
            <div className={styles.resultLabel}>{r.label}</div>
          </div>
        ))}
      </div>

      <div className={`${styles.detail} ${expanded ? styles.detailOpen : ''}`}>
        <div className={styles.detailInner}>
          <div className={styles.detailBlock}>
            <div className={styles.detailBlockTitle}>🔍 The Challenge</div>
            <p>{cs.challenge}</p>
          </div>
          <div className={styles.detailBlock}>
            <div className={styles.detailBlockTitle}>⚡ Our Solution</div>
            <p>{cs.solution}</p>
          </div>
          <div className={styles.detailBlock} style={{ background: `${cs.accentColor}08`, borderColor: `${cs.accentColor}20` }}>
            <div className={styles.detailBlockTitle} style={{ color: cs.accentColor }}>🎯 Outcome</div>
            <p>{cs.outcome}</p>
          </div>
        </div>
      </div>

      <button className={styles.expandBtn} onClick={() => setExpanded(!expanded)} style={{ color: cs.accentColor }}>
        {expanded ? 'Show Less ↑' : 'Read Full Case Study ↓'}
      </button>
    </article>
  );
}

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState('All');
  const hero = useScrollReveal();
  const statsRef = useScrollReveal();

  const filtered = activeFilter === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(c => c.category === activeFilter);

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOrb} />
        <div ref={hero.ref} className={`${styles.heroContent} ${hero.visible ? styles.fadeIn : ''}`}>
          <div className={styles.heroBadge}><span className={styles.dot} /> Client Success Stories</div>
          <h1 className={styles.heroTitle}>Real Problems.<br /><span className={styles.accent}>Real Results.</span></h1>
          <p className={styles.heroSub}>
            Explore how CreatixHub has partnered with companies across industries to solve complex technology
            challenges — delivering measurable, lasting business impact every time.
          </p>
        </div>
      </section>

      {/* STAT STRIP */}
      <div className={styles.statStrip}>
        <div className={styles.wrap}>
          <div ref={statsRef.ref} className={`${styles.statRow} ${statsRef.visible ? styles.statRowVisible : ''}`}>
            {[
              { n: '250+', l: 'Projects Completed' },
              { n: '6', l: 'Industry Verticals' },
              { n: '98%', l: 'Client Satisfaction' },
              { n: '15+', l: 'Countries Served' },
            ].map((s, i) => (
              <div key={s.l} className={styles.statItem} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className={styles.statN}>{s.n}</div>
                <div className={styles.statL}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER + GRID */}
      <section className={styles.main}>
        <div className={styles.wrap}>
          <div className={styles.filters}>
            {FILTERS.map(f => (
              <button key={f} className={`${styles.filterBtn} ${activeFilter === f ? styles.filterActive : ''}`}
                onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
          <div className={styles.grid}>
            {filtered.map((cs, i) => <CaseCard key={cs.id} cs={cs} index={i} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.wrap}>
          <div className={styles.ctaBox}>
            <h2>Want results like these?</h2>
            <p>Let's talk about your specific challenge. Free consultation, no commitment.</p>
            <a href="#contact" className={styles.ctaBtn}>Start a Conversation →</a>
          </div>
        </div>
      </section>
    </div>
  );
}
