import React, { useState, useRef, useEffect } from 'react';
import styles from './Partners.module.css';

// ── DATA ──────────────────────────────────────────────────────────────────────

const TECH_PARTNERS = [
  { name: 'Amazon Web Services', logo: '☁️', tier: 'Select Partner', color: '#FF9900', desc: 'AWS Select Consulting Partner with specializations in cloud migration, DevOps, and security. 8 AWS-certified architects on staff.' },
  { name: 'Microsoft Azure', logo: '🔷', tier: 'Silver Partner', color: '#0078D4', desc: 'Microsoft Azure Silver Partner with competencies in cloud platform and data analytics. Delivering Azure solutions since 2016.' },
  { name: 'Google Cloud', logo: '🌐', tier: 'Partner', color: '#4285F4', desc: 'Authorized Google Cloud Partner specializing in data engineering, BigQuery, and Vertex AI deployments across APAC.' },
  { name: 'HashiCorp', logo: '⬡', tier: 'Technology Partner', color: '#7c3aed', desc: 'Official HashiCorp Technology Partner. Our DevOps team uses Terraform, Vault, and Consul across 100+ client environments.' },
  { name: 'Datadog', logo: '🐾', tier: 'Technology Partner', color: '#632CA6', desc: 'Datadog Technology Partner providing full-stack observability, APM, and log management for clients at enterprise scale.' },
  { name: 'CrowdStrike', logo: '🦅', tier: 'Partner', color: '#E3232C', desc: 'Authorized CrowdStrike partner for endpoint detection, threat intelligence, and managed security deployments.' },
  { name: 'Atlassian', logo: '🔷', tier: 'Solution Partner', color: '#0052CC', desc: 'Atlassian Solution Partner delivering Jira, Confluence, and Bitbucket implementations with custom integrations.' },
  { name: 'MongoDB', logo: '🍃', tier: 'Technology Partner', color: '#00ED64', desc: 'MongoDB Technology Partner specializing in database architecture, Atlas migrations, and performance optimization.' },
  { name: 'Elastic', logo: '⚡', tier: 'Partner', color: '#FEC514', desc: 'Elastic partner deploying ELK stacks for log management, SIEM, and enterprise search across client environments.' },
];

const PROGRAM_TIERS = [
  {
    name: 'Referral Partner',
    icon: '🤝',
    color: '#00e5ff',
    commission: 'Up to 10%',
    features: [
      'Revenue share on referred projects',
      'CreatixHub co-branded materials',
      'Dedicated partner manager',
      'Quarterly business reviews',
    ],
    ideal: 'Consultants, agencies, and IT advisors who want to refer clients and earn recurring revenue.',
  },
  {
    name: 'Solution Partner',
    icon: '⚡',
    color: '#7c3aed',
    commission: 'Up to 20%',
    featured: true,
    features: [
      'Everything in Referral',
      'Joint go-to-market campaigns',
      'Co-delivery on selected projects',
      'Technical training & certification support',
      'Priority listing on CreatixHub website',
      'Early access to new service offerings',
    ],
    ideal: 'Systems integrators and software companies looking to expand their service portfolio with IT capabilities.',
  },
  {
    name: 'Strategic Alliance',
    icon: '🌍',
    color: '#ff5c8a',
    commission: 'Custom Agreement',
    features: [
      'Everything in Solution Partner',
      'Joint venture opportunities',
      'Exclusive industry vertical focus',
      'Executive-level relationship management',
      'Custom co-development agreements',
      'Direct engineering collaboration',
    ],
    ideal: 'Large enterprises, private equity firms, and global consultancies seeking deep integration and exclusive engagements.',
  },
];

const PARTNERSHIP_BENEFITS = [
  { icon: '💰', title: 'Competitive Revenue Share', desc: 'Earn up to 20% commission on referred and co-delivered projects with transparent, monthly payouts.' },
  { icon: '📚', title: 'Technical Enablement', desc: 'Free access to our full training library, certification support, and dedicated technical account managers.' },
  { icon: '🎯', title: 'Joint Sales Support', desc: 'Our pre-sales engineers will join your client calls, create custom proposals, and support your entire sales cycle.' },
  { icon: '📣', title: 'Co-Marketing', desc: 'Joint case studies, co-branded campaigns, event sponsorships, and featured placement in our partner directory.' },
];

