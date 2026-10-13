'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight, BarChart3, BookOpen, CalendarCheck, Check, ChevronRight, CreditCard, Globe, Headphones, Inbox, LifeBuoy, Megaphone, MousePointer2,
  Play, Plug, Rocket, Search, Sparkles, Users, Workflow, Code2, MessageCircleQuestion,
} from 'lucide-react';
import { ChannelLogo } from '@/app/channel-chat';
import { SiteFrame } from '@/components/site/shell';
import { Reveal } from '@/components/sections';
import { AiImage } from '@/components/premium/ai-image';
import copy from '@/app/copy.json';
import { MediaSlot } from './help';
import { helpLessons as lessons, helpTopics as topics } from './help-data';
import type { HelpLesson } from '@/content/types';

// Help centre home. A navy search hero, a beginner path, topics, a tutorial player that plays each
// lesson's own steps (or its video once one is added), learning paths and the ways to get help.
// Lesson pages and FAQs stay in help.tsx.

const bySlug = (slug: string) => lessons.find(l => l.slug === slug);
const ofTopic = (slug: string) => lessons.filter(l => l.topic === slug);
const topicOf = (l: HelpLesson) => topics.find(t => t.slug === l.topic);

const ICONS: Record<string, ReactNode> = {
  rocket: <Rocket size={20} />, globe: <Globe size={20} />, whatsapp: <ChannelLogo channel="WhatsApp" />, instagram: <ChannelLogo channel="Instagram" />,
  plug: <Plug size={20} />, spark: <Sparkles size={20} />, headset: <Headphones size={20} />, megaphone: <Megaphone size={20} />, flow: <Workflow size={20} />,
  inbox: <Inbox size={20} />, users: <Users size={20} />, chart: <BarChart3 size={20} />, card: <CreditCard size={20} />,
};
const iconOf = (key?: string) => ICONS[key ?? ''] ?? <BookOpen size={20} />;

/* ---------- hero search ---------- */

const CHIPS: [string, string][] = [['Connect WhatsApp', 'connect-whatsapp'], ['Train your agent', 'add-business-information'], ['Human handoff', 'set-up-human-handoff'], ['Credits and billing', 'how-credits-work']];

// Questions the placeholder cycles through; each one has a guide behind it.
const PROMPTS = ['How do I connect WhatsApp?', 'How do I add the chat to my website?', 'How does human handoff work?', 'How do credits work?', 'How do I book appointments?'];

// Word-based search: each meaningful word is matched on its own, so a question such as
// "How do I connect WhatsApp?" finds the guide. Title matches rank above summary and steps.
const STOP = new Set(['a', 'an', 'the', 'how', 'do', 'does', 'i', 'my', 'me', 'to', 'can', 'is', 'are', 'what', 'where', 'when', 'why', 'and', 'or', 'of', 'for', 'in', 'on', 'with', 'it', 'you', 'your', 'we', 'our', 'set', 'up']);
const words = (text: string) => text.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter(w => w.length > 1 && !STOP.has(w));
function searchGuides(query: string) {
  const terms = words(query);
  if (!terms.length) return [];
  return lessons.map(l => {
    const title = l.title.toLowerCase(), summary = `${l.summary} ${topicOf(l)?.title ?? ''}`.toLowerCase(), body = l.steps.map(s => `${s.title} ${s.body}`).join(' ').toLowerCase();
    let score = 0, matched = 0;
    for (const t of terms) { const stem = t.length > 4 ? t.replace(/(ing|es|s)$/, '') : t; const hit = (x: string) => x.includes(stem); if (hit(title)) score += 6; if (hit(summary)) score += 3; if (hit(body)) score += 1; if (hit(title) || hit(summary) || hit(body)) matched++; }
    return { l, score: score + (matched === terms.length ? 4 : 0) };
  }).filter(r => r.score > 0).sort((a, b) => b.score - a.score).slice(0, 6).map(r => r.l);
}
const SUGGESTED = ['connect-whatsapp', 'add-chat-widget-to-website', 'set-up-human-handoff', 'how-credits-work'];

