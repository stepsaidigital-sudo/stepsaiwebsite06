'use client';
import { Fragment, useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight, BadgeCheck, BarChart3, Bot, Calculator, CalendarDays, Check, ChevronRight, CircleCheck, ExternalLink, FileCheck2,
  FileSpreadsheet, FileText, Lightbulb, Play, Plus, Reply, Send, ShieldCheck, ShoppingBag, Sparkles, Tag, Type, Users, Webhook,
} from 'lucide-react';
import { ChannelLogo } from '@/app/channel-chat';
import { SiteFrame } from '@/components/site/shell';
import { Reveal } from '@/components/sections';
import { SplitWords } from '@/components/site/motion';
import type { FeaturePage } from '@/content/types';

// The WhatsApp broadcast page, built to the approved visual reference. Copy
// comes from content/features/whatsapp-broadcast.json; every mockup is an
// illustration with fictional sample data.

/* ---------- small pieces ---------- */

function Accent({ text, accent = [] }: { text: string; accent?: string[] }) {
  // Wrap the accent phrases of a heading in the blue gradient.
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

function PaperPlane({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
    <defs><linearGradient id="wb-plane" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7fb2ff" /><stop offset="1" stopColor="#1a56db" /></linearGradient></defs>
    <path d="M4 30 60 6 44 58 30 40Z" fill="url(#wb-plane)" />
    <path d="M30 40 60 6 22 34Z" fill="#c9dcff" />
    <path d="M30 40 26 54 36 46Z" fill="#1a56db" opacity=".7" />
  </svg>;
}

function Avatar({ name, tone }: { name: string; tone: string }) {
  return <span className={`wb-avatar wb-${tone}`} aria-hidden="true">{name}</span>;
}

/* ---------- hero composition ---------- */

function Phone() {
  return <div className="wb-phone">
    <div className="wb-phone-screen">
      <div className="wb-phone-notch" />
      <div className="wb-phone-head"><span className="wb-phone-logo">S</span><strong>Your Business</strong><BadgeCheck size={13} className="wb-verified" /></div>
      <div className="wb-phone-chat">
        <div className="wb-tpl">
          <img src="/industries/ecommerce.png" alt="" />
          <p><b>Hi Priya,</b> our new collection is live. See the latest styles and the offers picked for you.</p>
          <small>11:42 AM</small>
          <span className="wb-tpl-btn"><ExternalLink size={12} />View collection</span>
          <span className="wb-tpl-btn"><Reply size={12} />Chat with us</span>
        </div>
      </div>
      <div className="wb-phone-bar" />
    </div>
  </div>;
}

const panelRows: [string, string, ReactNode][] = [
  ['Select template', 'Choose from approved templates', <span key="c" className="wb-chip wb-chip-green"><Check size={11} />Approved</span>],
  ['Add audience', 'Select segments or upload list', <span key="c" className="wb-chip">850 contacts</span>],
  ['Schedule', 'Pick date and time', <span key="c" className="wb-chip">Send now or later</span>],
  ['AI follow up', 'Engage, qualify and convert', <span key="c" className="wb-chip">Handled by your agent</span>],
];

function BroadcastPanel() {
  return <div className="wb-panel">
    <div className="wb-panel-head"><strong>New Broadcast</strong><span>Draft <ArrowRight size={12} /></span></div>
    {panelRows.map(([title, sub, chip], i) => <div key={title} className="wb-panel-row" style={{ animationDelay: `${500 + i * 220}ms` }}>
      <span className="wb-num">{i + 1}</span>
      <div><strong>{title}</strong><small>{sub}</small></div>
      {chip}
    </div>)}
    <span className="wb-send">Send broadcast <ArrowRight size={15} /></span>
  </div>;
}

function HeroVisual() {
  return <div className="wb-hero-visual" aria-label="Illustration of a WhatsApp broadcast being set up" role="img">
    <svg className="wb-trail wb-trail-a" viewBox="0 0 200 120" aria-hidden="true"><path d="M190 110 C120 120 60 90 10 20" /></svg>
    <svg className="wb-trail wb-trail-b" viewBox="0 0 160 80" aria-hidden="true"><path d="M5 70 C50 75 110 60 155 10" /></svg>
    <BroadcastPanel />
    <Phone />
    <span className="wb-wa-bubble"><ChannelLogo channel="WhatsApp" /></span>
    <PaperPlane className="wb-plane wb-plane-a" />
    <PaperPlane className="wb-plane wb-plane-b" />
  </div>;
}

/* ---------- "how it works" strip ---------- */

const flowIcons = [[FileText, 'blue'], [Users, 'blue'], [CalendarDays, 'teal'], [Sparkles, 'violet']] as const;

/* ---------- step showcase: four stages, one shown at a time ---------- */

type Stage = { pill: string; card: ReactNode; side: ReactNode };

function Card({ title, status, children }: { title: string; status?: ReactNode; children: ReactNode }) {
  return <div className="wb-card"><div className="wb-card-head"><strong>{title}</strong>{status}</div>{children}</div>;
}

function Bubble({ who, children, delay }: { who: 'customer' | 'agent'; children: ReactNode; delay: number }) {
  return <div className={`wb-bubble wb-bubble-${who}`} style={{ animationDelay: `${delay}ms` }}>
    {who === 'agent' ? <span className="wb-bot"><Bot size={15} /></span> : <Avatar name="P" tone="peach" />}
    <p>{children}</p>
  </div>;
}

function stages(): Stage[] {
  return [
    {
      pill: 'Step 1 · Connect',
      card: <Card title="WhatsApp Business" status={<span className="wb-chip wb-chip-green"><CircleCheck size={12} />Connected</span>}>
        <div className="wb-row wb-row-box"><span className="wb-wa-mini"><ChannelLogo channel="WhatsApp" /></span><div><strong>+91 98765 43210</strong><small>Connected 2 minutes ago</small></div></div>
        <small className="wb-label">Assigned Agent</small>
        <div className="wb-row wb-row-box wb-row-link"><span className="wb-agent"><Users size={16} /></span><div><strong>Sales Assistant</strong><small>Handles replies, qualifies leads and books meetings.</small></div><ChevronRight size={16} /></div>
      </Card>,
      side: <div className="wb-chat">
        <Bubble who="customer" delay={300}>Is this product available?</Bubble>
        <Bubble who="agent" delay={1100}>Yes, it is in stock. Would you like to see the latest collection?</Bubble>
        <Bubble who="customer" delay={2000}>Great. Send me the details.</Bubble>
      </div>,
    },
    {
      pill: 'Step 2 · Audience',
      card: <Card title="Choose your audience" status={<span className="wb-chip">850 contacts</span>}>
        {([[Users, 'Saved customer list'], [FileSpreadsheet, 'Upload a CSV'], [ShoppingBag, 'Shopify customers'], [Tag, 'Tag: returning customer']] as const).map(([Icon, label], i) =>
          <div key={label} className={`wb-row wb-row-box ${i === 3 ? 'is-picked' : ''}`} style={{ animationDelay: `${200 + i * 160}ms` }}><span className="wb-ico"><Icon size={15} /></span><div><strong>{label}</strong></div>{i === 3 && <Check size={16} className="wb-tick" />}</div>)}
      </Card>,
      side: <div className="wb-chat">
        <div className="wb-preview" style={{ animationDelay: '400ms' }}><small>Template preview</small><p>Hi <b>first_name</b>, our new collection is in. Reply SIZE and we will help you choose.</p></div>
      </div>,
    },
    {
      pill: 'Step 3 · Schedule',
      card: <Card title="Schedule and review" status={<span className="wb-chip wb-chip-green"><Check size={11} />Ready</span>}>
        <div className="wb-preview wb-preview-flat"><p>Hi <b>Priya</b>, our new collection is in. Reply SIZE and we will help you choose.</p></div>
        <div className="wb-row wb-row-box"><span className="wb-ico"><CalendarDays size={15} /></span><div><strong>Send on</strong><small>Friday, 10:00 AM</small></div></div>
        <div className="wb-row wb-row-box"><span className="wb-ico"><Calculator size={15} /></span><div><strong>Estimated cost</strong><small>Shown before you send</small></div></div>
      </Card>,
      side: <div className="wb-report">
        <small>After you send</small>
        {[['Delivered', 92], ['Read', 68], ['Failed', 4]].map(([label, w], i) => <div key={label} className="wb-bar"><span>{label}</span><i style={{ ['--w' as string]: `${w}%`, animationDelay: `${300 + i * 200}ms` }} /></div>)}
      </div>,
    },
    {
      pill: 'Step 4 · Replies',
      card: <Card title="Shared inbox" status={<span className="wb-chip">3 new replies</span>}>
        {[['P', 'Priya S.', 'SIZE. Do you have it in medium?', 'peach'], ['R', 'Rahul M.', 'Is delivery free this week?', 'blue'], ['A', 'Anu K.', 'Please send the link.', 'mint']].map(([n, name, text, tone], i) =>
          <div key={name} className="wb-row wb-row-box" style={{ animationDelay: `${200 + i * 180}ms` }}><Avatar name={n} tone={tone} /><div><strong>{name}</strong><small>{text}</small></div><span className="wb-chip wb-chip-soft">AI replied</span></div>)}
      </Card>,
      side: <div className="wb-chat">
        <Bubble who="customer" delay={300}>SIZE. Do you have the linen shirt in medium?</Bubble>
        <Bubble who="agent" delay={1200}>Yes, medium is in stock. Would you like the link?</Bubble>
      </div>,
    },
  ];
}

function StepShowcase({ steps, onOpen }: { steps: FeaturePage['steps']['items']; onOpen: (label: string) => void }) {
  const all = stages();
  const [active, setActive] = useState(0), [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => setActive(a => (a + 1) % all.length), 6500);
    return () => window.clearTimeout(timer);
  }, [active, paused, all.length]);
  const step = steps[active], stage = all[active];
  return <Reveal className="wb-band" >
    <div className="wb-band-inner" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="wb-band-copy">
        <span className="wb-pill">{stage.pill}</span>
        <h2 key={`t${active}`} className="wb-swap">{step.title}.</h2>
        <p key={`p${active}`} className="wb-swap">{step.body}</p>
        <button className="wb-btn-light" onClick={() => onOpen('Connect WhatsApp')}><ChannelLogo channel="WhatsApp" />Connect WhatsApp <ArrowRight size={15} /></button>
        <div className="wb-dots" role="tablist" aria-label="Broadcast steps">
          {all.map((s, i) => <button key={s.pill} role="tab" aria-selected={i === active} aria-label={s.pill} className={i === active ? 'is-active' : ''} onClick={() => setActive(i)}><i style={{ animationPlayState: paused ? 'paused' : 'running' }} /></button>)}
        </div>
      </div>
      <div className="wb-band-card" key={`c${active}`}>{stage.card}</div>
      <div className="wb-band-side" key={`s${active}`}>{stage.side}</div>
      <svg className="wb-wave" viewBox="0 0 400 120" aria-hidden="true"><path d="M0 90 C80 40 160 120 240 70 S360 30 400 60" /><path d="M0 105 C90 60 170 130 250 85 S360 50 400 78" /></svg>
    </div>
  </Reveal>;
}

