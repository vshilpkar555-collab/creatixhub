import React, { useState, useRef, useEffect } from 'react';
import styles from './Careers.module.css';

// ── DATA ──────────────────────────────────────────────────────────────────────

const PERKS = [
  { icon: '🏠', title: 'Flexible & Remote', desc: 'Work from our offices in Bangalore, Mumbai, or Indore — or fully remote. We judge by output, not attendance.' },
  { icon: '📈', title: 'Career Growth', desc: 'Structured learning paths, annual promotion reviews, and a dedicated ₹50,000/year L&D budget for every engineer.' },
  { icon: '🏥', title: 'Health & Wellness', desc: 'Comprehensive health insurance for you and your family, mental health support, and quarterly wellness allowances.' },
  { icon: '💰', title: 'Competitive Pay', desc: 'Market-leading salaries benchmarked quarterly, ESOPs for senior roles, and performance bonuses twice a year.' },
  { icon: '🚀', title: 'Cutting-Edge Tech', desc: 'Work with the latest cloud, AI, and DevOps tools. We invest in the best infrastructure so you can focus on building.' },
  { icon: '🌍', title: 'Global Exposure', desc: 'Opportunities to work with international clients, attend global tech conferences, and lead cross-border projects.' },
];

const CULTURE_VALUES = [
  { title: 'Build in the Open', desc: 'We share what we learn — internally and externally. Monthly tech talks, open PR reviews, and an internal wiki anyone can edit.' },
  { title: 'Fail Fast, Learn Faster', desc: 'Mistakes are celebrated as learning opportunities. We have a blameless post-mortem culture and no fear of experimentation.' },
  { title: 'Deep Work Matters', desc: 'Meeting-light culture with dedicated deep work blocks. We use async communication by default and synchronous meetings by exception.' },
];

const JOB_FILTERS = ['All', 'Engineering', 'DevOps', 'AI & Data', 'Security', 'Management'];