function HeroSearch() {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState('');
  const [hint, setHint] = useState(0);
  const [focused, setFocused] = useState(false);
  const term = q.trim().toLowerCase();
  const hits = term.length > 1 ? searchGuides(q) : [];
  const [open, setOpen] = useState(false);
  const suggested = SUGGESTED.map(bySlug).filter(Boolean) as HelpLesson[];
  // "/" focuses the search from anywhere on the page.
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === '/' && !(e.target as HTMLElement).closest('input,textarea')) { e.preventDefault(); input.current?.focus(); } };
    addEventListener('keydown', key);
    return () => removeEventListener('keydown', key);
  }, []);
  useEffect(() => {
    if (q || focused || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setHint(h => (h + 1) % PROMPTS.length), 2800);
    return () => clearInterval(t);
  }, [q, focused]);
  const go = () => { if (hits[0]) router.push(`/help/${hits[0].slug}/`); else input.current?.focus(); };
  return <div className="hx-search-wrap">
    <div className="hx-halo" aria-hidden="true" />
    <form className={`hx-search ${focused ? 'is-focus' : ''}`} role="search" onSubmit={e => { e.preventDefault(); go(); }}>
      <Search size={22} className="hx-search-ico" />
      <span className="hx-field">
        <input ref={input} value={q} onChange={e => setQ(e.target.value)} onFocus={() => { setFocused(true); setOpen(true); }} onBlur={() => { setFocused(false); setTimeout(() => setOpen(false), 150); }} onKeyDown={e => { if (e.key === 'Escape') { setOpen(false); input.current?.blur(); } }} aria-label="Search the help centre" />
        {!q && <span className="hx-ph" key={hint} aria-hidden="true">{focused ? 'Type a question or a feature' : PROMPTS[hint]}</span>}
      </span>
      {!focused && !q && <kbd aria-hidden="true">/</kbd>}
      <button type="submit" className="hx-go">Search</button>
    </form>
    {open && term.length <= 1 && <div className="hx-results" role="listbox" aria-label="Suggested guides"><small className="hx-results-label">Suggested guides</small>
      {suggested.map(a => <Link key={a.slug} href={`/help/${a.slug}/`} className="hx-hit"><span className="hx-hit-ico">{iconOf(topicOf(a)?.icon)}</span><span><strong>{a.title}</strong><small>{topicOf(a)?.title} · {a.summary}</small></span><ChevronRight size={16} /></Link>)}
    </div>}
    {term.length > 1 && <div className="hx-results" role="listbox">
      {hits.length ? hits.map(a => <Link key={a.slug} href={`/help/${a.slug}/`} className="hx-hit"><span className="hx-hit-ico">{iconOf(topicOf(a)?.icon)}</span><span><strong>{a.title}</strong><small>{topicOf(a)?.title} · {a.summary}</small></span><ChevronRight size={16} /></Link>)
        : <p className="hx-none">No guides match “{q}”. Try a shorter word, or <Link href="/help/faqs/">browse the FAQs</Link>.</p>}
    </div>}
    <div className="hx-chips"><span>Popular</span>{CHIPS.map(([label, slug]) => <Link key={slug} href={`/help/${slug}/`}>{label}</Link>)}</div>
  </div>;
}

/* ---------- tutorial player: plays a lesson's steps inside an app frame ---------- */

const SERIES = ['create-your-first-agent', 'add-business-information', 'set-tone-and-guardrails', 'add-chat-widget-to-website', 'connect-whatsapp'];
const STEP_MS = 2600;

