'use client';
import { builtRoutes } from '@/components/site/routes';
import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight, BadgeCheck, Camera, CheckCheck, ChevronLeft, CircleCheck, Image as ImageIcon, Lightbulb, Mic, MicOff, Phone as PhoneIcon,
  PhoneOff, Plus, Send, Smile, Sticker, Video, Volume2, Grid3x3,
} from 'lucide-react';
import { ChannelLogo } from '@/app/channel-chat';
import { Reveal } from '@/components/sections';
import { SplitWords } from '@/components/site/motion';
import type { Faq, Item } from '@/content/types';
import { CapabilityStage } from './capability-stage';
import { AiImage } from './ai-image';

import { asset } from '@/lib/asset';
// Premium subpage kit: the WhatsApp broadcast page's look (.wb classes), recoloured per page
// through a theme (.pp-theme-*), plus platform-accurate phone screens. Every mockup is an
// illustration with fictional sample data. Mockup text never goes below 12px.

export type Theme = 'violet' | 'teal' | 'amber' | 'green' | 'indigo' | 'rose' | 'blue';
export type Line = { from: 'customer' | 'agent'; text: string; at: number; card?: ReactNode };

/* ---------- time: a looping clock that only runs while the element is on screen ---------- */

export function useLoop(period: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setT(1e9); return; }
    let timer = 0, start = performance.now(), visible = false;
    const tick = () => { const now = performance.now(); if (now - start > period) start = now; setT(now - start); };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      window.clearInterval(timer);
      if (visible) { start = performance.now(); setT(0); timer = window.setInterval(tick, 120); }
    }, { threshold: .2 });
    if (ref.current) io.observe(ref.current);
    return () => { io.disconnect(); window.clearInterval(timer); };
  }, [period]);
  return [ref, t] as const;
}

/* ---------- small pieces ---------- */

export function Accent({ text, accent = [] }: { text: string; accent?: string[] }) {
  const parts: ReactNode[] = [];
  let rest = text;
  while (rest) {
    const hits = accent.map(a => [a, rest.indexOf(a)] as const).filter(([, i]) => i >= 0).sort((a, b) => a[1] - b[1]);
    if (!hits.length) { parts.push(rest); break; }
    const [phrase, at] = hits[0];
    if (at > 0) parts.push(rest.slice(0, at));
    parts.push(<span key={parts.length} className="wb-accent">{phrase}</span>);
    rest = rest.slice(at + phrase.length);
  }
  return <>{parts}</>;
}

export function Chip({ children, tone = 'plain' }: { children: ReactNode; tone?: 'plain' | 'green' | 'soft' }) {
  return <span className={`wb-chip ${tone === 'green' ? 'wb-chip-green' : tone === 'soft' ? 'wb-chip-soft' : ''}`}>{children}</span>;
}

export function Card({ title, status, children, className = '' }: { title: string; status?: ReactNode; children: ReactNode; className?: string }) {
  return <div className={`wb-card ${className}`}><div className="wb-card-head"><strong>{title}</strong>{status}</div>{children}</div>;
}

export function Row({ icon, title, sub, end, picked, delay = 0 }: { icon?: ReactNode; title: ReactNode; sub?: ReactNode; end?: ReactNode; picked?: boolean; delay?: number }) {
  return <div className={`wb-row wb-row-box ${picked ? 'is-picked' : ''}`} style={{ animationDelay: `${delay}ms` }}>
    {icon && <span className="wb-ico">{icon}</span>}
    <div><strong>{title}</strong>{sub && <small>{sub}</small>}</div>
    {end}
  </div>;
}

export function Bubble({ who, children, delay, initial = 'P' }: { who: 'customer' | 'agent'; children: ReactNode; delay: number; initial?: string }) {
  return <div className={`wb-bubble wb-bubble-${who}`} style={{ animationDelay: `${delay}ms` }}>
    {who === 'agent' ? <span className="wb-bot pp-bot-mark"><img src={asset("/brands/steps-original.png")} alt="" /></span> : <span className="wb-avatar wb-peach" aria-hidden="true">{initial}</span>}
    <p>{children}</p>
  </div>;
}

/* ---------- phones: iOS frame + platform screens ---------- */

