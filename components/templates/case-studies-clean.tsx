'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import type { CaseStudiesHub, CaseStudyPage, HeroImage, Story } from '@/content/types';

// Case studies in a quiet editorial layout: a centred heading and three-column story cards
// (brand panel on top, tag, the customer's own words, a link). Every quote is real and unedited;
// no results are shown that the customer did not state.

type Entry = { slug: string; agent: string; story: Story };
const lead = (text: string) => { const s = text.split(/(?<=[.!?])\s+/)[0]; return s.length > 150 ? s.slice(0, 147).replace(/\s+\S*$/, '') + '…' : s; };
const person = (attribution: string) => { const [name, role] = attribution.split(' | '); return { name, role }; };

// A wide photo under the page heading.
function Banner({ image }: { image: HeroImage }) {
  return <figure className="container cs2-banner"><img src={image.src} alt={image.alt} width={image.width} height={image.height} fetchPriority="high" /></figure>;
}

function StoryCard({ e, open }: { e: Entry; open?: boolean }) {
  const p = person(e.story.attribution);
  return <article className="cs2-card">
    <div className="cs2-top">
      <span className="cs2-label">{e.agent.toUpperCase()}<br />{e.story.industry.toUpperCase()}</span>
      <strong className="cs2-brand">{e.story.brand}</strong>
    </div>
    <div className="cs2-bottom">
      <span className="cs2-tag">{e.story.tags[0] ?? e.agent}</span>
      <blockquote>“{open ? e.story.excerpt.replace(/^[“"]|[”"]$/g, '') : lead(e.story.excerpt.replace(/^[“"]|[”"]$/g, ''))}”</blockquote>
      <small>{p.name} · {p.role}</small>
      {!open && <Link href={`/case-studies/${e.slug}/`}>Read the story <ArrowRight size={13} /></Link>}
    </div>
  </article>;
}

export function CaseStudiesHubClean({ page, stories }: { page: CaseStudiesHub; stories: Entry[] }) {
  const [agent, setAgent] = useState('all'), [industry, setIndustry] = useState('all');
  const industries = [...new Set(stories.map(s => s.story.industry))];
  const shown = stories.filter(s => (agent === 'all' || s.slug === agent) && (industry === 'all' || s.story.industry === industry));
  return <SiteFrame>{() => <div className="cs2">
    <header className="cs2-head"><span>Steps AI case studies</span><h1>{page.hero.title}</h1><p>{page.hero.body}</p></header>
    {page.hero.image && <Banner image={page.hero.image} />}
    <nav className="cs2-filter" aria-label="Filter by agent">
      <button className={agent === 'all' && industry === 'all' ? 'is-on' : ''} onClick={() => { setAgent('all'); setIndustry('all'); }}>All stories</button>
      {page.agents.filter(a => a.count).map(a => <button key={a.slug} className={agent === a.slug ? 'is-on' : ''} onClick={() => setAgent(a.slug)}>{a.label}</button>)}
      <i className="cs2-sep" />
      {industries.map(n => <button key={n} className={industry === n ? 'is-on' : ''} onClick={() => setIndustry(industry === n ? 'all' : n)}>{n}</button>)}
    </nav>
    <section className="container cs2-grid">{shown.map(e => <StoryCard key={e.story.brand + e.slug} e={e} />)}</section>
    <section className="container cs2-cta"><h2>{page.cta.title}</h2><p>{page.cta.body}</p><Link className="cs2-btn" href="/book-a-demo/">Book a demo <ArrowRight size={15} /></Link></section>
  </div>}</SiteFrame>;
}

export function CaseStudyClean({ page, agents }: { page: CaseStudyPage; agents: CaseStudiesHub['agents'] }) {
  const entries: Entry[] = page.stories.map(story => ({ slug: page.slug, agent: page.agent, story }));
  return <SiteFrame>{() => <div className="cs2">
    <header className="cs2-head"><Link href="/case-studies/">Case studies</Link><h1>{page.hero.title}</h1><p>{page.hero.body}</p></header>
    {page.hero.image && <Banner image={page.hero.image} />}
    {entries.length
      ? <section className="container cs2-grid cs2-grid-open">{entries.map(e => <StoryCard key={e.story.brand} e={e} open />)}</section>
      : <section className="container cs2-empty"><p>Customer stories for this agent are on the way.</p><Link href={page.agentPage}>See what the {page.agent} does <ArrowRight size={14} /></Link></section>}
    <section className="container cs2-caps"><h2>{page.capabilities.title}</h2><ul>{page.capabilities.items.map(c => <li key={c.title}><Check size={16} /><span><strong>{c.title}</strong>{c.body}</span></li>)}</ul></section>
    {page.goodToKnow.items.length > 0 && <section className="container cs2-note"><strong>{page.goodToKnow.title}</strong>{page.goodToKnow.items.map(t => <p key={t}>{t}</p>)}</section>}
    <nav className="container cs2-more" aria-label="Other case studies"><span>More case studies</span>{agents.filter(a => a.slug !== page.slug).map(a => <Link key={a.slug} href={`/case-studies/${a.slug}/`}>{a.label}</Link>)}</nav>
    <section className="container cs2-cta"><h2>{page.cta.title}</h2><p>{page.cta.body}</p><Link className="cs2-btn" href="/book-a-demo/">Book a demo <ArrowRight size={15} /></Link></section>
  </div>}</SiteFrame>;
}
