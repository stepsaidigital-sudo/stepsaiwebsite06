'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, PhoneCall, Mic } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { ClientWall } from '@/components/site/client-wall';
import type { CaseStudiesHub, CaseStudyPage, HeroImage, Story } from '@/content/types';
import { brandInspireMap } from './story-inspire';

type Entry = { slug: string; agent: string; story: Story };

const brandPhotos: Record<string, string> = {
  'Mysa Living': '/photos/in-ecom-hero.jpg',
  'Aster & Row': '/photos/cs-sales.jpg',
  'North & Pine': '/photos/ag-ecom-sales.jpg',
  'Nivara': '/photos/sc-sales-ecommerce.jpg',
  'Casa Noma': '/photos/in-ecom-shopify.jpg',
  'Stacklane': '/photos/ag-saas-support.jpg',
  'Sunday Form': '/photos/cs-marketing.jpg',
  'Northstar SaaS': '/photos/in-saas-story.jpg',
  'LatticeFlow Labs': '/photos/f-crm.jpg',
  'RelayDesk': '/photos/cs-booking.jpg',
};

const customerAvatars: Record<string, string> = {
  'Anika Rao': '/photos/avatars/ananya.webp',
  'Priya Shah': '/photos/avatars/priya.webp',
  'Maya Patel': '/photos/avatars/maya.webp',
  'Arjun Mehta': '/photos/avatars/arjun.webp',
  'Sofia Alvarez': '/photos/avatars/sneha.webp',
  'Jonathan Reed': '/photos/avatars/sam.webp',
  'Nina Kapoor': '/photos/avatars/neha.webp',
  'Ryan Collins': '/photos/avatars/rohan.webp',
  'Rachel Morgan': '/photos/avatars/kavya.webp',
  'Kevin Morales': '/photos/avatars/karan.webp',
};

const person = (attribution: string) => {
  const [name, ...role] = attribution.split(' | ');
  return { name: name.trim(), role: role.join(', ').trim() };
};

// A wide photo under the page heading.
function Banner({ image }: { image: HeroImage }) {
  return (
    <figure className="container cs2-banner">
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} fetchPriority="high" />
    </figure>
  );
}

function StoryCard({ e, open }: { e: Entry; open?: boolean }) {
  const p = person(e.story.attribution);
  const photo = brandPhotos[e.story.brand] ?? '/photos/pg-case-studies.jpg';
  const avatar = customerAvatars[p.name];
  const inspire = brandInspireMap[e.story.brand];

  const content = (
    <>
      <div className="cs2-top">
        <img src={photo} alt={e.story.brand} className="cs2-photo" loading="lazy" />
        <div className="cs2-top-overlay">
          <div className="cs2-top-bar">
            <div className="cs2-badges">
              <span className="cs2-label">{e.agent.toUpperCase()}</span>
              <span className="cs2-ind-badge">{e.story.industry.toUpperCase()}</span>
            </div>
            {!open && (
              <span className="cs2-arrow-btn" aria-hidden="true">
                <ArrowUpRight size={17} />
              </span>
            )}
          </div>
          <strong className="cs2-brand">{e.story.brand}</strong>
        </div>
      </div>
      <div className="cs2-bottom">
        {inspire && (
          <div className="cs2-metric-callout">
            <span className="cs2-metric-num">{inspire.metricBig}</span>
            <span className="cs2-metric-lbl">{inspire.metricLabel}</span>
          </div>
        )}
        <div className="cs2-tags">
          {e.story.tags.map((tag) => (
            <span key={tag} className="cs2-tag">
              {tag}
            </span>
          ))}
        </div>
        <blockquote>“{e.story.excerpt.replace(/^[“"]|[”"]$/g, '')}”</blockquote>
        <div className="cs2-person">
          {avatar && <img src={avatar} alt={p.name} className="cs2-avatar" width={40} height={40} />}
          <div className="cs2-person-info">
            <strong>{p.name}</strong>
            <span>{p.role}</span>
          </div>
        </div>
        {!open && (
          <div className="cs2-card-actions">
            <span className="cs2-read-link">
              Read detail case study <ArrowRight size={14} />
            </span>
          </div>
        )}
      </div>
    </>
  );

  if (open) {
    return <article className="cs2-card cs2-card-static">{content}</article>;
  }

  return (
    <Link
      href={`/case-studies/${e.slug}/`}
      className="cs2-card cs2-card-link"
      title={`Read full ${e.story.brand} detail case study`}
    >
      {content}
    </Link>
  );
}

