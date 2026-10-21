'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  PhoneCall,
  Mic,
  Search,
  X,
  Star,
  Sparkles,
  SlidersHorizontal,
  ExternalLink,
} from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import type { CaseStudiesHub, CaseStudyPage, HeroImage, Story } from '@/content/types';
import { brandInspireMap, type BrandInspireData } from './story-inspire';

import { asset } from '@/lib/asset';
type Entry = { slug: string; agent: string; story: Story };

const brandPhotos: Record<string, string> = {
  'Mysa Living': asset('/images/case-studies/mysa-living.jpg'),
  'Aster & Row': asset('/images/case-studies/aster-and-row.jpg'),
  'North & Pine': asset('/images/case-studies/north-and-pine.jpg'),
  'Nivara': asset('/images/case-studies/nivara.jpg'),
  'Casa Noma': asset('/images/case-studies/casa-noma.jpg'),
  'Stacklane': asset('/images/case-studies/stacklane.jpg'),
  'Sunday Form': asset('/images/case-studies/sunday-form.jpg'),
  'Northstar SaaS': asset('/images/case-studies/northstar-saas.jpg'),
  'LatticeFlow Labs': asset('/images/case-studies/latticeflow-labs.jpg'),
  'RelayDesk': asset('/images/case-studies/relaydesk.jpg'),
};

/* Executive Monogram Badge - Eliminates human face photos in favor of verified credentials */
export function ExecutiveBadge({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="cs2-exec-badge" aria-label={name}>
      <span>{initials}</span>
    </div>
  );
}

const person = (attribution: string) => {
  const [name, ...role] = attribution.split(' | ');
  return { name: name.trim(), role: role.join(', ').trim() };
};