export function PhoneFrame({ children, className = '', dark = false }: { children: ReactNode; className?: string; dark?: boolean }) {
  return <div className={`pp-phone ${className}`}><div className={`pp-phone-screen ${dark ? 'is-dark' : ''}`}>
    <div className="pp-status"><b>9:41</b><span className="pp-island" /><i className="pp-bars" /></div>
    {children}
    <span className="pp-home" />
  </div></div>;
}

function Typing({ className }: { className: string }) {
  return <div className={`pp-typing ${className}`}><i /><i /><i /></div>;
}

// Shows each line once the clock passes its time; the agent "types" for a moment first.
function Thread({ lines, t, kind }: { lines: Line[]; t: number; kind: 'wa' | 'ig' | 'web' | 'ms' }) {
  const typing = lines.find(l => l.from === 'agent' && t >= l.at - 1000 && t < l.at);
  return <>
    {lines.filter(l => t >= l.at).map((l, i) => <Fragment key={i}>
      <div className={`pp-msg pp-${kind}-${l.from === 'customer' ? 'out' : 'in'}`}>
        {l.card}
        <p>{l.text}</p>
        {kind === 'wa' && <small>{`10:${String(24 + i).padStart(2, '0')}`}{l.from === 'customer' && <CheckCheck size={13} className="pp-ticks" />}</small>}
      </div>
    </Fragment>)}
    {typing && <Typing className={`pp-${kind}-in`} />}
  </>;
}

export function WhatsAppScreen({ business, lines, t }: { business: string; lines: Line[]; t: number }) {
  return <div className="pp-wa">
    <header><ChevronLeft size={20} /><span className="pp-wa-avatar">{business[0]}</span><div><strong>{business}<BadgeCheck size={13} className="pp-wa-verified" /></strong><small>Business account</small></div><Video size={19} /><PhoneIcon size={17} /></header>
    <div className="pp-wa-chat"><span className="pp-wa-day">Today</span><Thread lines={lines} t={t} kind="wa" /></div>
    <footer><Plus size={20} /><span className="pp-wa-input"><Sticker size={15} /></span><Camera size={18} /><Mic size={18} /></footer>
  </div>;
}

export function InstagramScreen({ business, handle, lines, t }: { business: string; handle: string; lines: Line[]; t: number }) {
  return <div className="pp-ig">
    <header><ChevronLeft size={20} /><span className="pp-ig-avatar"><span>{business[0]}</span></span><div><strong>{business}</strong><small>{handle}</small></div><PhoneIcon size={17} /><Video size={19} /></header>
    <div className="pp-ig-chat"><Thread lines={lines} t={t} kind="ig" /></div>
    <footer><span className="pp-ig-cam"><Camera size={14} /></span><span className="pp-ig-input">Message...</span><Mic size={17} /><ImageIcon size={17} /><Smile size={17} /></footer>
  </div>;
}

export function WidgetScreen({ business, lines, t }: { business: string; lines: Line[]; t: number }) {
  return <div className="pp-web">
    <header><span className="pp-web-avatar"><img src={asset("/brands/steps-original.png")} alt="" /></span><div><strong>{business}</strong><small><i />Typically replies instantly</small></div></header>
    <div className="pp-web-chat"><Thread lines={lines} t={t} kind="web" /></div>
    <footer><span>Type your message</span><span className="pp-web-send"><Send size={14} /></span></footer>
    <small className="pp-web-by">Powered by Steps AI</small>
  </div>;
}

export function CallScreen({ business, transcript, t, label = 'Live transcript · Illustration' }: { business: string; transcript: { who: string; text: string; at: number }[]; t: number; label?: string }) {
  const seconds = Math.min(59, Math.floor(t / 1000) + 12);
  return <div className="pp-call">
    <div className="pp-call-top"><span className="pp-call-avatar">{business[0]}</span><strong>{business}</strong><small>00:{String(seconds).padStart(2, '0')}</small></div>
    <div className="pp-call-live"><small><i />{label}</small>{transcript.filter(l => t >= l.at).slice(-3).map(l => <p key={l.at}><b>{l.who}</b>{l.text}</p>)}</div>
    <div className="pp-call-keys">{[[MicOff, 'mute'], [Grid3x3, 'keypad'], [Volume2, 'speaker']].map(([Icon, label]) => { const I = Icon as typeof MicOff; return <span key={label as string}><i><I size={20} /></i>{label as string}</span>; })}</div>
    <span className="pp-call-end"><PhoneOff size={22} /></span>
  </div>;
}