const JOBS = [
  {
    id: 1,
    title: 'Senior Cloud Engineer (AWS/Azure)',
    dept: 'Engineering',
    location: 'Bangalore / Hybrid',
    type: 'Full-Time',
    experience: '4–7 Years',
    salary: '₹18–28 LPA',
    posted: '3 days ago',
    urgent: true,
    skills: ['AWS', 'Azure', 'Terraform', 'Kubernetes', 'Docker'],
    about: 'Design, implement, and maintain enterprise cloud infrastructures for our clients across fintech, healthcare, and e-commerce. You will own architecture decisions and work directly with client CTOs.',
    responsibilities: [
      'Architect multi-cloud environments on AWS and Azure following Well-Architected principles',
      'Write and maintain Terraform modules for infrastructure-as-code across 20+ client environments',
      'Lead cloud migration projects from planning to go-live',
      'Conduct cost optimization reviews and implement FinOps practices',
      'Mentor junior engineers and conduct technical interviews',
    ],
    requirements: [
      'AWS Solutions Architect Professional or Azure Expert certification',
      '4+ years of hands-on cloud infrastructure experience',
      'Strong experience with Kubernetes, Helm, and container orchestration',
      'Proficiency in Python or Go for automation scripting',
    ],
  },
  {
    id: 2,
    title: 'React Native Developer',
    dept: 'Engineering',
    location: 'Remote',
    type: 'Full-Time',
    experience: '2–5 Years',
    salary: '₹12–22 LPA',
    posted: '1 week ago',
    urgent: false,
    skills: ['React Native', 'TypeScript', 'Redux', 'REST APIs', 'Jest'],
    about: 'Join our mobile team to build cross-platform applications for clients in healthcare, fintech, and retail. You will own the full mobile development lifecycle from design handoff to App Store release.',
    responsibilities: [
      'Build and ship React Native apps for iOS and Android from scratch',
      'Collaborate with designers to implement pixel-perfect UIs',
      'Integrate REST and GraphQL APIs, handle complex state with Redux Toolkit',
      'Write comprehensive unit and E2E tests using Jest and Detox',
      'Optimize app performance and reduce bundle sizes',
    ],
    requirements: [
      '2+ years of React Native development with published apps',
      'Strong TypeScript proficiency',
      'Experience with native modules and bridging when needed',
      'Solid understanding of mobile UX principles and accessibility',
    ],
  },
  {
    id: 3,
    title: 'MLOps / AI Engineer',
    dept: 'AI & Data',
    location: 'Bangalore / Remote',
    type: 'Full-Time',
    experience: '3–6 Years',
    salary: '₹20–35 LPA',
    posted: '5 days ago',
    urgent: true,
    skills: ['Python', 'MLflow', 'Kubeflow', 'TensorFlow', 'AWS SageMaker'],
    about: 'Bridge the gap between data science and production engineering. You will take ML models from notebook to production-grade systems serving millions of real-world predictions daily.',
    responsibilities: [
      'Build and maintain ML training and inference pipelines on AWS SageMaker and Kubeflow',
      'Implement model monitoring, drift detection, and automated retraining workflows',
      'Collaborate with data scientists to productionize research models',
      'Design feature stores and data versioning strategies',
      'Optimize model serving latency and infrastructure costs',
    ],
    requirements: [
      '3+ years of ML engineering or MLOps experience',
      'Strong Python skills and experience with ML frameworks (PyTorch / TensorFlow)',
      'Hands-on with at least one cloud ML platform (SageMaker, Vertex AI, or Azure ML)',
      'Familiarity with Kubernetes and containerization of ML workloads',
    ],
  },
  {
    id: 4,
    title: 'Cybersecurity Analyst (VAPT)',
    dept: 'Security',
    location: 'Bangalore / Indore',
    type: 'Full-Time',
    experience: '2–5 Years',
    salary: '₹14–24 LPA',
    posted: '2 weeks ago',
    urgent: false,
    skills: ['Penetration Testing', 'OWASP', 'Burp Suite', 'Metasploit', 'ISO 27001'],
    about: 'Protect our clients from evolving cyber threats by conducting vulnerability assessments, penetration tests, and helping them achieve security compliance. Work with a team of certified ethical hackers.',
    responsibilities: [
      'Conduct web application, API, and network penetration tests',
      'Perform vulnerability assessments using industry tools and manual techniques',
      'Produce clear, actionable security reports for technical and non-technical stakeholders',
      'Support clients through ISO 27001, SOC 2, and PCI-DSS compliance journeys',
      'Stay current with emerging CVEs and attack techniques',
    ],
    requirements: [
      'CEH, OSCP, or equivalent ethical hacking certification',
      '2+ years of hands-on VAPT experience',
      'Proficiency with Burp Suite Pro, Nmap, Metasploit, and OSINT tools',
      'Experience with cloud security assessment (AWS/Azure)',
    ],
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    dept: 'DevOps',
    location: 'Remote',
    type: 'Full-Time',
    experience: '2–5 Years',
    salary: '₹14–26 LPA',
    posted: '4 days ago',
    urgent: true,
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Prometheus'],
    about: 'Help our clients ship faster and more reliably by building and maintaining world-class CI/CD pipelines, monitoring stacks, and cloud-native infrastructure. You will own delivery pipelines end-to-end.',
    responsibilities: [
      'Design and maintain CI/CD pipelines using Jenkins, GitHub Actions, and Argo CD',
      'Manage Kubernetes clusters across dev, staging, and production environments',
      'Implement observability stacks with Prometheus, Grafana, and ELK',
      'Automate infrastructure provisioning with Terraform and Ansible',
      'Drive incident response processes and SLA management',
    ],
    requirements: [
      '2+ years of DevOps or platform engineering experience',
      'Strong Kubernetes administration skills (CKA preferred)',
      'Experience writing CI/CD pipelines from scratch',
      'Linux systems proficiency and shell scripting',
    ],
  },
  {
    id: 6,
    title: 'Engagement Manager',
    dept: 'Management',
    location: 'Bangalore',
    type: 'Full-Time',
    experience: '5–10 Years',
    salary: '₹25–40 LPA',
    posted: '1 week ago',
    urgent: false,
    skills: ['Project Management', 'Agile', 'Stakeholder Management', 'JIRA', 'PMP'],
    about: 'Lead delivery of large-scale IT projects, acting as the primary interface between CreatixHub engineering teams and client leadership. Own the full project lifecycle from kick-off to handover.',
    responsibilities: [
      'Manage 3–5 concurrent client engagements with budgets up to ₹5 Cr',
      'Drive agile ceremonies, sprint planning, and retrospectives',
      'Build and maintain strong executive relationships with client stakeholders',
      'Identify risks early and develop mitigation strategies proactively',
      'Coordinate across engineering, design, QA, and DevOps teams',
    ],
    requirements: [
      'PMP or PRINCE2 certification strongly preferred',
      '5+ years of IT project or program management',
      'Experience managing technical teams and client relationships simultaneously',
      'Excellent written and verbal communication in English',
    ],
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

function JobCard({ job, index }) {
  const { ref, visible } = useScrollReveal();
  const [open, setOpen] = useState(false);

  return (
    <div ref={ref} className={`${styles.jobCard} ${visible ? styles.jobVisible : ''}`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}>
      <div className={styles.jobHeader} onClick={() => setOpen(!open)}>
        <div className={styles.jobLeft}>
          <div className={styles.jobTopRow}>
            <h3 className={styles.jobTitle}>{job.title}</h3>
            {job.urgent && <span className={styles.urgentBadge}>🔥 Urgent</span>}
          </div>
          <div className={styles.jobMeta}>
            <span>📍 {job.location}</span>
            <span>⏱ {job.type}</span>
            <span>🎓 {job.experience}</span>
            <span>💰 {job.salary}</span>
            <span>🕐 {job.posted}</span>
          </div>
          <div className={styles.jobSkills}>
            {job.skills.map(s => <span key={s} className={styles.skillChip}>{s}</span>)}
          </div>
        </div>
        <div className={styles.jobArrow} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>⌄</div>
      </div>

      <div className={`${styles.jobDetail} ${open ? styles.jobDetailOpen : ''}`}>
        <div className={styles.jobDetailInner}>
          <p className={styles.jobAbout}>{job.about}</p>
          <div className={styles.jobCols}>
            <div>
              <div className={styles.jobColTitle}>Key Responsibilities</div>
              <ul className={styles.jobList}>
                {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
            <div>
              <div className={styles.jobColTitle}>Requirements</div>
              <ul className={styles.jobList}>
                {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          </div>
          <a
            href={`mailto:creatixhub21@gmail.com?subject=Application for ${job.title}`}
            className={styles.applyBtn}
          >
            Apply for This Role →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Careers() {
  const [filter, setFilter] = useState('All');
  const hero = useScrollReveal();
  const perks = useScrollReveal();
  const culture = useScrollReveal();

  const filtered = filter === 'All' ? JOBS : JOBS.filter(j => j.dept === filter);

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
        <div ref={hero.ref} className={`${styles.heroContent} ${hero.visible ? styles.fadeIn : ''}`}>
          <div className={styles.heroBadge}><span className={styles.dot} /> We're Hiring</div>
          <h1 className={styles.heroTitle}>Build the Future<br /><span className={styles.accent}>With Us.</span></h1>
          <p className={styles.heroSub}>
            Join a team of 40+ engineers, strategists, and problem-solvers who are transforming how
            businesses use technology — from Bangalore to the world.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}><strong>40+</strong><span>Team Members</span></div>
            <div className={styles.heroStatDiv} />
            <div className={styles.heroStat}><strong>6</strong><span>Open Roles</span></div>
            <div className={styles.heroStatDiv} />
            <div className={styles.heroStat}><strong>4.8★</strong><span>Glassdoor Rating</span></div>
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className={styles.perksSection}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div className={styles.tag}>Why Join Us</div>
            <h2 className={styles.sectionTitle}>Life at CreatixHub</h2>
            <p className={styles.sectionSub}>More than a job — a place to do the best work of your career alongside people who push each other to grow.</p>
          </div>
          <div ref={perks.ref} className={`${styles.perksGrid} ${perks.visible ? styles.perksVisible : ''}`}>
            {PERKS.map((p, i) => (
              <div key={p.title} className={styles.perkCard} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className={styles.perkIcon}>{p.icon}</div>
                <h4 className={styles.perkTitle}>{p.title}</h4>
                <p className={styles.perkDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CULTURE */}
      <section className={styles.cultureSection}>
        <div className={styles.wrap}>
          <div ref={culture.ref} className={`${styles.cultureGrid} ${culture.visible ? styles.cultureVisible : ''}`}>
            <div>
              <div className={styles.tag}>Our Culture</div>
              <h2 className={styles.sectionTitle}>How We Work</h2>
              <p className={styles.sectionSub}>We've thought carefully about the environment that brings out the best in engineers and problem-solvers.</p>
            </div>
            <div className={styles.culturePoints}>
              {CULTURE_VALUES.map((c, i) => (
                <div key={c.title} className={styles.culturePoint} style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className={styles.cultureNum}>0{i + 1}</div>
                  <div>
                    <h4 className={styles.cultureTitle}>{c.title}</h4>
                    <p className={styles.cultureDesc}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JOBS */}
      <section className={styles.jobsSection}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div className={styles.tag}>Open Positions</div>
            <h2 className={styles.sectionTitle}>Current Openings</h2>
          </div>
          <div className={styles.jobFilters}>
            {JOB_FILTERS.map(f => (
              <button key={f} className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
                onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <div className={styles.jobList}>
            {filtered.map((j, i) => <JobCard key={j.id} job={j} index={i} />)}
          </div>
        </div>
      </section>

      {/* OPEN APP */}
      <section className={styles.openApp}>
        <div className={styles.wrap}>
          <div className={styles.openAppBox}>
            <div className={styles.openAppIcon}>💌</div>
            <h3>Don't see the right role?</h3>
            <p>We're always on the lookout for exceptional talent. Send us your resume and tell us what you'd love to build at CreatixHub.</p>
            <a href="mailto:creatixhub21@gmail.com?subject=Open Application" className={styles.openAppBtn}>Send an Open Application</a>
          </div>
        </div>
      </section>
    </div>
  );
}