function CallMock() {
  return (
    <div className="cs-call">
      <div className="cs-call-head">
        <span className="cs-call-icon"><PhoneCall size={18} /></span>
        <div><strong>Incoming call</strong><small>Steps AI Receptionist · Interactive Preview</small></div>
        <span className="cs-live">Live</span>
      </div>
      <div className="cs-wave" aria-hidden="true">
        {Array.from({ length: 28 }, (_, i) => <i key={i} style={{ animationDelay: `${(i % 7) * 120}ms` }} />)}
      </div>
      {[
        ['Caller', 'Hi, can I book a consultation for tomorrow?'],
        ['Agent', 'Of course. We have 11:00 AM or 3:30 PM free. Which works best for you?'],
        ['Caller', '11:00 AM, please.']
      ].map(([who, text], i) => (
        <p key={i} className={`cs-call-line ${who === 'Agent' ? 'is-agent' : ''}`} style={{ animationDelay: `${400 + i * 700}ms` }}>
          <b>{who === 'Agent' ? <Mic size={12} /> : null}{who}</b>{text}
        </p>
      ))}
      <div className="cs-call-foot"><span>English · Hindi · Telugu</span><span>Transfer to a person</span></div>
    </div>
  );
}

function Clients() {
  return (
    <section className="container cs2-clients">
      <h2>Businesses using Steps AI every day.</h2>
      <ClientWall />
    </section>
  );
}

export function CaseStudiesHubClean({ page, stories }: { page: CaseStudiesHub; stories: Entry[] }) {
  const [agent, setAgent] = useState('all');
  const [industry, setIndustry] = useState('all');

  const industries = [...new Set(stories.map((s) => s.story.industry))];
  const shown = stories.filter(
    (s) =>
      (agent === 'all' || s.slug === agent) &&
      (industry === 'all' || s.story.industry === industry)
  );

  return (
    <SiteFrame>
      {() => (
        <div className="cs2">
          <header className="cs2-head">
            <span>Steps AI customer stories</span>
            <h1>{page.hero.title}</h1>
            <p>{page.hero.body}</p>
          </header>

          <nav className="cs2-filter" aria-label="Filter case studies">
            <button
              className={agent === 'all' && industry === 'all' ? 'is-on' : ''}
              onClick={() => {
                setAgent('all');
                setIndustry('all');
              }}
            >
              All stories <small>({stories.length})</small>
            </button>
            {page.agents
              .filter((a) => a.count > 0)
              .map((a) => (
                <button
                  key={a.slug}
                  className={agent === a.slug ? 'is-on' : ''}
                  onClick={() => setAgent(a.slug)}
                >
                  {a.label} <small>({a.count})</small>
                </button>
              ))}
            <i className="cs2-sep" />
            {industries.map((n) => (
              <button
                key={n}
                className={industry === n ? 'is-on' : ''}
                onClick={() => setIndustry(industry === n ? 'all' : n)}
              >
                {n}
              </button>
            ))}
          </nav>

          <section className="container cs2-grid">
            {shown.map((e) => (
              <StoryCard
                key={e.story.brand + e.slug}
                e={e}
              />
            ))}
          </section>

          <Clients />

          <section className="container cs2-cta">
            <h2>{page.cta.title}</h2>
            <p>{page.cta.body}</p>
            <Link className="cs2-btn" href="/book-a-demo/">
              Book a demo <ArrowRight size={15} />
            </Link>
          </section>
        </div>
      )}
    </SiteFrame>
  );
}

export function CaseStudyClean({ page, agents }: { page: CaseStudyPage; agents: CaseStudiesHub['agents'] }) {
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
            <Link href="/case-studies/">← Back to all case studies</Link>
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

          <Clients />

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
            <Link className="cs2-btn" href="/book-a-demo/">
              Book a demo <ArrowRight size={15} />
            </Link>
          </section>
        </div>
      )}
    </SiteFrame>
  );
}