export function MessengerScreen({ business, lines, t }: { business: string; lines: Line[]; t: number }) {
  return <div className="pp-ms">
    <header><ChevronLeft size={20} /><span className="pp-ms-avatar">{business[0]}<i /></span><div><strong>{business}</strong><small>Typically replies instantly</small></div><PhoneIcon size={17} /><Video size={19} /></header>
    <div className="pp-ms-chat"><Thread lines={lines} t={t} kind="ms" /></div>
    <footer><Plus size={18} /><Camera size={17} /><ImageIcon size={17} /><span className="pp-ms-input">Aa</span><Smile size={17} /></footer>
  </div>;
}

export function ChatPageScreen({ business, lines, t, chips = [], links = [] }: { business: string; lines: Line[]; t: number; chips?: string[]; links?: string[] }) {
  return <div className="pp-cp">
    <div className="pp-cp-url">steps.ai/{business.toLowerCase().replace(/[^a-z]/g, '')}</div>
    <div className="pp-cp-brand"><span>{business[0]}</span><strong>{business}</strong><small>Ask us anything, any time</small></div>
    {links.length > 0 && <div className="pp-cp-links">{links.map(l => <span key={l}>{l}<ArrowRight size={12} /></span>)}</div>}
    <div className="pp-cp-chat">{t < (lines[0]?.at ?? 0) && chips.length > 0 ? <div className="pp-cp-chips">{chips.map(c => <span key={c}>{c}</span>)}</div> : <Thread lines={lines} t={t} kind="web" />}</div>
    <footer><span>Ask a question</span><span className="pp-web-send"><Send size={14} /></span></footer>
  </div>;
}

export function AppWindow({ title, sub, children, className = '' }: { title: string; sub?: string; children: ReactNode; className?: string }) {
  return <div className={`pp-app ${className}`}>
    <div className="pp-app-bar"><i /><i /><i /><strong>{title}</strong>{sub && <small>{sub}</small>}</div>
    <div className="pp-app-body">{children}</div>
  </div>;
}

export function LivePhone({ kind, business, handle = '@yourstore', lines, period = 9000, className = '', chips, links }: { kind: 'WhatsApp' | 'Instagram' | 'Website' | 'Messenger' | 'ChatPage'; business: string; handle?: string; lines: Line[]; period?: number; className?: string; chips?: string[]; links?: string[] }) {
  const [ref, t] = useLoop(period);
  return <div ref={ref} className={className}>
    <PhoneFrame>
      {kind === 'WhatsApp' ? <WhatsAppScreen business={business} lines={lines} t={t} /> : kind === 'Instagram' ? <InstagramScreen business={business} handle={handle} lines={lines} t={t} /> : kind === 'Messenger' ? <MessengerScreen business={business} lines={lines} t={t} /> : kind === 'ChatPage' ? <ChatPageScreen business={business} lines={lines} t={t} chips={chips} links={links} /> : <WidgetScreen business={business} lines={lines} t={t} />}
    </PhoneFrame>
  </div>;
}

export function LiveCall({ business, transcript, period = 10000, className = '' }: { business: string; transcript: { who: string; text: string; at: number }[]; period?: number; className?: string }) {
  const [ref, t] = useLoop(period);
  return <div ref={ref} className={className}><PhoneFrame dark><CallScreen business={business} transcript={transcript} t={t} /></PhoneFrame></div>;
}

/* ---------- industry examples: the same agent, shown in different businesses ---------- */

export type Scenario = {
  industry: string; href: string; photo: string; photoAlt?: string; icon: ReactNode; kind: 'WhatsApp' | 'Instagram' | 'Website' | 'Messenger' | 'Call';
  business: string; lines: Line[]; did: string[];
};

// Builds a timed conversation from [customer, agent] pairs.
export function convo(...pairs: [string, string, ReactNode?][]): Line[] {
  return pairs.flatMap(([c, a, card], i) => [{ from: 'customer' as const, text: c, at: 400 + i * 4200 }, { from: 'agent' as const, text: a, at: 2400 + i * 4200, card }]);
}

