'use client';
import { Fragment, useEffect, useState, type ComponentType, type ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight, BarChart3, Bot, Calculator, CalendarDays, CircleCheck, FileCheck2, FileText, Lightbulb, Play, Plus, Send,
  ShieldCheck, Sparkles, Tag, Type, Users, Webhook,
} from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { Reveal } from '@/components/sections';
import { SplitWords } from '@/components/site/motion';

// Section kit for every subpage, taken from the approved WhatsApp broadcast
// design. Pages compose these blocks in different orders so they share one
// visual system without all looking the same. Styles live in
// app/broadcast-page.css (.wb scope) and app/v2.css.

export type Icon = ComponentType<{ size?: number; className?: string }>;
export type Tint = 'blue' | 'teal' | 'violet' | 'rose' | 'amber';
type OnOpen = (label: string) => void;

export function V2Page({ children }: { children: (onOpen: OnOpen) => ReactNode }) {
  return <SiteFrame>{onOpen => <div className="wb v2">{children(onOpen)}</div>}</SiteFrame>;
}

/** Wraps the accent phrases of a heading in the blue gradient. */
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

export function V2Hero({ kicker, kickerIcon, title, accent, body, checks = [], onOpen, visual, secondary = { label: 'See how it works', href: '#how' } }: {
  kicker: string; kickerIcon?: ReactNode; title: string; accent?: string[]; body: string; checks?: string[]; onOpen: OnOpen; visual: ReactNode;
  secondary?: { label: string; href: string } | null;
}) {
  return <section className="wb-hero v2-hero">
    <div className="container wb-hero-inner">
      <div className="wb-hero-copy">
        <div className="wb-kicker">{kickerIcon}{kicker}</div>
        <h1><Accent text={title} accent={accent} /></h1>
        <p className="wb-lead">{body}</p>
        <div className="wb-actions">
          <button className="wb-btn" onClick={() => onOpen('Book a demo')}>Book a demo <ArrowRight size={16} /></button>
          {secondary && <a className="wb-btn-ghost" href={secondary.href}><span><Play size={11} fill="currentColor" /></span>{secondary.label}</a>}
        </div>
        {checks.length > 0 && <ul className="wb-checks">{checks.map(c => <li key={c}><CircleCheck size={15} />{c}</li>)}</ul>}
      </div>
      <div className="v2-visual">{visual}</div>
    </div>
  </section>;
}

/** Splits "A. B. C." reassurance copy into check items. */
export const checksFrom = (text?: string) => (text ?? '').split('. ').map(s => s.replace(/\.$/, '')).filter(Boolean);

export function V2Flow({ id = 'how', eyebrow = 'How it works', title, intro, steps }: {
  id?: string; eyebrow?: string; title: string; intro?: string; steps: { title: string; body: string; icon: Icon; tint?: Tint }[];
}) {
  return <section id={id} className="container wb-how">
    <div className="wb-how-copy"><span className="wb-eyebrow">{eyebrow}</span><h2 aria-label={title}><SplitWords text={title} /></h2>{intro && <p>{intro}</p>}</div>
    <ol className="wb-flow">{steps.map((step, i) => <Fragment key={step.title}>
      {i > 0 && <li className="wb-flow-arrow" aria-hidden="true"><ArrowRight size={16} /></li>}
      <Reveal as="li" className="wb-flow-step"><span className={`wb-flow-ico wb-${step.tint ?? 'blue'}`}><step.icon size={24} /></span><strong>{step.title}</strong><small>{step.body}</small></Reveal>
    </Fragment>)}</ol>
  </section>;
}

export type Stage = { pill: string; title: string; body: string; visual: ReactNode };