/* Brand Emblem & Typographic Identity */
export function BrandLogo({ brand }: { brand: string }) {
  switch (brand) {
    case 'Mysa Living':
      return (
        <div className="cs-brand-mark brand-mysa">
          <svg viewBox="0 0 32 32" fill="none" className="cs-brand-icon" aria-hidden="true">
            <rect width="32" height="32" rx="9" fill="#eaf4ff" />
            <path
              d="M8 21V11L16 17L24 11V21"
              stroke="#0c3474"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="9" r="2.2" fill="#2c9cfa" />
          </svg>
          <div className="cs-brand-text">
            <span className="cs-brand-name">MYSA LIVING</span>
            <span className="cs-brand-sub">Nordic Home & Decor</span>
          </div>
        </div>
      );
    case 'Aster & Row':
      return (
        <div className="cs-brand-mark brand-aster">
          <svg viewBox="0 0 32 32" fill="none" className="cs-brand-icon" aria-hidden="true">
            <rect width="32" height="32" rx="9" fill="#fdf4ea" />
            <path
              d="M16 6L19 12.5L26 16L19 19.5L16 26L13 19.5L6 16L13 12.5L16 6Z"
              fill="#b45309"
            />
          </svg>
          <div className="cs-brand-text">
            <span className="cs-brand-name">ASTER & ROW</span>
            <span className="cs-brand-sub">Luxury Apparel</span>
          </div>
        </div>
      );
    case 'North & Pine':
      return (
        <div className="cs-brand-mark brand-north">
          <svg viewBox="0 0 32 32" fill="none" className="cs-brand-icon" aria-hidden="true">
            <rect width="32" height="32" rx="9" fill="#edf7f0" />
            <path d="M16 6L22 13H18.5L23 20H9L13.5 13H10L16 6Z" fill="#15803d" />
            <rect x="14.8" y="20" width="2.4" height="5" fill="#15803d" />
          </svg>
          <div className="cs-brand-text">
            <span className="cs-brand-name">NORTH & PINE</span>
            <span className="cs-brand-sub">Outdoor & Gear</span>
          </div>
        </div>
      );
    case 'Nivara':
      return (
        <div className="cs-brand-mark brand-nivara">
          <svg viewBox="0 0 32 32" fill="none" className="cs-brand-icon" aria-hidden="true">
            <rect width="32" height="32" rx="9" fill="#fef2f2" />
            <circle cx="16" cy="16" r="8" stroke="#e11d48" strokeWidth="2" />
            <path
              d="M16 8C16 12.5 12.5 16 8 16C12.5 16 16 19.5 16 24C16 19.5 19.5 16 24 16C19.5 16 16 12.5 16 8Z"
              fill="#e11d48"
            />
          </svg>
          <div className="cs-brand-text">
            <span className="cs-brand-name">NIVARA</span>
            <span className="cs-brand-sub">Sustainable Lifestyle</span>
          </div>
        </div>
      );
    case 'Casa Noma':
      return (
        <div className="cs-brand-mark brand-casanoma">
          <svg viewBox="0 0 32 32" fill="none" className="cs-brand-icon" aria-hidden="true">
            <rect width="32" height="32" rx="9" fill="#fdf6ec" />
            <path
              d="M9 23V14C9 10.134 12.134 7 16 7C19.866 7 23 10.134 23 14V23H9Z"
              stroke="#c2410c"
              strokeWidth="2.4"
            />
            <circle cx="16" cy="14" r="3" fill="#f97316" />
          </svg>
          <div className="cs-brand-text">
            <span className="cs-brand-name">CASA NOMA</span>
            <span className="cs-brand-sub">Artisanal Decor</span>
          </div>
        </div>
      );
    case 'Stacklane':
      return (
        <div className="cs-brand-mark brand-stacklane">
          <svg viewBox="0 0 32 32" fill="none" className="cs-brand-icon" aria-hidden="true">
            <rect width="32" height="32" rx="9" fill="#f0fdfa" />
            <path d="M8 11L16 7L24 11L16 15L8 11Z" fill="#0d9488" />
            <path
              d="M8 16L16 20L24 16"
              stroke="#0d9488"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M8 21L16 25L24 21"
              stroke="#0d9488"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
          <div className="cs-brand-text">
            <span className="cs-brand-name">STACKLANE</span>
            <span className="cs-brand-sub">Developer Cloud</span>
          </div>
        </div>
      );
    case 'Sunday Form':
      return (
        <div className="cs-brand-mark brand-sunday">
          <svg viewBox="0 0 32 32" fill="none" className="cs-brand-icon" aria-hidden="true">
            <rect width="32" height="32" rx="9" fill="#fefce8" />
            <circle cx="16" cy="16" r="5.5" fill="#eab308" />
            <path
              d="M16 4V7M16 25V28M4 16H7M25 16H28M7.5 7.5L9.6 9.6M22.4 22.4L24.5 24.5M7.5 24.5L9.6 22.4M22.4 9.6L24.5 7.5"
              stroke="#ca8a04"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
          <div className="cs-brand-text">
            <span className="cs-brand-name">SUNDAY FORM</span>
            <span className="cs-brand-sub">Fitness & Wellness</span>
          </div>
        </div>
      );
    case 'Northstar SaaS':
      return (
        <div className="cs-brand-mark brand-northstar">
          <svg viewBox="0 0 32 32" fill="none" className="cs-brand-icon" aria-hidden="true">
            <rect width="32" height="32" rx="9" fill="#eef2ff" />
            <path
              d="M16 5L18.5 12.8L26 16L18.5 19.2L16 27L13.5 19.2L6 16L13.5 12.8L16 5Z"
              fill="#4f46e5"
            />
          </svg>
          <div className="cs-brand-text">
            <span className="cs-brand-name">NORTHSTAR</span>
            <span className="cs-brand-sub">Enterprise Workflow</span>
          </div>
        </div>
      );
    case 'LatticeFlow Labs':
      return (
        <div className="cs-brand-mark brand-lattice">
          <svg viewBox="0 0 32 32" fill="none" className="cs-brand-icon" aria-hidden="true">
            <rect width="32" height="32" rx="9" fill="#f5f3ff" />
            <circle cx="10" cy="10" r="3" fill="#7c3aed" />
            <circle cx="22" cy="10" r="3" fill="#7c3aed" />
            <circle cx="16" cy="22" r="3" fill="#7c3aed" />
            <path d="M10 10L22 10L16 22L10 10Z" stroke="#7c3aed" strokeWidth="1.8" />
          </svg>
          <div className="cs-brand-text">
            <span className="cs-brand-name">LATTICEFLOW</span>
            <span className="cs-brand-sub">AI & Infrastructure</span>
          </div>
        </div>
      );
    case 'RelayDesk':
      return (
        <div className="cs-brand-mark brand-relay">
          <svg viewBox="0 0 32 32" fill="none" className="cs-brand-icon" aria-hidden="true">
            <rect width="32" height="32" rx="9" fill="#eff6ff" />
            <path d="M17 6L8 16.5H15.5L14.5 26L24 14.5H16.5L17 6Z" fill="#2563eb" />
          </svg>
          <div className="cs-brand-text">
            <span className="cs-brand-name">RELAYDESK</span>
            <span className="cs-brand-sub">IT Service Desk</span>
          </div>
        </div>
      );
    default:
      return (
        <div className="cs-brand-mark brand-default">
          <div className="cs-brand-avatar-fallback">{brand.slice(0, 2).toUpperCase()}</div>
          <div className="cs-brand-text">
            <span className="cs-brand-name">{brand.toUpperCase()}</span>
          </div>
        </div>
      );
  }
}

