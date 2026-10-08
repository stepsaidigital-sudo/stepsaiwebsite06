'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { ArrowUpRight, CalendarDays, Check, CheckCheck, Info, Megaphone, Plus, Send, Users, FileText } from 'lucide-react';
import { ChannelLogo, channelKind } from '@/app/channel-chat';
import { CustomerQuote } from '@/app/quote';
import { Action, type Open } from '@/components/site/shell';
import { builtRoutes } from '@/components/site/routes';
import type { Cta, Faq as FaqItem, Hero, Item, Quote, Related } from '@/content/types';

// Fades a block in the first time it scrolls into view. Under reduced motion
// the content is shown straight away.
export function Reveal({ children, className = '', as: Tag = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'section' | 'li' }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.classList.add('sp-in'); return; }
    el.classList.add('sp-reveal');
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { el.classList.add('sp-in'); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <Tag ref={ref as never} className={className}>{children}</Tag>;
}

export function PageHero({ hero, onOpen, visual }: Open & { hero: Hero; visual?: ReactNode }) {
  return <section className="sp-hero"><div className="container sp-hero-inner">
    <div className="sp-hero-copy">
      <div className="eyebrow"><span className="tiny-mark" />{hero.kicker}</div>
      <h1>{hero.title}</h1>
      <p className="hero-description">{hero.body}</p>
      {hero.channels && <div className="channels">{hero.channels.map(c => <span key={c}><ChannelLogo channel={c} />{c}</span>)}</div>}
      <Action onOpen={onOpen} />
      {hero.reassurance && <p className="reassurance">{hero.reassurance}</p>}
    </div>
    {visual && <div className="sp-hero-visual">{visual}</div>}
  </div></section>;
}

