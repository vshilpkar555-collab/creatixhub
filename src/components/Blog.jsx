import React, { useState, useRef, useEffect } from 'react';
import styles from './Blog.module.css';

// ── DATA ──────────────────────────────────────────────────────────────────────

const CATEGORIES = ['All', 'Cloud', 'AI & ML', 'Cybersecurity', 'DevOps', 'Engineering', 'Business'];

const POSTS = [
  {
    id: 1,
    featured: true,
    category: 'AI & ML',
    title: 'The Practical Guide to Taking Your ML Models from Notebook to Production in 2025',
    excerpt: 'Most machine learning projects fail not because of bad models, but because of bad engineering. In this deep-dive, we share the exact MLOps architecture we use to deploy models that serve millions of predictions daily with sub-100ms latency.',
    author: 'Arjun Nair',
    authorRole: 'Head of AI & Data',
    date: 'February 14, 2025',
    readTime: '12 min read',
    tags: ['MLOps', 'SageMaker', 'Kubeflow', 'Python'],
    accentColor: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed22, #ff5c8a22)',
  },
  {
    id: 2,
    featured: false,
    category: 'Cloud',
    title: 'AWS vs Azure vs GCP in 2025: An Honest Engineering Comparison',
    excerpt: 'After deploying production workloads on all three major cloud providers, here is our unbiased breakdown of where each one truly excels — and where they fall flat. No vendor bias, just engineering reality.',
    author: 'Priya Mehta',
    authorRole: 'Chief Technology Officer',
    date: 'January 28, 2025',
    readTime: '9 min read',
    tags: ['AWS', 'Azure', 'GCP', 'Architecture'],
    accentColor: '#00e5ff',
    gradient: 'linear-gradient(135deg, #00e5ff18, #0077ff18)',
  },
  {
    id: 3,
    featured: false,
    category: 'Cybersecurity',
    title: '14 Critical Vulnerabilities We Found in "Secure" Enterprise Systems (And How to Fix Them)',
    excerpt: 'Based on 50+ penetration tests conducted over the past year, we have compiled the most common and dangerous vulnerabilities that slip through the cracks in enterprise security postures. Is your system on this list?',
    author: 'Vikram Singh',
    authorRole: 'Lead Security Engineer',
    date: 'January 15, 2025',
    readTime: '14 min read',
    tags: ['VAPT', 'OWASP', 'Zero Trust', 'Compliance'],
    accentColor: '#ff5c8a',
    gradient: 'linear-gradient(135deg, #ff5c8a18, #83184318)',
  },
  {
    id: 4,
    featured: false,
    category: 'DevOps',
    title: 'How We Cut a Client\'s Deployment Time from 3 Weeks to 4 Hours',
    excerpt: 'A detailed walkthrough of the CI/CD transformation we delivered for a manufacturing client — the exact pipeline architecture, the tools we chose, why we rejected the others, and the mistakes we made along the way.',
    author: 'Deepak Rao',
    authorRole: 'DevOps Lead',
    date: 'December 20, 2024',
    readTime: '11 min read',
    tags: ['CI/CD', 'Jenkins', 'Kubernetes', 'Argo CD'],
    accentColor: '#00e5ff',
    gradient: 'linear-gradient(135deg, #00e5ff15, #7c3aed15)',
  },
  {
    id: 5,
    featured: false,
    category: 'Engineering',
    title: 'Microservices vs Monolith: We Tried Both. Here\'s the Truth.',
    excerpt: 'The debate never ends, but our experience running both architectures across hundreds of client projects has given us a nuanced view. Spoiler: the answer depends entirely on your team size and release cadence.',
    author: 'Priya Mehta',
    authorRole: 'Chief Technology Officer',
    date: 'December 5, 2024',
    readTime: '8 min read',
    tags: ['Architecture', 'Microservices', 'System Design'],
    accentColor: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed18, #00e5ff18)',
  },
  {
    id: 6,
    featured: false,
    category: 'Business',
    title: 'The CTO\'s Guide to Evaluating IT Service Partners (And Avoiding Bad Ones)',
    excerpt: 'After 12 years on the vendor side, we know every trick in the book. Here is an honest guide for CTOs and engineering leaders on what to look for — and the red flags that signal a vendor will cause you pain down the line.',
    author: 'Rohan Sharma',
    authorRole: 'Chief Executive Officer',
    date: 'November 22, 2024',
    readTime: '7 min read',
    tags: ['CTO', 'Outsourcing', 'Strategy', 'Vendor Management'],
    accentColor: '#ff5c8a',
    gradient: 'linear-gradient(135deg, #ff5c8a12, #7c3aed12)',
  },
  {
    id: 7,
    featured: false,
    category: 'AI & ML',
    title: 'Generative AI in the Enterprise: Hype vs. Real ROI in 2025',
    excerpt: 'We deployed 8 enterprise GenAI solutions in 2024. Three delivered transformational value. Three were useful but marginal. Two were abandoned. Here is what separated the winners from the rest.',
    author: 'Arjun Nair',
    authorRole: 'Head of AI & Data',
    date: 'November 10, 2024',
    readTime: '10 min read',
    tags: ['GenAI', 'LLMs', 'RAG', 'Enterprise AI'],
    accentColor: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed20, #ff5c8a15)',
  },
  {
    id: 8,
    featured: false,
    category: 'Cloud',
    title: 'FinOps at Scale: How We Saved Clients ₹4 Crore in AWS Bills Last Year',
    excerpt: 'Cloud costs are out of control for most companies. Here is the exact framework we use to audit, right-size, and continuously optimize cloud spend — resulting in an average 35% cost reduction without any performance tradeoff.',
    author: 'Priya Mehta',
    authorRole: 'Chief Technology Officer',
    date: 'October 30, 2024',
    readTime: '9 min read',
    tags: ['FinOps', 'AWS Cost', 'Optimization', 'Savings'],
    accentColor: '#00e5ff',
    gradient: 'linear-gradient(135deg, #00e5ff15, #7c3aed15)',
  },
];

