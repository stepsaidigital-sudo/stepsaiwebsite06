'use client';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, LayoutGrid, LogIn, Zap } from 'lucide-react';
import { SiteFrame, Action } from '@/components/site/shell';
import { CtaBand, Faq, Reveal, SectionIntro } from '@/components/sections';
import type { IntegrationsHub } from '@/content/types';
import { AppLogo } from './integration';
import { HubDiagram, LogoStack, TrackingStrip, type HubApp } from './integrations-hub-visuals';

// Apps shown in the hero, with the question each one lets the agent answer.
import shopify from '@/content/integrations/shopify.json';
import googleCalendar from '@/content/integrations/google-calendar.json';
import hubspot from '@/content/integrations/hubspot.json';
import shiprocket from '@/content/integrations/shiprocket.json';
import notion from '@/content/integrations/notion.json';
type Demo = { slug: string; name: string; category: string; demo: { channel: string; lines: { from: string; text: string }[]; lookup?: { title: string; rows: string[][] } } };
// "Shopify · Order 1042" + first row "Fulfilled" becomes "Order 1042 · Fulfilled".
const found = (l?: { title: string; rows: string[][] }) => l && [l.title.split(' · ').slice(1).join(' · '), l.rows[0]?.[1]].filter(Boolean).join(' · ');
const demoApps: HubApp[] = ([shopify, googleCalendar, hubspot, shiprocket, notion] as Demo[]).map(j => ({
  slug: j.slug, name: j.name, channel: j.demo.channel,
  question: j.demo.lines.find(l => l.from === 'customer')?.text, answer: j.demo.lines.find(l => l.from === 'agent')?.text,
  found: found(j.demo.lookup),
}));

const CONNECT = [
  { icon: <LayoutGrid size={20} />, title: 'Open Apps', note: 'Resources, then Apps' },
  { icon: <LogIn size={20} />, title: 'Sign in once', note: 'For your whole workspace' },
  { icon: <Zap size={20} />, title: 'Switch it on', note: 'For each agent that needs it' },
];

export function IntegrationsHubTemplate({ page }: { page: IntegrationsHub }) {
  const [filter, setFilter] = useState('All');
  const apps = filter === 'All' ? page.apps : page.apps.filter(app => app.category === filter);
  return <SiteFrame>{onOpen => <>
    <section className="igh-hero">
      <div className="container igh-hero-copy">
        <span className="igh-kicker"><span className="tiny-mark" />{page.hero.kicker}<b>{page.apps.length} apps</b></span>
        <h1>{page.hero.title}</h1>
        <p>{page.hero.body}</p>
        <div className="igh-actions"><Action onOpen={onOpen} /><a className="igh-ghost" href="#directory">Browse apps <ArrowRight size={16} /></a></div>
      </div>
      <div className="container igh-diagram-box">
        <img 
          src="/integrations-diagram.png" 
          alt="Steps AI Integrations: Connect WhatsApp, Instagram, and Website to Shopify, Google Calendar, HubSpot, Shiprocket, and Notion" 
          width={1120} 
          height={480} 
          className="igh-diagram-img" 
        />
      </div>
    </section>

    <section className="sp-section container" id="directory">
      <SectionIntro eyebrow={`${page.apps.length} integrations`} title="Every app you can connect." />
      <div className="ig-filters" role="group" aria-label="Filter integrations by category">
        {['All', ...page.categories].map(category => <button key={category} className={filter === category ? 'is-active' : ''} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}<small>{category === 'All' ? page.apps.length : page.apps.filter(app => app.category === category).length}</small></button>)}
      </div>
      <div className="igh-grid">{apps.map(app => <a key={app.slug} className="igh-tile" href={`/integrations/${app.slug}/`} title={app.body}>
        <span className="igh-tile-logo"><AppLogo slug={app.slug} size={36} /></span>
        <strong>{app.name}</strong><small>{app.category}</small>
        <ArrowUpRight size={16} className="igh-tile-arrow" />
      </a>)}</div>
    </section>

    <section className="sp-section container">
      <SectionIntro eyebrow="No code" title="Connected in three steps." />
      <ol className="igh-steps">{CONNECT.map(s => <Reveal as="li" key={s.title}><span className="igh-step-icon">{s.icon}</span><span><strong>{s.title}</strong><small>{s.note}</small></span></Reveal>)}</ol>
    </section>

    <section className="sp-section igh-jobs-band"><div className="container">
      <SectionIntro eyebrow="Use cases" title={page.jobs.title} />
      <div className="igh-jobs">{page.jobs.items.map((job, i) => <Reveal key={job.title} className={`igh-job ${i === 0 ? 'is-wide' : ''}`}>
        <LogoStack slugs={job.apps} />
        <h3>{job.title}</h3>
        {i === 0 && <TrackingStrip />}
      </Reveal>)}</div>
    </div></section>

    <section className="sp-section container"><Reveal className="igh-custom"><h2>{page.custom.title}</h2><button className="button" onClick={() => onOpen('Request an integration')}>Request an integration <ArrowRight size={17} /></button></Reveal></section>
    <Faq title={page.faq.title} items={page.faq.items} />
    <Reveal><CtaBand cta={page.cta} onOpen={onOpen} /></Reveal>
  </>}</SiteFrame>;
}