function Player({ lesson }: { lesson: HelpLesson }) {
  const [step, setStep] = useState(0);
  const [on, setOn] = useState(true);
  useEffect(() => {
    if (!on || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setStep(s => (s + 1) % lesson.steps.length), STEP_MS);
    return () => clearInterval(t);
  }, [on, lesson.slug, lesson.steps.length]);
  if (lesson.video) return <div className="hx-player is-video"><MediaSlot media={lesson.video} kind="video" label={lesson.title} /></div>;
  const s = lesson.steps[step];
  const path = (s.path ?? `Home › ${topicOf(lesson)?.title ?? 'Agents'}`).split('›').map(p => p.trim());
  return <div className="hx-player" aria-label={`Walkthrough: ${lesson.title}`}>
    <div className="hx-app">
      <div className="hx-app-bar"><span className="hx-dots"><i /><i /><i /></span><span className="hx-url">app.stepsai.co</span></div>
      <div className="hx-app-body">
        <nav className="hx-app-nav">{['Home', 'Agents', 'Inbox', 'CRM', 'Workflows', 'Resources'].map(n => <span key={n} className={path.includes(n) ? 'is-on' : ''}>{n}</span>)}</nav>
        <div className="hx-app-main" key={`${lesson.slug}-${step}`}>
          <div className="hx-crumb">{path.map((p, i) => <span key={i}>{i > 0 && <ChevronRight size={12} />}{p}</span>)}</div>
          <span className="hx-step-tag">Step {step + 1} of {lesson.steps.length}</span>
          <h4>{s.title}</h4>
          <p>{s.body}</p>
          <span className="hx-cta">Continue <ArrowRight size={13} /><MousePointer2 size={18} className="hx-cursor" /></span>
        </div>
      </div>
    </div>
    <div className="hx-player-bar">
      <button onClick={() => setOn(v => !v)} aria-label={on ? 'Pause walkthrough' : 'Play walkthrough'}>{on ? <span className="hx-pause" /> : <Play size={14} fill="currentColor" />}</button>
      <div className="hx-ticks">{lesson.steps.map((x, i) => <button key={x.title} className={i < step ? 'is-done' : i === step ? 'is-now' : ''} onClick={() => { setStep(i); setOn(false); }} aria-label={`Step ${i + 1}: ${x.title}`}><i style={i === step && on ? { animationDuration: `${STEP_MS}ms` } : undefined} /></button>)}</div>
      <Link href={`/help/${lesson.slug}/`}>Open guide</Link>
    </div>
  </div>;
}

function Tutorials() {
  const series = SERIES.map(bySlug).filter(Boolean) as HelpLesson[];
  const [pick, setPick] = useState(0);
  return <section className="container hx-section" id="tutorials">
    <div className="hx-head"><div><span className="hx-eyebrow">Tutorials</span><h2>Learn Steps AI in minutes.</h2></div><p>Pick a lesson and watch it play, step by step.</p></div>
    <div className="hx-tut">
      <div className="hx-series"><small>Getting started series</small>
        {series.map((l, i) => <button key={l.slug} className={i === pick ? 'is-on' : ''} onClick={() => setPick(i)}>
          <span className="hx-play">{i === pick ? <span className="hx-eq"><i /><i /><i /></span> : <Play size={12} fill="currentColor" />}</span>
          <span><strong>{l.title}</strong><small>{l.steps.length} steps · {topicOf(l)?.title}</small></span>
        </button>)}
      </div>
      <Player key={series[pick].slug} lesson={series[pick]} />
    </div>
  </section>;
}

/* ---------- page ---------- */

const START = [
  { n: '01', title: 'Create your agent', slug: 'create-your-first-agent' },
  { n: '02', title: 'Teach it your business', slug: 'add-business-information' },
  { n: '03', title: 'Connect a channel', slug: 'add-chat-widget-to-website' },
];

const PATHS = [
  { level: 'Beginner', tone: 'sky', title: 'Launch your first agent', slugs: ['create-your-first-agent', 'add-business-information', 'set-tone-and-guardrails', 'add-chat-widget-to-website'] },
  { level: 'Intermediate', tone: 'mint', title: 'Sell and follow up on WhatsApp', slugs: ['connect-whatsapp', 'whatsapp-templates', 'send-a-campaign', 'use-workflow-templates', 'track-orders-shopify'] },
  { level: 'Advanced', tone: 'sun', title: 'Run your support team', slugs: ['set-up-human-handoff', 'live-requests', 'find-conversations-that-need-you', 'create-tickets', 'use-the-built-in-crm'] },
];