/* ---------- features grid ---------- */

const featureIcons = [
  [Send, 'blue'], [Users, 'blue'], [Calculator, 'blue'],
  [Tag, 'violet'], [Type, 'blue'], [BarChart3, 'violet'],
  [ShieldCheck, 'rose'], [FileCheck2, 'violet'], [Sparkles, 'teal'],
] as const;
// Reference order: list, customers, cost / tag, personalise, track / opt-outs, templates, AI.
const featureOrder = ['Send to a saved list or CSV', 'Reach your Shopify customers', 'Check the cost before you send', 'Target one tag at a time', 'Personalise names and offers', 'Track delivery and retry failures', 'Respect opt-outs automatically', 'Use approved templates', 'Let AI follow up on replies'];

function FeatureTiles({ items }: { items: FeaturePage['features']['items'] }) {
  const [open, setOpen] = useState<string | null>(null);
  const sorted = [...items].sort((a, b) => featureOrder.indexOf(a.title) - featureOrder.indexOf(b.title));
  return <div className="wb-tiles">{sorted.map((item, i) => {
    const [Icon, tint] = featureIcons[i % featureIcons.length];
    const isOpen = open === item.title;
    return <Reveal key={item.title} className={`wb-tile ${isOpen ? 'is-open' : ''}`}>
      <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : item.title)}>
        <span className={`wb-tile-ico wb-${tint}`}><Icon size={17} /></span>
        <strong>{item.title}</strong>
        <ArrowRight size={15} className="wb-tile-arrow" />
      </button>
      <p hidden={!isOpen}>{item.body}</p>
    </Reveal>;
  })}</div>;
}