// A wide photo under the page heading on legacy pages.
function Banner({ image }: { image: HeroImage }) {
  return (
    <figure className="container cs2-banner">
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        fetchPriority="high"
      />
    </figure>
  );
}

/* Stat-First Modern Clean Story Card */
function StoryCard({ e, open }: { e: Entry; open?: boolean }) {
  const p = person(e.story.attribution);
  const inspire = brandInspireMap[e.story.brand];

  const content = (
    <>
      {/* Card Header: Brand identity & Circle link button */}
      <div className="cs2-card-head">
        <BrandLogo brand={e.story.brand} />
        {!open && (
          <span className="cs2-arrow-btn" aria-hidden="true">
            <ArrowUpRight size={17} />
          </span>
        )}
      </div>

      {/* Hero Metric: Big, Bold, Stat-First */}
      {inspire && (
        <div className="cs2-metric-block">
          <div className="cs2-stat-num">{inspire.metricBig}</div>
          <div className="cs2-stat-lbl">{inspire.metricLabel}</div>
        </div>
      )}

      {/* Excerpt Quote */}
      <blockquote className="cs2-card-quote">
        “{e.story.excerpt.replace(/^[“"]|[”"]$/g, '')}”
      </blockquote>

      {/* Person Attribution with Initials Badge & Verified Badge (No Face Photos) */}
      <div className="cs2-person">
        <ExecutiveBadge name={p.name} />
        <div className="cs2-person-info">
          <div className="cs2-person-name">
            <strong>{p.name}</strong>
            <CheckCircle2 size={14} className="cs2-verified-check" aria-label="Verified user" />
          </div>
          <span>{p.role}</span>
        </div>
      </div>

      {/* Tag Chips */}
      <div className="cs2-tags">
        <span className="cs2-tag cs2-tag-agent">{e.agent}</span>
        <span className="cs2-tag cs2-tag-ind">{e.story.industry}</span>
        {e.story.tags.slice(0, 1).map((tag) => (
          <span key={tag} className="cs2-tag cs2-tag-extra">
            {tag}
          </span>
        ))}
      </div>
    </>
  );

  if (open) {
    return <article className="cs2-card cs2-card-static">{content}</article>;
  }

  return <a className="cs2-card cs2-card-link">{content}</a>;
}