const NEWSLETTER_TOPICS = ['Cloud & Infrastructure', 'AI & Machine Learning', 'Cybersecurity', 'DevOps Best Practices', 'Engineering Leadership'];

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

function PostCard({ post, index, featured }) {
  const { ref, visible } = useScrollReveal();

  if (featured) {
    return (
      <div ref={ref} className={`${styles.featuredCard} ${visible ? styles.cardVisible : ''}`}
        style={{ background: post.gradient }}>
        <div className={styles.featuredLeft}>
          <div className={styles.postCategoryBadge} style={{ color: post.accentColor, background: `${post.accentColor}15`, borderColor: `${post.accentColor}30` }}>
            ⭐ Featured · {post.category}
          </div>
          <h2 className={styles.featuredTitle}>{post.title}</h2>
          <p className={styles.featuredExcerpt}>{post.excerpt}</p>
          <div className={styles.postMeta}>
            <div className={styles.authorChip}>
              <div className={styles.authorDot} style={{ background: post.accentColor }} />
              <span>{post.author}</span>
              <span className={styles.metaDivider}>·</span>
              <span>{post.date}</span>
              <span className={styles.metaDivider}>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
          <div className={styles.postTags}>
            {post.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
          </div>
          <a href="#" className={styles.readBtn} style={{ background: post.accentColor, color: '#050a14' }}>
            Read Article →
          </a>
        </div>
        <div className={styles.featuredRight}>
          <div className={styles.featuredIllustration} style={{ borderColor: `${post.accentColor}20` }}>
            <div className={styles.codeBlock}>
              <div className={styles.codeLine}><span style={{ color: '#7c3aed' }}>import</span> <span style={{ color: '#00e5ff' }}>mlflow</span></div>
              <div className={styles.codeLine}><span style={{ color: '#7c3aed' }}>from</span> <span style={{ color: '#00e5ff' }}>sagemaker</span> <span style={{ color: '#7c3aed' }}>import</span> Session</div>
              <div className={styles.codeLine}>&nbsp;</div>
              <div className={styles.codeLine}><span style={{ color: '#ff5c8a' }}>def</span> <span style={{ color: '#fbbf24' }}>deploy_model</span>(model, endpoint):</div>
              <div className={styles.codeLine}>&nbsp;&nbsp;<span style={{ color: '#7a8aaa' }}># Production-grade MLOps</span></div>
              <div className={styles.codeLine}>&nbsp;&nbsp;<span style={{ color: '#00e5ff' }}>predictor</span> = model.deploy(</div>
              <div className={styles.codeLine}>&nbsp;&nbsp;&nbsp;&nbsp;instance_type=<span style={{ color: '#a78bfa' }}>'ml.g4dn.xlarge'</span></div>
              <div className={styles.codeLine}>&nbsp;&nbsp;)</div>
              <div className={styles.codeLine}>&nbsp;&nbsp;<span style={{ color: '#7c3aed' }}>return</span> predictor</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article ref={ref} className={`${styles.postCard} ${visible ? styles.cardVisible : ''}`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}>
      <div className={styles.postCardTop} style={{ borderTopColor: post.accentColor }}>
        <div className={styles.postCategoryBadge} style={{ color: post.accentColor, background: `${post.accentColor}12`, borderColor: `${post.accentColor}25` }}>
          {post.category}
        </div>
        <h3 className={styles.postTitle}>{post.title}</h3>
        <p className={styles.postExcerpt}>{post.excerpt}</p>
      </div>
      <div className={styles.postCardBottom}>
        <div className={styles.postAuthor}>
          <div className={styles.authorDot} style={{ background: post.accentColor }} />
          <div>
            <div className={styles.authorName}>{post.author}</div>
            <div className={styles.authorRole}>{post.authorRole}</div>
          </div>
        </div>
        <div className={styles.postFooter}>
          <span className={styles.postDate}>{post.date}</span>
          <span className={styles.postRead}>{post.readTime}</span>
        </div>
        <div className={styles.postTags}>
          {post.tags.slice(0, 3).map(t => <span key={t} className={styles.tag}>{t}</span>)}
        </div>
        <a href="#" className={styles.postReadBtn} style={{ color: post.accentColor }}>Read More →</a>
      </div>
    </article>
  );
}

export default function Blog() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const hero = useScrollReveal();
  const newsletter = useScrollReveal();

  const featured = POSTS.find(p => p.featured);
  const filtered = POSTS.filter(p => !p.featured)
    .filter(p => category === 'All' || p.category === category)
    .filter(p => search === '' || p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOrb} />
        <div ref={hero.ref} className={`${styles.heroContent} ${hero.visible ? styles.fadeIn : ''}`}>
          <div className={styles.heroBadge}><span className={styles.dot} /> Engineering Insights</div>
          <h1 className={styles.heroTitle}>The CreatixHub<br /><span className={styles.accent}>Tech Blog</span></h1>
          <p className={styles.heroSub}>
            Practical guides, real-world case breakdowns, and honest opinions from engineers who build
            production systems every day. No fluff. Just signal.
          </p>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input type="text" placeholder="Search articles, topics, or tags..." value={search}
              onChange={e => setSearch(e.target.value)} className={styles.searchInput} />
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className={styles.featuredSection}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionTag}>Editor's Pick</div>
            <h2 className={styles.sectionTitle}>Featured Article</h2>
          </div>
          {featured && <PostCard post={featured} featured={true} />}
        </div>
      </section>

      {/* GRID */}
      <section className={styles.gridSection}>
        <div className={styles.wrap}>
          <div className={styles.gridTop}>
            <div>
              <div className={styles.sectionTag}>Latest Articles</div>
              <h2 className={styles.sectionTitle}>All Posts</h2>
            </div>
            <div className={styles.filters}>
              {CATEGORIES.map(c => (
                <button key={c} className={`${styles.filterBtn} ${category === c ? styles.filterActive : ''}`}
                  onClick={() => setCategory(c)}>{c}</button>
              ))}
            </div>
          </div>
          <div className={styles.postsGrid}>
            {filtered.length > 0 ? filtered.map((p, i) => <PostCard key={p.id} post={p} index={i} />) : (
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>🔍</div>
                <p>No posts found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className={styles.newsletterSection}>
        <div className={styles.wrap}>
          <div ref={newsletter.ref} className={`${styles.newsletterBox} ${newsletter.visible ? styles.nlVisible : ''}`}>
            <div className={styles.nlLeft}>
              <div className={styles.sectionTag}>Stay Updated</div>
              <h2 className={styles.nlTitle}>Get the Newsletter</h2>
              <p className={styles.nlSub}>Join 2,400+ engineers and CTOs who get our best articles, case studies, and insights — delivered once a week, never spammy.</p>
              <div className={styles.nlTopics}>
                {NEWSLETTER_TOPICS.map(t => (
                  <span key={t} className={styles.nlTopic}>✓ {t}</span>
                ))}
              </div>
            </div>
            <div className={styles.nlRight}>
              {subscribed ? (
                <div className={styles.nlSuccess}>
                  <div className={styles.nlSuccessIcon}>🎉</div>
                  <h4>You're in!</h4>
                  <p>Check your inbox for a confirmation. First issue lands this Friday.</p>
                </div>
              ) : (
                <div className={styles.nlForm}>
                  <label className={styles.nlLabel}>Your email address</label>
                  <input type="email" placeholder="you@company.com" value={email}
                    onChange={e => setEmail(e.target.value)} className={styles.nlInput} />
                  <button className={styles.nlBtn} onClick={() => email && setSubscribed(true)}>
                    Subscribe — It's Free
                  </button>
                  <p className={styles.nlDisclaim}>No spam. Unsubscribe anytime.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