export function IndustryExamples({ title, intro, scenarios, noPhoto = false }: { title: string; intro: string; scenarios: Scenario[]; noPhoto?: boolean }) {
  const [active, setActive] = useState(0), [held, setHeld] = useState(false);
  useEffect(() => {
    if (held || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => setActive(a => (a + 1) % scenarios.length), 11000);
    return () => window.clearTimeout(timer);
  }, [active, held, scenarios.length]);
  const s = scenarios[active];
  const period = 400 + Math.ceil(s.lines.length / 2) * 4200 + 2500;
  return <section id="industries" className="pp-ind-wrap"><div className="container">
    <div className="pp-head"><span className="wb-eyebrow">By industry</span><h2 aria-label={title}><SplitWords text={title} /></h2><p>{intro}</p></div>
    <div className="pp-ind-tabs" role="tablist" aria-label="Industries">{scenarios.map((x, i) => <button key={x.industry} role="tab" aria-selected={i === active} className={i === active ? 'is-active' : ''} onClick={() => { setActive(i); setHeld(true); }}>{x.icon}{x.industry}</button>)}</div>
    <div className={`pp-ind-stage ${noPhoto ? 'is-plain' : ''}`} key={active}>
      <div className="pp-ind-photo">
        {!noPhoto && <img src={s.photo} alt={s.photoAlt ?? `${s.industry} business example`} loading="lazy" decoding="async" />}
        <div className="pp-ind-did"><small>What the agent did</small>{s.did.map((d, i) => <span key={d} style={{ animationDelay: `${300 + i * 250}ms` }}><CircleCheck size={15} />{d}</span>)}</div>
      </div>
      <div className="pp-ind-phone">
        {s.kind === 'Call'
          ? <LiveCall business={s.business} period={period} transcript={s.lines.map(l => ({ who: l.from === 'customer' ? 'Caller' : 'AI receptionist', text: l.text, at: l.at }))} />
          : <LivePhone kind={s.kind} business={s.business} handle={`@${s.business.toLowerCase().replace(/[^a-z]/g, '')}`} period={period} lines={s.lines} />}
      </div>
      <div className="pp-ind-copy">
        <span className="pp-ind-kind">{s.kind === 'Call' ? <PhoneIcon size={15} /> : <ChannelLogo channel={s.kind} />}{s.kind === 'Call' ? 'Phone call' : s.kind}</span>
        <h3>{s.business}</h3>
        <p>An example conversation for {/^[aeiou]/i.test(s.industry) ? 'an' : 'a'} {s.industry === 'SaaS' ? 'SaaS' : s.industry.toLowerCase()} business. Your agent answers from your own information and tools.</p>
        <Link href={s.href}>See Steps AI for {s.industry === 'SaaS' ? 'SaaS' : s.industry.toLowerCase()} <ArrowRight size={15} /></Link>
      </div>
    </div>
  </div></section>;
}

/* ---------- page sections ---------- */

export function PremiumHero({ kicker, icon, title, accent, body, checks, visual, onOpen }: {
  kicker: string; icon: ReactNode; title: string; accent?: string[]; body: string; checks: string[]; visual: ReactNode; onOpen: (l: string) => void;
}) {
  return <section className="wb-hero pp-hero">
    <div className="container wb-hero-inner">
      <div className="wb-hero-copy">
        <div className="wb-kicker pp-kicker"><span className="pp-kicker-ico">{icon}</span>{kicker}</div>
        <h1><Accent text={title} accent={accent} /></h1>
        <p className="wb-lead">{body}</p>
        <div className="wb-actions">
          <button className="wb-btn" onClick={() => onOpen('Book a demo')}>Book a demo <ArrowRight size={16} /></button>
          <a className="wb-btn-ghost" href={builtRoutes['Sign in']}>Sign in <ArrowRight size={16} /></a>
        </div>
        <ul className="wb-checks">{checks.map(c => <li key={c}><CircleCheck size={15} />{c}</li>)}</ul>
      </div>
      {visual}
    </div>
  </section>;
}