/** The tinted band: one stage, or several that play in turn with progress dashes. */
export function V2Stages({ stages, action, interval = 7000 }: { stages: Stage[]; action?: { label: string; onClick: () => void; icon?: ReactNode }; interval?: number }) {
  const [active, setActive] = useState(0), [paused, setPaused] = useState(false);
  useEffect(() => {
    if (stages.length < 2 || paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => setActive(a => (a + 1) % stages.length), interval);
    return () => window.clearTimeout(timer);
  }, [active, paused, stages.length, interval]);
  const stage = stages[active];
  return <section className="container wb-band-wrap"><Reveal className="wb-band">
    <div className="wb-band-inner v2-band-inner" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="wb-band-copy">
        <span className="wb-pill">{stage.pill}</span>
        <h2 key={`t${active}`} className="wb-swap">{stage.title}</h2>
        <p key={`p${active}`} className="wb-swap">{stage.body}</p>
        {action && <button className="wb-btn-light" onClick={action.onClick}>{action.icon}{action.label} <ArrowRight size={15} /></button>}
        {stages.length > 1 && <div className="wb-dots" role="tablist" aria-label="Steps">
          {stages.map((s, i) => <button key={s.pill} role="tab" aria-selected={i === active} aria-label={s.pill} className={i === active ? 'is-active' : ''} onClick={() => setActive(i)}><i style={{ animationDuration: `${interval}ms`, animationPlayState: paused ? 'paused' : 'running' }} /></button>)}
        </div>}
      </div>
      <div className="v2-band-visual wb-band-card" key={`v${active}`}>{stage.visual}</div>
      <svg className="wb-wave" viewBox="0 0 400 120" aria-hidden="true"><path d="M0 90 C80 40 160 120 240 70 S360 30 400 60" /><path d="M0 105 C90 60 170 130 250 85 S360 50 400 78" /></svg>
    </div>
  </Reveal></section>;
}

/** Copy on one side, a large mockup on the other. `flip` swaps the sides. */
export function V2Showcase({ eyebrow, title, intro, points = [], visual, flip = false, tone = 'plain' }: {
  eyebrow?: string; title: string; intro?: string; points?: { title: string; body: string }[]; visual: ReactNode; flip?: boolean; tone?: 'plain' | 'soft';
}) {
  return <section className={`v2-show ${tone === 'soft' ? 'is-soft' : ''}`}><div className={`container v2-show-inner ${flip ? 'is-flip' : ''}`}>
    <div className="v2-show-copy">
      {eyebrow && <span className="wb-eyebrow">{eyebrow}</span>}
      <h2 aria-label={title}><SplitWords text={title} /></h2>
      {intro && <p className="v2-show-intro">{intro}</p>}
      {points.length > 0 && <ul className="v2-points">{points.map(p => <Reveal as="li" key={p.title}><CircleCheck size={18} /><div><strong>{p.title}</strong><p>{p.body}</p></div></Reveal>)}</ul>}
    </div>
    <Reveal className="v2-show-visual">{visual}</Reveal>
  </div></section>;
}

const tileIcons: [Icon, Tint][] = [[Send, 'blue'], [Users, 'blue'], [Calculator, 'blue'], [Tag, 'violet'], [Type, 'blue'], [BarChart3, 'violet'], [ShieldCheck, 'rose'], [FileCheck2, 'violet'], [Sparkles, 'teal'], [CalendarDays, 'teal'], [Bot, 'blue'], [FileText, 'amber']];

export function V2Tiles({ title, intro, items, icons }: { title: string; intro?: string; items: { title: string; body: string }[]; icons?: [Icon, Tint][] }) {
  const [open, setOpen] = useState<string | null>(null);
  const set = icons ?? tileIcons;
  return <section className="container wb-split">
    <div className="wb-split-copy"><h2 aria-label={title}><SplitWords text={title} /></h2>{intro && <p>{intro}</p>}</div>
    <div className="wb-tiles">{items.map((item, i) => {
      const [Ico, tint] = set[i % set.length];
      const isOpen = open === item.title;
      return <Reveal key={item.title} className={`wb-tile ${isOpen ? 'is-open' : ''}`}>
        <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : item.title)}>
          <span className={`wb-tile-ico wb-${tint}`}><Ico size={17} /></span><strong>{item.title}</strong><ArrowRight size={15} className="wb-tile-arrow" />
        </button>
        <p hidden={!isOpen}>{item.body}</p>
      </Reveal>;
    })}</div>
  </section>;
}

