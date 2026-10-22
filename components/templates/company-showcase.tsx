'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, X } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { DEMO_URL } from '@/components/site/routes';
import companies from '@/content/company-use-cases.json';
import { CompanyLogo } from './company-logo';
import styles from './company-cases.module.css';

export function CompanyShowcase() {
  const [query, setQuery] = useState('');
  const shown = companies.filter(company => `${company.name} ${company.industry} ${company.title}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <SiteFrame>{() => <div className="cs2">
    <section className="container cs2-hero-wrap">
      <div className="cs2-hero-banner">
        <div className="cs2-hero-ambient" aria-hidden="true" />
        <div className="cs2-hero-content">
          <h1 className="cs2-hero-title">Companies using Steps AI</h1>
          <p className="cs2-hero-subtitle">Explore how customer conversations could work for these companies.</p>
          <p className={styles.notice}>Illustrative use cases, not customer testimonials or measured results.</p>
          <div className="cs2-hero-actions">
            <a href="#browse-companies" className="cs2-hero-btn-primary">Explore companies ↓</a>
            <Link href={DEMO_URL} className="cs2-hero-btn-secondary">Book a demo →</Link>
          </div>
        </div>
      </div>
    </section>
    <div id="browse-companies" className="container cs2-toolbar">
      <div className="cs2-search-box">
        <Search size={18} className="cs2-search-icon" aria-hidden="true" />
        <input type="search" className="cs2-search-input" placeholder="Search by company name..." aria-label="Search companies" value={query} onChange={event => setQuery(event.target.value)} />
        {query && <button type="button" className="cs2-search-clear" onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}
      </div>
      <div className="cs2-status-bar" aria-live="polite"><span className="cs2-count">Showing <strong>{shown.length}</strong> {shown.length === 1 ? 'company' : 'companies'}</span></div>
    </div>
    <section className="container cs2-grid-section" aria-label="Companies">
      {shown.length ? <div className="cs2-grid">{shown.map(company => <Link key={company.slug} href={`/case-studies/${company.slug}/`} className={`cs2-card cs2-card-link ${styles.card}`}>
        <CompanyLogo name={company.name} logo={company.logo} />
        <span className={styles.label}>Illustrative use case · {company.industry}</span>
        <h2 className={styles.title}>{company.name}</h2>
        <strong>{company.title}</strong>
        <p className={styles.body}>{company.challenge}</p>
        <span className={styles.foot}>Explore the example <ArrowRight size={16} /></span>
      </Link>)}</div> :
        <div className="cs2-empty-state"><h3>No companies found</h3><p>Try another company name.</p><button type="button" className="cs2-empty-btn" onClick={() => setQuery('')}>Clear search</button></div>}
    </section>
    <section className="container cs2-cta">
      <h2>Explore Steps AI for your business.</h2>
      <p>Book a demo to see how it works with your business information.</p>
      <div className="cs2-cta-buttons"><Link className="cs2-btn cs2-btn-primary" href={DEMO_URL}>Book a demo <ArrowRight size={15} /></Link><Link className="cs2-btn cs2-btn-secondary" href="/pricing/">View pricing plans</Link></div>
    </section>
  </div>}</SiteFrame>;
}