// Stock photo with the product mockups layered on top: the photo sets the scene, the mockups tell the story.
export function HeroScene({ photo, alt, children }: { photo: string; alt: string; children: ReactNode }) {
  return <div className="pp-scene" role="img" aria-label={alt}>
    <figure className="pp-scene-photo"><img src={photo} alt="" /></figure>
    {children}
  </div>;
}

export function Float({ className = '', children, style }: { className?: string; children: ReactNode; style?: CSSProperties }) {
  return <div className={`pp-float ${className}`} style={style}>{children}</div>;
}

export function ChannelRow({ channels }: { channels: string[] }) {
  return <div className="container pp-channels"><span>Works on</span>{channels.map(c => <span key={c} className="pp-channel"><ChannelLogo channel={c} />{c}</span>)}</div>;
}

export function FlowStrip({ eyebrow = 'How it works', title, intro, items }: { eyebrow?: string; title: string; intro: string; items: (Item & { icon: ReactNode; tint: string })[] }) {
  return <section id="how" className="container wb-how">
    <div className="wb-how-copy"><span className="wb-eyebrow">{eyebrow}</span><h2 aria-label={title}><SplitWords text={title} /></h2><p>{intro}</p></div>
    <ol className="wb-flow">{items.map((step, i) => <Fragment key={step.title}>
      {i > 0 && <li className="wb-flow-arrow" aria-hidden="true"><ArrowRight size={16} /></li>}
      <Reveal as="li" className="wb-flow-step"><span className={`wb-flow-ico wb-${step.tint}`}>{step.icon}</span><strong>{step.title}</strong><small>{step.body}</small></Reveal>
    </Fragment>)}</ol>
  </section>;
}

export type Stage = { pill: string; title: string; body: string; card: ReactNode; side: ReactNode };

export function StepBand({ stages, cta, onOpen, label }: { stages: Stage[]; cta: { label: string; icon: ReactNode }; onOpen: (l: string) => void; label: string }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false), [reduced, setReduced] = useState(false);
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduced(motion.matches);
    updateMotion();
    motion.addEventListener('change', updateMotion);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .1 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); motion.removeEventListener('change', updateMotion); };
  }, []);
  const running = visible && !reduced;
  useEffect(() => {
    if (!running || stages.length < 2) return;
    const timer = window.setTimeout(() => setActive(a => (a + 1) % stages.length), 5000);
    return () => window.clearTimeout(timer);
  }, [active, running, stages.length]);
  const stage = stages[active];
  return <section ref={root} className="container wb-band-wrap" data-journey-running={running}><Reveal className="wb-band pp-band">
    <div className="wb-band-inner">
      <div className="wb-band-copy">
        <span className="wb-pill">{stage.pill}</span>
        <h2 key={`t${active}`} className="wb-swap">{stage.title}.</h2>
        <p key={`p${active}`} className="wb-swap">{stage.body}</p>
        <button className="wb-btn-light" onClick={() => onOpen(cta.label)}>{cta.icon}{cta.label} <ArrowRight size={15} /></button>
        <div className="wb-dots" role="group" aria-label={label}>
          {stages.map((s, i) => <button key={s.pill} aria-pressed={i === active} aria-label={`${s.pill}: ${s.title}`} className={i === active ? 'is-active' : ''} onClick={() => setActive(i)}><i key={`${active}-${running}`} style={{ animationDuration: '5s', animationPlayState: running ? 'running' : 'paused' }} /></button>)}
        </div>
      </div>
      <div className="wb-band-card" key={`c${active}`}>{stage.card}</div>
      <div className="wb-band-side" key={`s${active}`}>{stage.side}</div>
      <svg className="wb-wave" viewBox="0 0 400 120" aria-hidden="true"><path d="M0 90 C80 40 160 120 240 70 S360 30 400 60" /><path d="M0 105 C90 60 170 130 250 85 S360 50 400 78" /></svg>
    </div>
  </Reveal></section>;
}

export function Capabilities({ title, intro, items, icons, plainBackground, industry }: { title: string; intro: string; items: Item[]; icons: [ReactNode, string][]; plainBackground?: boolean; industry?: string }) {
  return <CapabilityStage title={title} intro={intro} items={items} icons={icons} plainBackground={plainBackground} industry={industry} />;
}