const PARTNER_TESTIMONIALS = [
  { name: 'Suresh Iyer', company: 'CloudNine Consulting', quote: 'The CreatixHub partnership has added ₹2 Cr in annual revenue to our business. Their technical team integrates seamlessly with ours, and clients can never tell where one company ends and the other begins.', initials: 'SI', gradient: 'linear-gradient(135deg, #00e5ff, #0077ff)' },
  { name: 'Meghna Shah', company: 'TechForward Solutions', quote: 'As a product company, we needed an IT services arm without the overhead. CreatixHub is exactly that. Our joint clients get the best of both worlds — our product expertise and their delivery excellence.', initials: 'MS', gradient: 'linear-gradient(135deg, #7c3aed, #4c1d95)' },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Apply Online', desc: 'Fill out our brief partnership application form. We review all applications within 48 business hours.' },
  { step: '02', title: 'Discovery Call', desc: 'A 30-minute call with our partnerships team to understand your business, clients, and collaboration goals.' },
  { step: '03', title: 'Partner Onboarding', desc: 'Sign the partner agreement, get access to our portal, training, and meet your dedicated partner manager.' },
  { step: '04', title: 'Start Earning', desc: 'Refer your first client, join a co-delivery project, or launch a joint campaign — and start earning together.' },
];

// ── HOOKS ─────────────────────────────────────────────────────────────────────

function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── MAIN ─────────────────────────────────────────────────────────────────────