/* ---------- page ---------- */

const logoFor: Record<string, ReactNode> = {
  hubspot: <img src="/brands/integrations/hubspot.svg" alt="" width={30} height={30} />,
  'google-calendar': <img src="/brands/integrations/google-calendar.svg" alt="" width={30} height={30} />,
  webhook: <Webhook size={28} className="wb-webhook" />,
};

export function BroadcastPageTemplate({ page }: { page: FeaturePage }) {
  const checks = (page.hero.reassurance ?? '').split('. ').map(s => s.replace(/\.$/, '')).filter(Boolean);
  return <SiteFrame>{onOpen => <div className="wb">
    {/* Hero */}
    <section className="wb-hero">
      <div className="container wb-hero-inner">
        <div className="wb-hero-copy">
          <div className="wb-kicker"><ChannelLogo channel="WhatsApp" />{page.hero.kicker}</div>
          <h1><Accent text={page.hero.title} accent={page.hero.accent} /></h1>
          <p className="wb-lead">{page.hero.body}</p>
          <div className="wb-actions">
            <button className="wb-btn" onClick={() => onOpen('Book a demo')}>Book a demo <ArrowRight size={16} /></button>
            <a className="wb-btn-ghost" href="#how"><span><Play size={11} fill="currentColor" /></span>See how it works</a>
          </div>
          <ul className="wb-checks">{checks.map(c => <li key={c}><CircleCheck size={15} />{c}</li>)}</ul>
        </div>
        <HeroVisual />
      </div>
    </section>

    {/* How it works */}
    <section id="how" className="container wb-how">
      <div className="wb-how-copy">
        <span className="wb-eyebrow">How it works</span>
        <h2 aria-label={page.steps.title}><SplitWords text={page.steps.title} /></h2>
        <p>{page.steps.intro}</p>
      </div>
      <ol className="wb-flow">{(page.flow ?? []).map((step, i) => {
        const [Icon, tint] = flowIcons[i % flowIcons.length];
        return <Fragment key={step.title}>
          {i > 0 && <li className="wb-flow-arrow" aria-hidden="true"><ArrowRight size={16} /></li>}
          <Reveal as="li" className="wb-flow-step"><span className={`wb-flow-ico wb-${tint}`}><Icon size={24} /></span><strong>{step.title}</strong><small>{step.body}</small></Reveal>
        </Fragment>;
      })}</ol>
    </section>

    {/* Step showcase */}
    <section className="container wb-band-wrap"><StepShowcase steps={page.steps.items} onOpen={onOpen} /></section>

    {/* Features */}
    <section className="container wb-split">
      <div className="wb-split-copy"><h2 aria-label={page.features.title}><SplitWords text={page.features.title} /></h2><p>{page.features.intro}</p></div>
      <FeatureTiles items={page.features.items} />
    </section>

    {/* Good to know */}
    <section className="container"><Reveal className="wb-good">
      <span className="wb-good-ico"><Lightbulb size={20} /></span>
      <div><h2>{page.goodToKnow.title}</h2><ul>{page.goodToKnow.items.map(item => <li key={item}>{item}</li>)}</ul></div>
    </Reveal></section>

    {/* FAQ */}
    <section className="container wb-split wb-faq">
      <div className="wb-split-copy"><span className="wb-eyebrow">FAQ</span><h2 aria-label={page.faq.title}><SplitWords text={page.faq.title} /></h2></div>
      <Reveal className="wb-faq-list">{page.faq.items.map(item => <details key={item.q}><summary>{item.q}<Plus size={16} /></summary><p>{item.a}</p></details>)}</Reveal>
    </section>

    {/* Works well with */}
    <section className="container wb-split wb-related">
      <div className="wb-split-copy"><h2 aria-label={page.related.title}><SplitWords text={page.related.title} /></h2>{page.related.intro && <p>{page.related.intro}</p>}</div>
      <div className="wb-related-cards">{page.related.items.map(item => <Reveal key={item.label}><Link className="wb-related-card" href={item.href}>
        <span className="wb-related-logo">{logoFor[item.logo ?? ''] ?? null}</span>
        <span><strong>{item.label}</strong><small>{item.body}</small></span>
        <ArrowRight size={15} />
      </Link></Reveal>)}</div>
    </section>

    {/* Closing call to action */}
    <section className="container wb-cta-wrap"><Reveal className="wb-cta">
      <div className="wb-cta-art" aria-hidden="true">
        <div className="wb-mini-panel">{panelRows.slice(0, 3).map(([title], i) => <div key={title}><span className="wb-num">{i + 1}</span><i /></div>)}</div>
        <div className="wb-mini-phone"><div><i /><i /><i /></div></div>
        <span className="wb-wa-bubble wb-wa-small"><ChannelLogo channel="WhatsApp" /></span>
      </div>
      <div className="wb-cta-copy"><h2>{page.cta.title}</h2><p>{page.cta.body}</p></div>
      <button className="wb-btn wb-btn-navy" onClick={() => onOpen('Book a demo')}>Book a demo <ArrowRight size={16} /></button>
    </Reveal></section>
  </div>}</SiteFrame>;
}