/* Featured Spotlight Wide Card (Spans 2 columns on desktop) */
function SpotlightCard({ e }: { e: Entry }) {
  const p = person(e.story.attribution);
  const inspire = brandInspireMap[e.story.brand];
  const photo = inspire?.photo || brandPhotos[e.story.brand] || asset('/images/case-studies/mysa-living.jpg');

  // Not a link until per-customer case study pages are published.
  return (
    <a className="cs2-card cs2-spotlight-card">
      <div className="cs2-spotlight-visual">
        <img src={photo} alt={e.story.brand} className="cs2-spotlight-img" loading="lazy" />
        <div className="cs2-spotlight-overlay">
          <span className="cs2-spotlight-badge">
            <Sparkles size={13} /> FEATURED STORY
          </span>
        </div>
      </div>

      <div className="cs2-spotlight-content">
        <div className="cs2-card-head">
          <BrandLogo brand={e.story.brand} />
          <span className="cs2-arrow-btn" aria-hidden="true">
            <ArrowUpRight size={17} />
          </span>
        </div>

        {inspire && (
          <div className="cs2-spotlight-stats">
            <div className="cs2-spotlight-stat-item">
              <span className="cs2-stat-num">{inspire.metricBig}</span>
              <span className="cs2-stat-lbl">{inspire.metricLabel}</span>
            </div>
            {inspire.stats && inspire.stats[1] && (
              <div className="cs2-spotlight-stat-item">
                <span className="cs2-stat-num">{inspire.stats[1].value}</span>
                <span className="cs2-stat-lbl">{inspire.stats[1].label}</span>
              </div>
            )}
          </div>
        )}

        <blockquote className="cs2-card-quote">
          “{e.story.excerpt.replace(/^[“"]|[”"]$/g, '')}”
        </blockquote>

        <div className="cs2-person">
          <ExecutiveBadge name={p.name} />
          <div className="cs2-person-info">
            <div className="cs2-person-name">
              <strong>{p.name}</strong>
              <CheckCircle2 size={14} className="cs2-verified-check" aria-label="Verified user" />
            </div>
            <span>{p.role}</span>
          </div>
        </div>

        <div className="cs2-spotlight-foot">
          <div className="cs2-tags">
            <span className="cs2-tag cs2-tag-agent">{e.agent}</span>
            <span className="cs2-tag cs2-tag-ind">{e.story.industry}</span>
          </div>
          <span className="cs2-read-link">
            Read detail case study <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </a>
  );
}

/* Interstitial High-Conversion Promo Card */
function ResultsPromoCard() {
  return (
    <article className="cs2-card cs2-promo-card">
      <div className="cs2-promo-ambient-glow" aria-hidden="true" />
      <div className="cs2-promo-top">
        <span className="cs2-promo-badge">
          <Star size={13} fill="currentColor" /> PROVEN IMPACT
        </span>
      </div>

      <div className="cs2-promo-body">
        <h3 className="cs2-promo-title">
          Real results.
          <br />
          Real impact.
        </h3>
        <p className="cs2-promo-desc">
          See exactly how much revenue and support hours Steps AI can unlock for your specific business.
        </p>
      </div>

      <div className="cs2-promo-foot">
        <Link href="/book-a-demo/" className="cs2-promo-btn">
          Get custom ROI blueprint <ArrowRight size={15} />
        </Link>
        <span className="cs2-promo-note">Free 15-min consultation · No setup required</span>
      </div>
    </article>
  );
}

function CallMock() {
  return (
    <div className="cs-call">
      <div className="cs-call-head">
        <span className="cs-call-icon">
          <PhoneCall size={18} />
        </span>
        <div>
          <strong>Incoming call</strong>
          <small>Steps AI Receptionist · Interactive Preview</small>
        </div>
        <span className="cs-live">Live</span>
      </div>
      <div className="cs-wave" aria-hidden="true">
        {Array.from({ length: 28 }, (_, i) => (
          <i key={i} style={{ animationDelay: `${(i % 7) * 120}ms` }} />
        ))}
      </div>
      {[
        ['Caller', 'Hi, can I book a consultation for tomorrow?'],
        ['Agent', 'Of course. We have 11:00 AM or 3:30 PM free. Which works best for you?'],
        ['Caller', '11:00 AM, please.'],
      ].map(([who, text], i) => (
        <p
          key={i}
          className={`cs-call-line ${who === 'Agent' ? 'is-agent' : ''}`}
          style={{ animationDelay: `${400 + i * 700}ms` }}
        >
          <b>
            {who === 'Agent' ? <Mic size={12} /> : null}
            {who}
          </b>
          {text}
        </p>
      ))}
      <div className="cs-call-foot">
        <span>English · Hindi · Telugu</span>
        <span>Transfer to a person</span>
      </div>
    </div>
  );
}