export function SectionIntro({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return <div className="section-intro sp-intro">{eyebrow && <span className="section-kicker">{eyebrow}</span>}<h2>{title}</h2>{intro && <p>{intro}</p>}</div>;
}

// Numbered steps. With visuals the rows alternate copy and mockup.
export function StepRows({ items, visuals }: { items: Item[]; visuals?: ReactNode[] }) {
  return <ol className={`sp-steps ${visuals ? 'has-visuals' : ''}`}>{items.map((item, i) =>
    <Reveal as="li" key={item.title} className="sp-step">
      <div className="sp-step-copy"><span className="sp-step-number">{String(i + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.body}</p></div>
      {visuals?.[i] && <div className="sp-step-visual" aria-hidden="true">{visuals[i]}</div>}
    </Reveal>)}</ol>;
}

export function FeatureList({ items }: { items: Item[] }) {
  return <div className="sp-features">{items.map(item =>
    <details key={item.title} className="sp-feature"><summary><Check size={18} /><span>{item.title}</span><Plus size={18} className="sp-feature-toggle" /></summary><p>{item.body}</p></details>)}</div>;
}

export function GoodToKnow({ title, items }: { title: string; items: string[] }) {
  return <Reveal className="sp-good"><div className="sp-good-icon"><Info size={22} /></div><div><h2>{title}</h2><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></div></Reveal>;
}

export function QuoteCard({ quote }: { quote: Quote }) {
  return <Reveal className="sp-quote"><CustomerQuote paragraphs={[quote.excerpt, quote.attribution]} /></Reveal>;
}

export function Faq({ title, items }: { title: string; items: FaqItem[] }) {
  return <section className="sp-section container sp-faq"><div><span className="section-kicker">FAQ</span><h2>{title}</h2></div><div className="faq-list">{items.map(item =>
    <details key={item.q}><summary>{item.q}<Plus size={18} /></summary><p>{item.a}</p></details>)}</div></section>;
}

// Cards for sibling pages. A card whose page is not built yet opens the
// preview notice instead of leading to a 404.
export function RelatedCards({ title, items, onOpen }: Open & { title: string; items: (Related & { built?: boolean })[] }) {
  const live = new Set(Object.values(builtRoutes));
  return <section className="sp-section container"><SectionIntro title={title} /><div className="sp-cards">{items.map(item => {
    const inner = <><h3>{item.label}</h3><p>{item.body}</p><span className="sp-card-arrow"><ArrowUpRight size={18} /></span></>;
    return live.has(item.href) || item.built
      ? <a key={item.label} className="sp-card" href={item.href}>{inner}</a>
      : <button key={item.label} className="sp-card" onClick={() => onOpen(item.label)}>{inner}</button>;
  })}</div></section>;
}

const logoFiles = new Set(['calendly', 'google-calendar', 'google-drive', 'hubspot', 'notion', 'shopify', 'woocommerce', 'zendesk']);
const slugOf = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function LogoStrip({ names }: { names: string[] }) {
  return <ul className="sp-logos">{names.map(name => {
    const slug = slugOf(name);
    return <li key={name}>{logoFiles.has(slug) ? <img src={`/brands/integrations/${slug}.svg`} alt="" width="28" height="28" loading="lazy" /> : <span className="sp-logo-initial" aria-hidden="true">{name[0]}</span>}<span>{name}</span></li>;
  })}</ul>;
}

export function CtaBand({ cta, onOpen }: Open & { cta: Cta }) {
  return <section className="final-section"><div className="container"><img className="final-original" src="/brands/steps-original.png" alt="" /><h2>{cta.title}</h2><p>{cta.body}</p><Action onOpen={onOpen} className="yellow" /></div></section>;
}

// Mockups. Illustrative only, with fictional sample data.

export function ChatMock({ channel, title = 'Your business', lines }: { channel: string; title?: string; lines: { from: 'customer' | 'agent'; text: string }[] }) {
  const kind = channelKind(channel);
  return <Reveal className={`channel-chat channel-${kind} sp-chat`}>
    <div className="native-chat-header"><ChannelLogo channel={channel} /><div><strong>{title}</strong><small>{channel} · Illustration</small></div></div>
    <div className="native-chat-body" aria-label={`${channel} conversation illustration`}>
      <span className="chat-date">Today</span>
      {lines.map((line, i) => <div key={i} className={`native-message ${line.from === 'customer' ? 'incoming' : 'outgoing'} sp-line`} style={{ transitionDelay: `${200 + i * 450}ms` }}>{line.text}<small>10:2{i} {kind === 'whatsapp' && <CheckCheck size={12} />}</small></div>)}
    </div>
  </Reveal>;
}

export function BroadcastMock() {
  const rows: [typeof FileText, string, string][] = [[FileText, 'Template', 'New arrivals · approved'], [Users, 'Audience', 'Tag: returning customers'], [CalendarDays, 'Schedule', 'Friday, 10:00 AM'], [Send, 'Estimated cost', 'Shown before you send']];
  return <Reveal className="sp-broadcast">
    <div className="mock-window-title"><span className="mock-icon"><Megaphone size={19} /></span><div><strong>New broadcast</strong><small>WhatsApp · Illustration</small></div></div>
    <div className="sp-broadcast-body">
      {rows.map(([Icon, label, value], i) => <div key={label} className="sp-broadcast-row sp-line" style={{ transitionDelay: `${150 + i * 180}ms` }}><Icon size={17} /><span>{label}</span><strong>{value}</strong></div>)}
      <div className="sp-broadcast-preview sp-line" style={{ transitionDelay: '900ms' }}><ChannelLogo channel="WhatsApp" /><p>Hi <b>first_name</b>, our new collection is in. Reply SIZE and we will help you choose.</p></div>
      <div className="sp-broadcast-report">{['Delivered', 'Read', 'Clicked'].map((label, i) => <div key={label}><span>{label}</span><i style={{ ['--w' as string]: `${[92, 68, 31][i]}%` }} /></div>)}</div>
    </div>
  </Reveal>;
}

export type Plan = { name: string; for: string; price: string; credits: string; items: string[]; featured?: boolean };

export function PlanCard({ plan, onOpen }: Open & { plan: Plan }) {
  return <Reveal className={`sp-plan ${plan.featured ? 'featured' : ''}`}>
    <h3>{plan.name}</h3><p className="sp-plan-for">{plan.for}</p>
    <div className="sp-plan-price"><strong>{plan.price}</strong><span>{plan.credits}</span></div>
    <ul>{plan.items.map(item => <li key={item}><Check size={16} />{item}</li>)}</ul>
    <Action onOpen={onOpen} className={plan.featured ? 'yellow' : ''} />
  </Reveal>;
}