export function HelpHubTemplate() {
  const faqs = copy.faq.items.slice(0, 5);
  return <SiteFrame>{onOpen => <div className="hx">
    <section className="hx-hero">
      <div className="container hx-hero-in">
        <nav className="hx-bar"><Link href="/help/" className="is-home"><LifeBuoy size={16} />Help centre</Link><Link href="#topics">Topics</Link><Link href="#tutorials">Tutorials</Link><Link href="/help/faqs/">FAQs</Link></nav>
        <h1>How can we help?</h1>
        <p>Guides for setting up your agent, your channels and your team.</p>
        <HeroSearch />
      </div>
    </section>

    <section className="container hx-new">
      <Reveal className="hx-new-media"><AiImage src="/photos/ai/help-new.jpg" alt="Business owner setting up an AI agent on a laptop"
        prompt="Photorealistic editorial photo, 16:10 landscape. A young Indian small-business owner at a bright café-style counter, laptop open, smiling as she sets something up; a phone beside the laptop. Soft morning light, warm neutral tones with navy and sky-blue accents, calm and welcoming. Shallow depth of field. No logos, no readable screen text, no watermarks." /></Reveal>
      <div className="hx-new-copy">
        <span className="hx-eyebrow">New to Steps AI?</span>
        <h2>Go live in three steps.</h2>
        <p>Start here. Each step is a short guide, and you can stop and come back any time.</p>
        <ol className="hx-track">{START.map(s => <li key={s.slug}><Link href={`/help/${s.slug}/`}><b>{s.n}</b><span>{s.title}</span><ArrowRight size={16} /></Link></li>)}</ol>
        <Link className="hx-btn" href={`/help/${START[0].slug}/`}>Get started <ArrowRight size={16} /></Link>
      </div>
    </section>

    <section className="container hx-section" id="topics">
      <div className="hx-head"><div><span className="hx-eyebrow">Topics</span><h2>Get your questions answered.</h2></div><p>{topics.length} topics · {lessons.length} guides</p></div>
      <div className="hx-topics">{topics.map(t => { const first = ofTopic(t.slug)[0]; const count = ofTopic(t.slug).length; return first && <Reveal key={t.slug}>
        <Link href={`/help/${first.slug}/`} className="hx-topic"><span className="hx-topic-ico">{iconOf(t.icon)}</span><strong>{t.title}</strong><small>{t.summary}</small><em>{count} {count === 1 ? 'guide' : 'guides'}<ArrowRight size={14} /></em></Link>
      </Reveal>; })}</div>
      <a className="hx-dev" href="https://docs.stepsai.co"><Code2 size={16} />Building with the API? Read the developer documentation<ArrowRight size={14} /></a>
    </section>

    <Tutorials />

    <section className="container hx-section">
      <div className="hx-head"><div><span className="hx-eyebrow">Learning paths</span><h2>Get more out of Steps AI.</h2></div><p>Short lessons in order, from first setup to running a team.</p></div>
      <div className="hx-paths">{PATHS.map(p => { const ls = p.slugs.map(bySlug).filter(Boolean) as HelpLesson[]; return <Reveal key={p.title} className={`hx-path is-${p.tone}`}>
        <span className="hx-level">{p.level}</span><h3>{p.title}</h3><small className="hx-count"><BookOpen size={13} />{ls.length} lessons</small>
        <ul>{ls.map(l => <li key={l.slug}><Link href={`/help/${l.slug}/`}><Check size={13} />{l.title}</Link></li>)}</ul>
        <Link className="hx-path-go" href={`/help/${ls[0].slug}/`}>Start the path <span><ArrowRight size={14} /></span></Link>
      </Reveal>; })}</div>
    </section>

    <section className="container hx-section hx-faq">
      <div><span className="hx-eyebrow">FAQs</span><h2>Quick answers.</h2><Link className="hx-link" href="/help/faqs/">See all FAQs <ArrowRight size={15} /></Link></div>
      <ul>{faqs.map(f => <li key={f.title}><Link href="/help/faqs/"><MessageCircleQuestion size={18} />{f.title}<ChevronRight size={16} /></Link></li>)}</ul>
    </section>

    <section className="hx-need"><div className="container">
      <h2>Still have questions? We can help.</h2>
      <div className="hx-need-grid">
        <Link href="/help/faqs/" className="hx-need-card"><span><MessageCircleQuestion size={20} /></span><div><strong>Browse the FAQs</strong><small>Agents, channels, integrations and plans.</small></div><b><ArrowRight size={16} /></b></Link>
        <Link href="/contact/" className="hx-need-card"><span><LifeBuoy size={20} /></span><div><strong>Contact support</strong><small>Or ask the support team from inside the app.</small></div><b><ArrowRight size={16} /></b></Link>
        <button onClick={() => onOpen('Book a demo')} className="hx-need-card"><span><CalendarCheck size={20} /></span><div><strong>Book a demo</strong><small>We walk through your setup with you.</small></div><b><ArrowRight size={16} /></b></button>
      </div>
    </div></section>
  </div>}</SiteFrame>;
}