export function CaseStudiesHubClean({
  page,
  stories,
}: {
  page: CaseStudiesHub;
  stories: Entry[];
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [agent, setAgent] = useState('all');
  const [industry, setIndustry] = useState('all');

  const industries = useMemo(() => {
    return [...new Set(stories.map((s) => s.story.industry))];
  }, [stories]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return stories.filter((s) => {
      const matchAgent = agent === 'all' || s.slug === agent;
      const matchIndustry = industry === 'all' || s.story.industry === industry;
      if (!matchAgent || !matchIndustry) return false;

      if (!q) return true;
      const brand = s.story.brand.toLowerCase();
      const excerpt = s.story.excerpt.toLowerCase();
      const tags = s.story.tags.join(' ').toLowerCase();
      const personName = s.story.attribution.toLowerCase();
      const agentLabel = s.agent.toLowerCase();
      const ind = s.story.industry.toLowerCase();

      const inspire = brandInspireMap[s.story.brand];
      const metricText = inspire
        ? `${inspire.metricBig} ${inspire.metricLabel} ${inspire.headline} ${inspire.challenge} ${inspire.solution}`.toLowerCase()
        : '';

      return (
        brand.includes(q) ||
        excerpt.includes(q) ||
        tags.includes(q) ||
        personName.includes(q) ||
        agentLabel.includes(q) ||
        ind.includes(q) ||
        metricText.includes(q)
      );
    });
  }, [stories, agent, industry, searchQuery]);

  const hasFilter = searchQuery.trim() !== '' || agent !== 'all' || industry !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setAgent('all');
    setIndustry('all');
  };

  return (
    <SiteFrame>
      {() => (
        <div className="cs2">
          {/* High-Impact Hero Banner */}
          <section className="container cs2-hero-wrap">
            <div className="cs2-hero-banner">
              <div className="cs2-hero-ambient" aria-hidden="true" />
              <div className="cs2-hero-content">
                <div className="cs2-hero-trust">
                  <div className="cs2-stars" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#f8b403" color="#f8b403" />
                    ))}
                  </div>
                  <span className="cs2-trust-score">4.9 / 5 Rating</span>
                  <span className="cs2-trust-dot">·</span>
                  <span className="cs2-trust-text">1,800+ Verified Reviews on G2 & Capterra</span>
                </div>

                <h1 className="cs2-hero-title">Customer Stories & Proven Impact</h1>

                <p className="cs2-hero-subtitle">
                  Explore how 15,000+ businesses deploy Steps AI autonomous agents to automate 80%+ of
                  customer conversations, accelerate checkout conversion, and scale 24/7 without extra headcount.
                </p>

                <div className="cs2-hero-actions">
                  <a href="#browse-stories" className="cs2-hero-btn-primary">
                    Explore customer stories ↓
                  </a>
                  <Link href="/book-a-demo/" className="cs2-hero-btn-secondary">
                    Book a demo →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Search & Filter Toolbar */}
          <div id="browse-stories" className="container cs2-toolbar">
            <div className="cs2-search-box">
              <Search size={18} className="cs2-search-icon" aria-hidden="true" />
              <input
                type="text"
                className="cs2-search-input"
                placeholder="Search by company, industry, or use case..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search customer stories"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="cs2-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <nav className="cs2-filter-nav" aria-label="Filter case studies by agent">
              <button
                className={`cs2-pill ${agent === 'all' && industry === 'all' ? 'is-active' : ''}`}
                onClick={resetFilters}
              >
                All use cases <small>({stories.length})</small>
              </button>
              {page.agents
                .filter((a) => a.count > 0)
                .map((a) => (
                  <button
                    key={a.slug}
                    className={`cs2-pill ${agent === a.slug ? 'is-active' : ''}`}
                    onClick={() => setAgent(agent === a.slug ? 'all' : a.slug)}
                  >
                    {a.label} <small>({a.count})</small>
                  </button>
                ))}
              <span className="cs2-nav-divider" aria-hidden="true" />
              {industries.map((ind) => (
                <button
                  key={ind}
                  className={`cs2-pill cs2-pill-ind ${industry === ind ? 'is-active' : ''}`}
                  onClick={() => setIndustry(industry === ind ? 'all' : ind)}
                >
                  {ind}
                </button>
              ))}
            </nav>

            <div className="cs2-status-bar">
              <span className="cs2-count">
                Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'story' : 'customer stories'}
              </span>
              {hasFilter && (
                <button type="button" className="cs2-reset-link" onClick={resetFilters}>
                  Clear filters & show all
                </button>
              )}
            </div>
          </div>

          {/* Cards Grid */}
          <section className="container cs2-grid-section">
            {filtered.length > 0 ? (
              <div className="cs2-grid">
                {filtered.map((e, index) => {
                  // Spotlight Featured Card for first item when browsing all without active search
                  if (index === 0 && !hasFilter) {
                    return <SpotlightCard key={e.story.brand + e.slug} e={e} />;
                  }

                  // Insert high-converting Promo Card at natural position 2
                  if (index === 2 && !hasFilter) {
                    return (
                      <div key="promo-pair" style={{ display: 'contents' }}>
                        <StoryCard key={e.story.brand + e.slug} e={e} />
                        <ResultsPromoCard key="promo-results-card" />
                      </div>
                    );
                  }

                  return <StoryCard key={e.story.brand + e.slug} e={e} />;
                })}
              </div>
            ) : (
              <div className="cs2-empty-state">
                <div className="cs2-empty-icon">
                  <SlidersHorizontal size={28} />
                </div>
                <h3>No stories match your criteria</h3>
                <p>Try searching for a different keyword or resetting your filters.</p>
                <button type="button" className="cs2-empty-btn" onClick={resetFilters}>
                  Reset all filters
                </button>
              </div>
            )}
          </section>

          {/* High-Impact Bottom CTA */}
          <section className="container cs2-cta">
            <h2>{page.cta.title}</h2>
            <p>{page.cta.body}</p>
            <div className="cs2-cta-buttons">
              <Link className="cs2-btn cs2-btn-primary" href="/book-a-demo/">
                Book a demo <ArrowRight size={15} />
              </Link>
              <Link className="cs2-btn cs2-btn-secondary" href="/pricing/">
                View pricing plans
              </Link>
            </div>
          </section>
        </div>
      )}
    </SiteFrame>
  );
}