export function PhotoStory({ id, eyebrow, title, body, points, photo, prompt, alt, overlay, reverse = false, tint = 'soft' }: {
  id?: string; eyebrow: string; title: string; body: string; points: string[]; photo?: string; prompt?: string; alt: string; overlay: ReactNode; reverse?: boolean; tint?: 'soft' | 'warm';
}) {
  return <section id={id} className={`pp-story-wrap pp-story-${tint}`}><div className={`container pp-story ${reverse ? 'is-reverse' : ''}`}>
    <Reveal className={`pp-story-media ${photo ? '' : 'is-plain'}`}>
      {photo && (prompt ? <AiImage src={photo} alt={alt} prompt={prompt} /> : <img src={photo} alt={alt} loading="lazy" decoding="async" />)}
      <div className="pp-story-overlay">{overlay}</div>
    </Reveal>
    <div className="pp-story-copy">
      <span className="wb-eyebrow">{eyebrow}</span>
      <h2 aria-label={title}><SplitWords text={title} /></h2>
      <p>{body}</p>
      <ul>{points.map(p => <li key={p}><CircleCheck size={17} />{p}</li>)}</ul>
    </div>
  </div></section>;
}

const logoSlug = (name: string) => name.toLowerCase().replace(/\./g, '-').replace(/\s+/g, '-');

export function ToolCards({ title, intro, names }: { title: string; intro: string; names: string[] }) {
  return <section className="container wb-split wb-related pp-tools">
    <div className="wb-split-copy"><span className="wb-eyebrow">Integrations</span><h2 aria-label={title}><SplitWords text={title} /></h2><p>{intro}</p></div>
    <div className="pp-tool-grid">{names.map(name => <Reveal key={name}><Link className="pp-tool" href={`/integrations/${logoSlug(name)}/`}>
      <img src={asset(`/brands/integrations/${logoSlug(name)}.svg`)} alt="" width={30} height={30} />
      <strong>{name}</strong><ArrowRight size={14} />
    </Link></Reveal>)}</div>
  </section>;
}

export function QuoteBlock({ excerpt, attribution, href }: { excerpt: string; attribution: string; href?: string }) {
  const [name, role, company] = attribution.split(' | ');
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('');
  return <section className="container pp-quote-wrap"><Reveal className="pp-quote">
    <span className="pp-quote-mark" aria-hidden="true">“</span>
    <blockquote>{excerpt.replace(/^[“"]|[”"]$/g, '')}</blockquote>
    <figcaption><span className="pp-quote-avatar">{initials}</span><span><strong>{name}</strong><small>{role} · {company}</small></span>{href && <Link href={href}>Read the story <ArrowRight size={14} /></Link>}</figcaption>
  </Reveal></section>;
}

export function GoodToKnow({ title, items }: { title: string; items: string[] }) {
  return <section className="container"><Reveal className="wb-good">
    <span className="wb-good-ico"><Lightbulb size={20} /></span>
    <div><h2>{title}</h2><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></div>
  </Reveal></section>;
}

export function FaqBlock({ title, items }: { title: string; items: Faq[] }) {
  return <section className="container wb-split wb-faq">
    <div className="wb-split-copy"><span className="wb-eyebrow">FAQ</span><h2 aria-label={title}><SplitWords text={title} /></h2></div>
    <Reveal className="wb-faq-list">{items.map(item => <details key={item.q}><summary>{item.q}<Plus size={16} /></summary><p>{item.a}</p></details>)}</Reveal>
  </section>;
}

export function CtaBlock({ title, body, onOpen, art, artRight, action = 'Book a demo' }: { title: string; body: string; onOpen: (l: string) => void; art: ReactNode; artRight?: ReactNode; action?: string }) {
  return <section className="container wb-cta-wrap"><Reveal className="wb-cta pp-cta">
    <div className="wb-cta-art pp-cta-art" aria-hidden="true">{art}</div>
    {artRight && <div className="wb-cta-art wb-cta-art-right pp-cta-art" aria-hidden="true">{artRight}</div>}
    <div className="wb-cta-copy"><h2>{title}</h2><p>{body}</p></div>
    <button className="wb-btn wb-btn-navy" onClick={() => onOpen(action)}>{action} <ArrowRight size={16} /></button>
  </Reveal></section>;
}