export default function Partners() {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', type: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const hero = useScrollReveal();
  const tech = useScrollReveal();
  const tiers = useScrollReveal();
  const benefits = useScrollReveal();
  const process = useScrollReveal();
  const testimonials = useScrollReveal();
  const form = useScrollReveal();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
        <div ref={hero.ref} className={`${styles.heroContent} ${hero.visible ? styles.fadeIn : ''}`}>
          <div className={styles.heroBadge}><span className={styles.dot} /> Partnership Program</div>
          <h1 className={styles.heroTitle}>Grow Together.<br /><span className={styles.accent}>Win Together.</span></h1>
          <p className={styles.heroSub}>
            Join the CreatixHub Partner Ecosystem — a network of consultants, agencies, and technology
            companies who co-create, co-deliver, and co-grow with us across India and beyond.
          </p>
          <div className={styles.heroCounts}>
            <div className={styles.heroCount}><strong>50+</strong><span>Active Partners</span></div>
            <div className={styles.hDiv} />
            <div className={styles.heroCount}><strong>₹12 Cr+</strong><span>Partner Revenue Shared</span></div>
            <div className={styles.hDiv} />
            <div className={styles.heroCount}><strong>15+</strong><span>Countries Covered</span></div>
          </div>
        </div>
      </section>

      {/* TECH PARTNERS */}
      <section className={styles.techSection}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div className={styles.tag}>Technology Partners</div>
            <h2 className={styles.sectionTitle}>Our Technology Ecosystem</h2>
            <p className={styles.sectionSub}>We hold certified partnerships with the world's leading cloud and infrastructure providers, ensuring our clients always work with best-in-class tools.</p>
          </div>
          <div ref={tech.ref} className={`${styles.techGrid} ${tech.visible ? styles.techVisible : ''}`}>
            {TECH_PARTNERS.map((p, i) => (
              <div key={p.name} className={styles.techCard} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className={styles.techLogo} style={{ color: p.color }}>{p.logo}</div>
                <div className={styles.techName}>{p.name}</div>
                <div className={styles.techTier} style={{ color: p.color, background: `${p.color}12`, borderColor: `${p.color}25` }}>{p.tier}</div>
                <p className={styles.techDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER TIERS */}
      <section className={styles.tiersSection}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div className={styles.tag}>Partnership Tiers</div>
            <h2 className={styles.sectionTitle}>Choose Your Partnership Model</h2>
            <p className={styles.sectionSub}>Three flexible tiers designed for different partnership depths — from simple referrals to deep strategic alliances.</p>
          </div>
          <div ref={tiers.ref} className={`${styles.tiersGrid} ${tiers.visible ? styles.tiersVisible : ''}`}>
            {PROGRAM_TIERS.map((t, i) => (
              <div key={t.name} className={`${styles.tierCard} ${t.featured ? styles.tierFeatured : ''}`}
                style={{ transitionDelay: `${i * 120}ms`, borderColor: t.featured ? t.color : undefined }}>
                {t.featured && <div className={styles.tierBestBadge} style={{ background: t.color, color: '#fff' }}>Most Popular</div>}
                <div className={styles.tierIcon} style={{ background: `${t.color}15`, borderColor: `${t.color}25` }}>{t.icon}</div>
                <h3 className={styles.tierName}>{t.name}</h3>
                <div className={styles.tierCommission} style={{ color: t.color }}>{t.commission}</div>
                <div className={styles.tierIdeal}>{t.ideal}</div>
                <div className={styles.tierDivider} />
                <ul className={styles.tierFeatures}>
                  {t.features.map(f => (
                    <li key={f} className={styles.tierFeature}>
                      <span style={{ color: t.color }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a href="#partner-form" className={styles.tierBtn} style={{ background: t.featured ? t.color : 'transparent', color: t.featured ? '#050a14' : t.color, borderColor: t.color }}>
                  {t.featured ? 'Apply Now' : 'Learn More'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className={styles.benefitsSection}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div className={styles.tag}>What You Get</div>
            <h2 className={styles.sectionTitle}>Partnership Benefits</h2>
          </div>
          <div ref={benefits.ref} className={`${styles.benefitsGrid} ${benefits.visible ? styles.benefitsVisible : ''}`}>
            {PARTNERSHIP_BENEFITS.map((b, i) => (
              <div key={b.title} className={styles.benefitCard} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className={styles.benefitIcon}>{b.icon}</div>
                <h4 className={styles.benefitTitle}>{b.title}</h4>
                <p className={styles.benefitDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className={styles.processSection}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div className={styles.tag}>How It Works</div>
            <h2 className={styles.sectionTitle}>Partner Onboarding in 4 Steps</h2>
          </div>
          <div ref={process.ref} className={`${styles.processRow} ${process.visible ? styles.processVisible : ''}`}>
            {PROCESS_STEPS.map((s, i) => (
              <div key={s.step} className={styles.processStep} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={styles.stepNum}>{s.step}</div>
                <h4 className={styles.stepTitle}>{s.title}</h4>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={styles.testiSection}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div className={styles.tag}>Partner Stories</div>
            <h2 className={styles.sectionTitle}>What Our Partners Say</h2>
          </div>
          <div ref={testimonials.ref} className={`${styles.testiGrid} ${testimonials.visible ? styles.testiVisible : ''}`}>
            {PARTNER_TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={styles.testiCard} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className={styles.quoteIcon}>"</div>
                <p className={styles.testiQuote}>{t.quote}</p>
                <div className={styles.testiAuthor}>
                  <div className={styles.testiAvatar} style={{ background: t.gradient }}>{t.initials}</div>
                  <div>
                    <div className={styles.testiName}>{t.name}</div>
                    <div className={styles.testiCompany}>{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER FORM */}
      <section className={styles.formSection} id="partner-form">
        <div className={styles.wrap}>
          <div ref={form.ref} className={`${styles.formBox} ${form.visible ? styles.formVisible : ''}`}>
            <div className={styles.formLeft}>
              <div className={styles.tag}>Get Started</div>
              <h2 className={styles.sectionTitle}>Apply to Become<br />a Partner</h2>
              <p className={styles.formSub}>Tell us a bit about your business and what kind of partnership you have in mind. We'll respond within 48 hours.</p>
              <div className={styles.formContact}>
                <div className={styles.formContactItem}><span>📧</span> partnerships@creatixhub.com</div>
                <div className={styles.formContactItem}><span>📞</span> +1 (800) CREATIX</div>
              </div>
            </div>
            <div className={styles.formRight}>
              {submitted ? (
                <div className={styles.formSuccess}>
                  <div className={styles.formSuccessIcon}>🤝</div>
                  <h3>Application Received!</h3>
                  <p>Our partnerships team will reach out within 48 hours to schedule a discovery call.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label>Your Name</label>
                      <input type="text" name="name" placeholder="Ravi Kumar" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className={styles.formField}>
                      <label>Company</label>
                      <input type="text" name="company" placeholder="Acme Tech" value={formData.company} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className={styles.formField}>
                    <label>Business Email</label>
                    <input type="email" name="email" placeholder="ravi@acmetech.com" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className={styles.formField}>
                    <label>Partnership Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} required>
                      <option value="">Select partnership type...</option>
                      <option>Referral Partner</option>
                      <option>Solution Partner</option>
                      <option>Strategic Alliance</option>
                      <option>Technology Integration</option>
                    </select>
                  </div>
                  <div className={styles.formField}>
                    <label>Tell us about your business</label>
                    <textarea name="message" rows={4} placeholder="Describe your business, typical clients, and what you're hoping to achieve through this partnership..." value={formData.message} onChange={handleChange} required />
                  </div>
                  <button type="submit" className={styles.formSubmit}>Submit Application →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