/* ==========================================================================
   Dedicated Case Study Detail View (Inspired by Zoko, built for Steps AI)
   ========================================================================== */
export function BrandCaseStudyDetail({
  story,
  relatedStories = [],
}: {
  story: BrandInspireData;
  relatedStories?: BrandInspireData[];
}) {
  return (
    <SiteFrame>
      {() => (
        <div className="bcs-page">
          {/* Header Section */}
          <section className="container bcs-hero">
            <Link href="/case-studies/" className="bcs-back-link">
              ← Back to all customer stories
            </Link>

            <div className="bcs-tag-row">
              <span className="bcs-tag-pill">{story.agentLabel}</span>
              <span className="bcs-tag-pill bcs-tag-ind">{story.industry}</span>
            </div>

            <h1 className="bcs-title">How {story.brand} {story.headline.toLowerCase()}</h1>

            <p className="bcs-lede">{story.challenge}</p>

            <div className="bcs-hero-actions">
              <Link href="/book-a-demo/" className="bcs-btn-primary">
                Book a personalized demo →
              </Link>
              <Link href={`/use-cases/${story.agentSlug}/`} className="bcs-btn-secondary">
                Explore {story.agentLabel}
              </Link>
            </div>

            {/* Cinematic Cover Banner with Overlaid Results KPIs */}
            <div className="bcs-cover">
              <img
                src={story.photo}
                alt={story.brand}
                className="bcs-cover-img"
                loading="eager"
              />
              <div className="bcs-cover-kpis">
                <div className="bcs-kpi-heading">Verified Results</div>
                <div className="bcs-kpi-grid">
                  {story.stats.map((st, i) => (
                    <div key={i} className="bcs-kpi-item">
                      <div className="bcs-kpi-val">{st.value}</div>
                      <div className="bcs-kpi-lbl">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Two-Column Story Narrative & Sticky Profile Sidebar */}
          <section className="container bcs-body-section">
            <div className="bcs-layout">
              {/* Left Sticky Sidebar */}
              <aside className="bcs-sidebar">
                <div className="bcs-profile-card">
                  <div className="bcs-profile-head">
                    <BrandLogo brand={story.brand} />
                  </div>

                  <ul className="bcs-profile-list">
                    <li>
                      <span className="bcs-meta-lbl">Company</span>
                      <strong className="bcs-meta-val">{story.brand}</strong>
                    </li>
                    <li>
                      <span className="bcs-meta-lbl">Industry</span>
                      <span className="bcs-meta-val">{story.industry}</span>
                    </li>
                    <li>
                      <span className="bcs-meta-lbl">Location</span>
                      <span className="bcs-meta-val">{story.location}</span>
                    </li>
                    <li>
                      <span className="bcs-meta-lbl">Team Size</span>
                      <span className="bcs-meta-val">{story.teamSize}</span>
                    </li>
                    <li>
                      <span className="bcs-meta-lbl">AI Agent</span>
                      <span className="bcs-meta-val">{story.agentLabel}</span>
                    </li>
                    <li>
                      <span className="bcs-meta-lbl">Channels Deployed</span>
                      <span className="bcs-meta-val">{story.channels.join(', ')}</span>
                    </li>
                    <li>
                      <span className="bcs-meta-lbl">Website</span>
                      <a
                        href={story.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bcs-meta-link"
                      >
                        {story.website.replace(/^https?:\/\//, '')} <ExternalLink size={12} />
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Sticky Mini CTA */}
                <div className="bcs-sticky-cta">
                  <h4>Want similar results?</h4>
                  <p>
                    See how Steps AI can automate 80%+ of inquiries for your store in a 15-minute live demo.
                  </p>
                  <Link href="/book-a-demo/" className="bcs-sticky-btn">
                    Book a demo →
                  </Link>
                </div>
              </aside>

              {/* Right Main Article */}
              <article className="bcs-article">
                <h2>About {story.brand}</h2>
                <p>{story.about}</p>

                <h2>The challenge</h2>
                <p>{story.challenge}</p>

                <h2>How Steps AI helped</h2>
                <p>{story.solution}</p>

                <div className="bcs-quote-box">
                  <blockquote className="bcs-quote">
                    “{story.quote.replace(/^[“"]|[”"]$/g, '')}”
                  </blockquote>
                  <div className="bcs-quote-author">
                    <ExecutiveBadge name={story.personName} />
                    <div>
                      <div className="bcs-author-name">
                        <strong>{story.personName}</strong>
                        <CheckCircle2 size={15} className="bcs-verified-icon" />
                      </div>
                      <span className="bcs-author-role">{story.personRole}</span>
                    </div>
                  </div>
                </div>

                <h2>The results</h2>
                <ul className="bcs-results-list">
                  {story.resultsList.map((res, i) => (
                    <li key={i}>
                      <span className="bcs-check-icon">
                        <Check size={16} strokeWidth={3} />
                      </span>
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          {/* Related Case Studies */}
          {relatedStories.length > 0 && (
            <section className="container bcs-related-section">
              <div className="bcs-related-header">
                <h3>More customer stories</h3>
                <Link href="/case-studies/" className="bcs-view-all">
                  View all stories →
                </Link>
              </div>

              <div className="cs2-grid">
                {relatedStories.map((rel) => (
                  <Link
                    key={rel.brand}
                    href={`/case-studies/${rel.brandSlug}/`}
                    className="cs2-card cs2-card-link"
                  >
                    <div className="cs2-card-head">
                      <BrandLogo brand={rel.brand} />
                      <span className="cs2-arrow-btn" aria-hidden="true">
                        <ArrowUpRight size={17} />
                      </span>
                    </div>

                    <div className="cs2-metric-block">
                      <div className="cs2-stat-num">{rel.metricBig}</div>
                      <div className="cs2-stat-lbl">{rel.metricLabel}</div>
                    </div>

                    <blockquote className="cs2-card-quote">
                      “{rel.quote.replace(/^[“"]|[”"]$/g, '')}”
                    </blockquote>

                    <div className="cs2-person">
                      <ExecutiveBadge name={rel.personName} />
                      <div className="cs2-person-info">
                        <div className="cs2-person-name">
                          <strong>{rel.personName}</strong>
                          <CheckCircle2 size={14} className="cs2-verified-check" />
                        </div>
                        <span>{rel.personRole}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Bottom CTA Banner */}
          <section className="container bcs-cta-section">
            <div className="bcs-cta-banner">
              <h2>Turn autonomous AI into your #1 revenue & support channel</h2>
              <p>
                Join 15,000+ fast-growing brands deploying Steps AI agents to automate 80%+ of conversations and lift conversion.
              </p>
              <div className="bcs-cta-actions">
                <Link href="/book-a-demo/" className="bcs-cta-btn-primary">
                  Book a demo <ArrowRight size={16} />
                </Link>
                <Link href="/pricing/" className="bcs-cta-btn-secondary">
                  View pricing plans
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}
    </SiteFrame>
  );
}

/* Fallback Agent Case Study View */
export function CaseStudyClean({
  page,
  agents,
}: {
  page: CaseStudyPage;
  agents: CaseStudiesHub['agents'];
}) {
  const entries: Entry[] = page.stories.map((story) => ({
    slug: page.slug,
    agent: page.agent,
    story,
  }));

  return (
    <SiteFrame>
      {() => (
        <div className="cs2">
          <header className="cs2-head">
            <Link href="/case-studies/" className="cs2-back-link">
              ← Back to all customer stories
            </Link>
            <h1>{page.hero.title}</h1>
            <p>{page.hero.body}</p>
          </header>

          {page.hero.image && <Banner image={page.hero.image} />}

          {entries.length > 0 ? (
            <section className="container cs2-grid cs2-grid-open">
              {entries.map((e) => (
                <StoryCard key={e.story.brand} e={e} open />
              ))}
            </section>
          ) : (
            <section className="container cs2-receptionist-wrap">
              <CallMock />
              <div className="cs2-empty">
                <p>
                  Customer stories for the AI receptionist are currently being gathered. See the live call demonstration above.
                </p>
                <Link href={page.agentPage}>
                  Explore the {page.agent} features <ArrowRight size={14} />
                </Link>
              </div>
            </section>
          )}

          <section className="container cs2-caps">
            <h2>{page.capabilities.title}</h2>
            <ul>
              {page.capabilities.items.map((c) => (
                <li key={c.title}>
                  <Check size={18} />
                  <span>
                    <strong>{c.title}</strong>
                    {c.body}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {page.goodToKnow.items.length > 0 && (
            <section className="container cs2-note">
              <strong>{page.goodToKnow.title}</strong>
              {page.goodToKnow.items.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </section>
          )}

          <nav className="container cs2-more" aria-label="Other case studies">
            <span>More case studies:</span>
            {agents
              .filter((a) => a.slug !== page.slug)
              .map((a) => (
                <Link key={a.slug} href={`/case-studies/${a.slug}/`}>
                  {a.label}
                </Link>
              ))}
          </nav>

          <section className="container cs2-cta">
            <h2>{page.cta.title}</h2>
            <p>{page.cta.body}</p>
            <Link className="cs2-btn cs2-btn-primary" href="/book-a-demo/">
              Book a demo <ArrowRight size={15} />
            </Link>
          </section>
        </div>
      )}
    </SiteFrame>
  );
}