export function V2Good({ title = 'Good to know', items }: { title?: string; items: string[] }) {
  return <section className="container"><Reveal className="wb-good">
    <span className="wb-good-ico"><Lightbulb size={20} /></span>
    <div><h2>{title}</h2><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></div>
  </Reveal></section>;
}

export function V2Faq({ title, items }: { title: string; items: { q: string; a: string }[] }) {
  return <section className="container wb-split wb-faq">
    <div className="wb-split-copy"><span className="wb-eyebrow">FAQ</span><h2 aria-label={title}><SplitWords text={title} /></h2></div>
    <Reveal className="wb-faq-list">{items.map(item => <details key={item.q}><summary>{item.q}<Plus size={16} /></summary><p>{item.a}</p></details>)}</Reveal>
  </section>;
}

export type RelatedLink = { label: string; href: string; body: string; logo?: string; icon?: Icon };

/** Logo for a related card: an integration slug, a channel name or an icon. */
function RelatedMark({ item }: { item: RelatedLink }) {
  if (item.icon) return <item.icon size={22} />;
  if (!item.logo) return <Sparkles size={22} />;
  const channel: Record<string, string> = { whatsapp: '/brands/whatsapp.png', instagram: '/brands/instagram-icon.png', messenger: '/brands/messenger.png', steps: '/brands/steps-original.png' };
  if (item.logo === 'webhook') return <Webhook size={26} className="wb-webhook" />;
  return <img src={channel[item.logo] ?? `/brands/integrations/${item.logo}.svg`} alt="" width={28} height={28} />;
}

export function V2Related({ title = 'Works well with.', intro, items }: { title?: string; intro?: string; items: RelatedLink[] }) {
  return <section className="container wb-split wb-related">
    <div className="wb-split-copy"><h2 aria-label={title}><SplitWords text={title} /></h2>{intro && <p>{intro}</p>}</div>
    <div className="wb-related-cards">{items.map(item => <Reveal key={item.href}><Link className="wb-related-card" href={item.href}>
      <span className="wb-related-logo"><RelatedMark item={item} /></span>
      <span><strong>{item.label}</strong><small>{item.body}</small></span>
      <ArrowRight size={15} />
    </Link></Reveal>)}</div>
  </section>;
}

export function V2Cta({ title, body, onOpen, art }: { title: string; body: string; onOpen: OnOpen; art?: ReactNode }) {
  return <section className="container wb-cta-wrap"><Reveal className={`wb-cta ${art ? '' : 'v2-cta-plain'}`}>
    {art && <div className="wb-cta-art v2-cta-art" aria-hidden="true">{art}</div>}
    <div className="wb-cta-copy"><h2>{title}</h2><p>{body}</p></div>
    <button className="wb-btn wb-btn-navy" onClick={() => onOpen('Book a demo')}>Book a demo <ArrowRight size={16} /></button>
  </Reveal></section>;
}

/** A row of linked logo chips, e.g. "Works with Shopify, WooCommerce...". */
export function V2Logos({ title, intro, items }: { title: string; intro?: string; items: { slug: string; name: string; href?: string }[] }) {
  return <section className="container v2-logos">
    <div className="wb-split-copy"><h2 aria-label={title}><SplitWords text={title} /></h2>{intro && <p>{intro}</p>}</div>
    <ul>{items.map(item => {
      const inner = <><img src={`/brands/integrations/${item.slug}.svg`} alt="" width={26} height={26} />{item.name}</>;
      return <Reveal as="li" key={item.slug}>{item.href ? <Link href={item.href}>{inner}<ArrowRight size={14} /></Link> : <span>{inner}</span>}</Reveal>;
    })}</ul>
  </section>;
}

/** Simple centred heading + intro, for sections that need one. */
export function V2Heading({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return <div className="v2-heading">{eyebrow && <span className="wb-eyebrow">{eyebrow}</span>}<h2 aria-label={title}><SplitWords text={title} /></h2>{intro && <p>{intro}</p>}</div>;
}
