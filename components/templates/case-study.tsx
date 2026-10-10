'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Mic, PhoneCall, Quote as QuoteIcon } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { builtRoutes } from '@/components/site/routes';
import { DragRail } from '@/components/site/motion';
import { CtaBand, GoodToKnow, PageHero, Reveal, SectionIntro } from '@/components/sections';
import type { CaseStudiesHub, CaseStudyPage, Story } from '@/content/types';

type AgentLink = { slug: string; label: string; count: number };

const initials = (brand: string) => brand.split(/[\s&]+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
const tints = ['blue', 'yellow', 'lilac', 'mint', 'peach', 'green'];

export function StoryCard({ story, agent, href, wide = false }: { story: Story; agent?: string; href?: string; wide?: boolean }) {
  const [name, ...role] = story.attribution.split(' | ');
  const tint = tints[story.brand.length % tints.length];
  return <Reveal className={`cs-story ${wide ? 'is-wide' : ''}`}>
    <div className="cs-story-head">
      <span className={`cs-mono cs-${tint}`} aria-hidden="true">{initials(story.brand)}</span>
      <div><strong>{story.brand}</strong><small>{story.industry}{agent && <> · {agent}</>}</small></div>
    </div>
    <QuoteIcon size={22} className="cs-quote-mark" aria-hidden="true" />
    <blockquote>{story.excerpt}</blockquote>
    <p className="cs-person"><strong>{name}</strong>{role.join(', ')}</p>
    <div className="cs-tags">{story.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    {href && <Link className="cs-more" href={href}>More {agent} stories <ArrowRight size={15} /></Link>}
  </Reveal>;
}

// Switch between agents without going back to the overview.
function AgentTabs({ agents, active }: { agents: AgentLink[]; active?: string }) {
  return <nav className="cs-tabs" aria-label="Case studies by agent">
    <Link href="/case-studies/" className={!active ? 'is-active' : ''} aria-current={!active ? 'page' : undefined}>All stories</Link>
    {agents.map(a => <Link key={a.slug} href={`/case-studies/${a.slug}/`} className={active === a.slug ? 'is-active' : ''} aria-current={active === a.slug ? 'page' : undefined}>{a.label}{a.count > 0 && <small>{a.count}</small>}</Link>)}
  </nav>;
}

// The receptionist has no stories yet, so its hero shows a call instead.
function CallMock() {
  return <Reveal className="cs-call">
    <div className="cs-call-head"><span className="cs-call-icon"><PhoneCall size={18} /></span><div><strong>Incoming call</strong><small>Your business · Illustration</small></div><span className="cs-live">Live</span></div>
    <div className="cs-wave" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ animationDelay: `${(i % 7) * 120}ms` }} />)}</div>
    {[['Caller', 'Hi, can I book a table for four tonight?'], ['Agent', 'Of course. We have 7:30 or 8:15 free. Which would you like?'], ['Caller', '7:30, please.']].map(([who, text], i) =>
      <p key={i} className={`cs-call-line ${who === 'Agent' ? 'is-agent' : ''}`} style={{ animationDelay: `${400 + i * 700}ms` }}><b>{who === 'Agent' ? <Mic size={12} /> : null}{who}</b>{text}</p>)}
    <div className="cs-call-foot"><span>English · Hindi · Telugu</span><span>Transfer to a person</span></div>
  </Reveal>;
}

export function CaseStudyTemplate({ page, agents }: { page: CaseStudyPage; agents: AgentLink[] }) {
  const [lead, ...rest] = page.stories;
  const agentLive = Object.values(builtRoutes).includes(page.agentPage);
  return <SiteFrame>{onOpen => <>
    <PageHero hero={page.hero} onOpen={onOpen} visual={lead ? <StoryCard story={lead} /> : <CallMock />} />
    <div className="container"><AgentTabs agents={agents} active={page.slug} /></div>

    <section className="sp-section container">
      {page.stories.length
        ? <><SectionIntro eyebrow={`${page.stories.length} ${page.stories.length === 1 ? 'story' : 'stories'}`} title={`What customers say about the ${page.agent}.`} /><div className="cs-grid">{(page.stories.length > 1 ? rest : page.stories).map(story => <StoryCard key={story.brand} story={story} wide={page.stories.length <= 2} />)}</div></>
        : <Reveal className="cs-empty"><span className="cs-call-icon"><PhoneCall size={20} /></span><div><h2>Customer stories are on the way.</h2><p>The AI receptionist is newly live. We will add stories here once customers have shared them with us.</p></div></Reveal>}
    </section>

    <section className="sp-section container">
      <SectionIntro eyebrow="Behind the stories" title={page.capabilities.title} intro={page.capabilities.intro} />
      <div className="ig-uses">{page.capabilities.items.map((item, i) => <Reveal key={item.title} className="ig-use"><span className="ig-use-n">{String(i + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.body}</p></Reveal>)}</div>
      {agentLive
        ? <Link className="text-link ig-all" href={page.agentPage}>Explore the {page.agent} <ArrowUpRight size={18} /></Link>
        : <button className="text-link ig-all" onClick={() => onOpen(page.agent)}>Explore the {page.agent} <ArrowUpRight size={18} /></button>}
    </section>
    <section className="sp-section container"><GoodToKnow title={page.goodToKnow.title} items={page.goodToKnow.items} /></section>
    <Reveal><CtaBand cta={page.cta} onOpen={onOpen} /></Reveal>
  </>}</SiteFrame>;
}

export function CaseStudiesHubTemplate({ page, stories }: { page: CaseStudiesHub; stories: { slug: string; agent: string; story: Story }[] }) {
  const [filter, setFilter] = useState('all');
  const shown = stories.filter(s => filter === 'all' || s.slug === filter);
  return <SiteFrame>{onOpen => <>
    <PageHero hero={page.hero} onOpen={onOpen} visual={<StoryCard story={stories[0].story} agent={stories[0].agent} />} />
    <section className="sp-section container">
      <SectionIntro eyebrow={`${stories.length} customer stories`} title="Choose an agent to see its stories." />
      <div className="ig-filters" role="group" aria-label="Filter stories by agent">
        <button className={filter === 'all' ? 'is-active' : ''} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All<small>{stories.length}</small></button>
        {page.agents.map(a => <button key={a.slug} className={filter === a.slug ? 'is-active' : ''} aria-pressed={filter === a.slug} onClick={() => setFilter(a.slug)}>{a.label}<small>{a.count}</small></button>)}
      </div>
      {shown.length
        ? <DragRail key={filter} label="Customer stories">{shown.map(s => <StoryCard key={s.story.brand} story={s.story} agent={s.agent} href={`/case-studies/${s.slug}/`} />)}</DragRail>
        : <div className="cs-empty"><span className="cs-call-icon"><PhoneCall size={20} /></span><div><h2>Customer stories are on the way.</h2><p>See what the AI receptionist does while we gather them. <Link className="text-link" href={`/case-studies/${filter}/`}>Open the page <ArrowRight size={15} /></Link></p></div></div>}
    </section>
    <Reveal><CtaBand cta={page.cta} onOpen={onOpen} /></Reveal>
  </>}</SiteFrame>;
}
