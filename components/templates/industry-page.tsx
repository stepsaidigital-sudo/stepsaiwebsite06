'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { isPublishedUseCase } from '@/lib/published';
import {
  ArrowRight, BookOpen, Building2, CalendarCheck, CalendarDays, Check, CircleCheck, Clock, CreditCard, GraduationCap, Headphones, Home,
  IndianRupee, Landmark, Link2, Megaphone, Package, Plane, Search, Shirt, ShoppingBag, ShoppingCart, Stethoscope, Ticket, Truck, UserPlus,
  Users, X,
} from 'lucide-react';
import { ChannelLogo } from '@/app/channel-chat';
import { SiteFrame } from '@/components/site/shell';
import { Reveal } from '@/components/sections';
import { SplitWords } from '@/components/site/motion';
import {
  Bubble, Capabilities, Card, Chip, ChannelRow, CtaBlock, FaqBlock, Float, GoodToKnow, HeroScene, LivePhone, PhotoStory, PremiumHero, QuoteBlock,
  Row, StepBand, ToolCards, type Line, type Stage,
} from '@/components/premium/kit';
import type { IndustryPage } from '@/content/types';

// Industry pages on the premium template. Copy comes from content/industries/*.json, including the
// problem-and-fix rows, the agents each industry runs and one end-to-end journey. Mockups are
// illustrations with fictional sample data.

const icons: Record<string, ReactNode> = {
  shirt: <Shirt size={15} />, box: <Package size={15} />, cart: <ShoppingCart size={15} />, link: <Link2 size={15} />, check: <Check size={15} />,
  truck: <Truck size={15} />, book: <BookOpen size={15} />, ticket: <Ticket size={15} />, calendar: <CalendarCheck size={15} />, user: <UserPlus size={15} />,
  home: <Home size={15} />, school: <GraduationCap size={15} />, clinic: <Stethoscope size={15} />, plane: <Plane size={15} />, bank: <Landmark size={15} />,
  card: <CreditCard size={15} />, search: <Search size={15} />, clock: <Clock size={15} />, rupee: <IndianRupee size={15} />, team: <Users size={15} />,
  whatsapp: <ChannelLogo channel="WhatsApp" />, instagram: <ChannelLogo channel="Instagram" />,
};

const agentInfo: Record<string, { label: string; icon: ReactNode }> = {
  'ai-sales-agent': { label: 'AI sales agent', icon: <ShoppingBag size={18} /> },
  'ai-support-agent': { label: 'AI support agent', icon: <Headphones size={18} /> },
  'ai-marketing-agent': { label: 'AI marketing agent', icon: <Megaphone size={18} /> },
  'ai-lead-capture-agent': { label: 'AI lead capture agent', icon: <UserPlus size={18} /> },
  'ai-booking-agent': { label: 'AI booking agent', icon: <CalendarDays size={18} /> },
  'ai-receptionist': { label: 'AI receptionist', icon: <Headphones size={18} /> },
};

const photoKey: Record<string, string> = { ecommerce: 'ecom', healthcare: 'health', education: 'edu', 'real-estate': 're', 'travel-and-hospitality': 'travel', saas: 'saas', 'financial-services': 'fin' };
// One unique hero photo per industry (public/photos/in-*-hero.jpg, credits in docs/photo-credits.md).
const heroPhotos: Record<string, string> = Object.fromEntries(Object.entries(photoKey).map(([slug, k]) => [slug, `/photos/in-${k}-hero.jpg`]));
const kickerIcon: Record<string, ReactNode> = {
  ecommerce: <ShoppingBag size={16} />, healthcare: <Stethoscope size={16} />, education: <GraduationCap size={16} />, 'real-estate': <Building2 size={16} />,
  'travel-and-hospitality': <Plane size={16} />, saas: <Users size={16} />, 'financial-services': <Landmark size={16} />,
};
const business: Record<string, string> = { ecommerce: 'Lumen Home', healthcare: 'City Care Clinic', education: 'Northfield Academy', 'real-estate': 'Skyline Homes', 'travel-and-hospitality': 'Coral Bay Resort', saas: 'Brightline', 'financial-services': 'Northstar Finance' };
const result = (icon: ReactNode, title: string, sub: string) => <div className="pp-result"><span>{icon}</span><div><strong>{title}</strong><small>{sub}</small></div></div>;

/* ---------- sections ---------- */

function QuestionMarquee({ title, intro, items }: IndustryPage['questions']) {
  const row = [...items, ...items];
  return <section className="pp-q-wrap">
    <div className="container pp-head"><span className="wb-eyebrow">What customers ask</span><h2 aria-label={title}><SplitWords text={title} /></h2><p>{intro}</p></div>
    <div className="pp-q-rows" aria-label="Example customer questions">
      {[0, 1].map(r => <div key={r} className={`pp-q-row ${r ? 'is-reverse' : ''}`}><div className="pp-q-track">{(r ? [...row].reverse() : row).map((q, i) => <span key={i} className="pp-q" aria-hidden={i >= items.length || undefined}><ChannelLogo channel={q.channel} />{q.text}</span>)}</div></div>)}
    </div>
  </section>;
}

function Problems({ data }: { data: NonNullable<IndustryPage['problems']> }) {
  // Before/after switcher: each problem shows the pile-up first, then flips to the agent handling it.
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0), [after, setAfter] = useState(false), [held, setHeld] = useState(false), [seen, setSeen] = useState(false);
  const n = data.items.length, item = data.items[i];
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: .3 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!seen) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setAfter(true); return; }
    const t = window.setTimeout(() => {
      if (!after) setAfter(true);
      else if (!held) { setI(x => (x + 1) % n); setAfter(false); }
    }, after ? 5600 : 2600);
    return () => window.clearTimeout(t);
  }, [i, after, held, seen, n]);
  const pick = (k: number) => { setI(k); setAfter(false); setHeld(true); };
  return <section ref={root} className="pp-ps-wrap"><div className="container">
    <div className="pp-split-head">
      <div><span className="wb-eyebrow">Problems we solve</span><h2 aria-label={data.title}><SplitWords text={data.title} /></h2></div>
      <p>{data.intro}</p>
    </div>
    <div className="pp-ps">
      <ol className="pp-ps-tabs" role="tablist" aria-label="Store problems">{data.items.map((p, k) => <li key={p.pain}>
        <button role="tab" aria-selected={k === i} className={k === i ? 'is-active' : ''} onClick={() => pick(k)}>
          <span className="pp-ps-num">{String(k + 1).padStart(2, '0')}</span><span className="pp-ps-pain">{p.pain}</span>
          {k === i && !held && <i className="pp-ps-bar" key={`${i}-${after}`} style={{ animationDuration: after ? '5.6s' : '2.6s' }} />}
        </button>
      </li>)}</ol>
      <div className={`pp-ps-stage ${after ? 'is-after' : ''}`} key={i}>
        <div className="pp-ps-switch" role="group" aria-label="Compare">
          <button className={!after ? 'is-on' : ''} onClick={() => { setAfter(false); setHeld(true); }}>Without an agent</button>
          <button className={after ? 'is-on' : ''} onClick={() => { setAfter(true); setHeld(true); }}>With Steps AI</button>
        </div>
        <div className="pp-ps-before" aria-hidden={after}>
          <div className="pp-ps-pile">{[0, 1, 2].map(k => <div key={k} className="pp-ps-msg" style={{ animationDelay: `${k * 180}ms` }}><span className="wb-avatar wb-peach">{'PRA'[k]}</span><p>{item.ask ?? item.pain}</p><small>unread</small></div>)}</div>
          {item.count && <span className="pp-ps-count"><X size={13} />{item.count}</span>}
        </div>
        <div className="pp-ps-after" aria-hidden={!after}>
          <div className="pp-ps-chat">
            {item.ask && <div className="pp-ps-q">{item.ask}</div>}
            {after && <div className="pp-ps-typing"><span className="pp-ps-bot"><img src="/brands/steps-original.png" alt="" /></span><i /><i /><i /></div>}
            <div className="pp-ps-a"><span className="pp-ps-bot"><img src="/brands/steps-original.png" alt="" /></span><p>{item.reply ?? item.fix}</p></div>
          </div>
          <span className="pp-ps-stamp"><CircleCheck size={16} />Answered in seconds</span>
          {agentInfo[item.agent] && (isPublishedUseCase(item.agent)
            ? <Link className="pp-ps-agent" href={`/use-cases/${item.agent}/`}>{agentInfo[item.agent].icon}Handled by the {agentInfo[item.agent].label}<ArrowRight size={14} /></Link>
            : <a className="pp-ps-agent">{agentInfo[item.agent].icon}Handled by the {agentInfo[item.agent].label}<ArrowRight size={14} /></a>)}
        </div>
      </div>
    </div>
  </div></section>;
}

function Agents({ data }: { data: NonNullable<IndustryPage['agents']> }) {
  return <section className="pp-agents-band"><div className="container">
    <div className="pp-split-head">
      <div><span className="wb-eyebrow">Your agents</span><h2 aria-label={data.title}><SplitWords text={data.title} /></h2></div>
      <p>{data.intro}</p>
    </div>
    <div className="pp-agent-cards">{data.items.map(a => { const card = <>
      <figure className={a.photo ? '' : 'is-empty'}>{a.photo ? <img src={a.photo} alt="" loading="lazy" decoding="async" /> : <span className="pp-agent-big">{agentInfo[a.slug]?.icon}</span>}<span className="pp-agent-badge">{agentInfo[a.slug]?.icon}</span></figure>
      <div className="pp-agent-body">
        <h3>{agentInfo[a.slug]?.label}</h3>
        <ul>{a.does.map(x => <li key={x}><Check size={14} />{x}</li>)}</ul>
        <span className="pp-agent-cta">See how it works <ArrowRight size={14} /></span>
      </div>
    </>;
      return <Reveal key={a.slug}>{isPublishedUseCase(a.slug) ? <Link className="pp-agent-card" href={`/use-cases/${a.slug}/`}>{card}</Link> : <a className="pp-agent-card">{card}</a>}</Reveal>;
    })}</div>
  </div></section>;
}


/* ---------- per-industry extras (photo stories) ---------- */

const stories: Record<string, ReactNode[]> = {
  ecommerce: [
    <PhotoStory key="shopify" id="shopify" eyebrow="Built for Shopify" title="Connect your store once. Your agent knows every product and order."
      body="Steps AI reads your Shopify catalogue, stock and orders, and your delivery partner's tracking. Your agent answers from real data, not from guesses."
      points={['Products, prices and stock from Shopify or WooCommerce', 'Order status from Shiprocket, Delhivery, DTDC, iThink Logistics or WareIQ', 'Cart reminders and COD confirmation for Shopify stores']}
      photo="/photos/in-ecom-shopify.jpg" alt="Team packing and labelling online orders"
      overlay={<Card title="Connected" status={<Chip tone="green"><Check size={11} />Live</Chip>}>
        <Row icon={<img src="/brands/integrations/shopify.svg" alt="" width={16} height={16} />} title="Shopify" sub="1,240 products · Orders synced" picked delay={200} />
        <Row icon={<img src="/brands/integrations/shiprocket.svg" alt="" width={16} height={16} />} title="Shiprocket" sub="Tracking for every shipment" delay={400} />
        <Row icon={<ChannelLogo channel="WhatsApp" />} title="WhatsApp Business" sub="Replies and reminders" delay={600} />
      </Card>} />,
    <PhotoStory key="sale" id="sale-days" reverse eyebrow="Sale days and launches" title="When messages pour in, every customer still gets an answer."
      body="On a sale day, hundreds of people ask about sizes, stock and delivery at once. Your agent answers each message as it arrives, so nobody waits in a queue."
      points={['Answers at any hour, including late at night', 'Every reply to your campaign handled by your agent', 'Your team picks up the conversations that need a person']}
      photo="/photos/in-ecom-sale.jpg" alt="Shopper browsing a sale on her laptop in the evening"
      overlay={<Card title="Tonight" status={<Chip tone="soft">Sale live</Chip>}>
        <div className="pp-kpi-grid"><div><small>Chats answered</small><strong>418</strong></div><div><small>Avg AI response</small><strong>2.1 sec</strong></div><div><small>Checkout links</small><strong>96</strong></div><div><small>Passed to team</small><strong>11</strong></div></div>
      </Card>} />,
  ],
};

/* ---------- page ---------- */

export function IndustryPageTemplate({ page }: { page: IndustryPage }) {
  const key = photoKey[page.slug];
  const checks = (page.hero.reassurance ?? '').split('. ').map(s => s.replace(/\.$/, '')).filter(Boolean);
  const channel = (page.hero.channels?.[0] ?? 'WhatsApp') as 'WhatsApp' | 'Instagram' | 'Website';
  const j = page.journey?.stages ?? [];
  const last = j[j.length >= 4 ? 3 : j.length - 1];
  const heroLines: Line[] = j.length >= 2
    ? [{ from: 'customer', text: j[0].customer, at: 400 }, { from: 'agent', text: j[0].agent, at: 2300 }, { from: 'customer', text: last.customer, at: 4800 }, { from: 'agent', text: last.agent, at: 6700 }]
    : page.questions.items.slice(0, 2).flatMap((q, i) => [{ from: 'customer' as const, text: q.text, at: 400 + i * 4200 }]);
  // Two results in the closing band that fit this industry (ecommerce keeps checkout and tracking).
  const outcomes: Record<string, [ReactNode, string, string][]> = {
    ecommerce: [[<ShoppingCart key="a" size={15} />, 'Checkout link sent', 'In the chat'], [<Truck key="b" size={15} />, 'Order tracked', 'From your courier']],
    healthcare: [[<CalendarDays key="a" size={15} />, 'Visit booked', 'In your calendar'], [<CircleCheck key="b" size={15} />, 'Patient details saved', 'For your front desk']],
    education: [[<CircleCheck key="a" size={15} />, 'Enquiry saved', 'With course and batch'], [<CalendarDays key="b" size={15} />, 'Counselling booked', 'In your calendar']],
    'financial-services': [[<CircleCheck key="a" size={15} />, 'Lead saved', 'With the details you need'], [<CalendarDays key="b" size={15} />, 'Call booked', 'With your advisor']],
    'real-estate': [[<CircleCheck key="a" size={15} />, 'Lead saved', 'With budget and timeline'], [<CalendarDays key="b" size={15} />, 'Site visit booked', 'In your calendar']],
    saas: [[<CircleCheck key="a" size={15} />, 'Lead saved', 'To your CRM'], [<CalendarDays key="b" size={15} />, 'Demo booked', 'In your calendar']],
    'travel-and-hospitality': [[<CircleCheck key="a" size={15} />, 'Enquiry saved', 'With dates and guests'], [<CalendarDays key="b" size={15} />, 'Call booked', 'With your team']],
  };
  const outcome = outcomes[page.slug] ?? outcomes.ecommerce;
  const stages: Stage[] = j.map((s, i) => ({
    pill: `Step ${i + 1} of ${j.length}`, title: s.title, body: s.body,
    card: <Card title={s.card.title} status={<Chip tone="green"><Check size={11} />{s.card.chip}</Chip>}>{s.card.rows.map(([icon, title, sub], k) => <Row key={title} icon={icons[icon]} title={title} sub={sub} picked={k === s.card.rows.length - 1} delay={200 + k * 220} />)}</Card>,
    side: <div className="wb-chat"><Bubble who="customer" delay={300}>{s.customer}</Bubble><Bubble who="agent" delay={1300}>{s.agent}</Bubble><div className="pp-step-result" style={{ animationDelay: '2200ms' }}><CircleCheck size={14} />{s.result}</div></div>,
  }));
  const capIcons: [ReactNode, string][] = [[<ShoppingBag key="a" size={20} />, 'blue'], [<Truck key="b" size={20} />, 'violet'], [<ShoppingCart key="c" size={20} />, 'blue'], [<Megaphone key="d" size={20} />, 'violet'], [<BookOpen key="e" size={20} />, 'blue'], [<Users key="f" size={20} />, 'violet']];
  return <SiteFrame>{onOpen => <div className="wb pp">
    <PremiumHero kicker={page.hero.kicker} icon={kickerIcon[page.slug]} title={page.hero.title} accent={page.hero.accent} body={page.hero.body} checks={checks} onOpen={onOpen}
      visual={<HeroScene photo={heroPhotos[page.slug]} alt={`${page.hero.kicker} conversation and customer updates with Steps AI`}>
        <LivePhone kind={channel} business={business[page.slug] ?? 'Your business'} className="pp-hero-phone" period={11000} lines={heroLines} />
        {j[0] && <Float className="pp-pos-tr"><div className="pp-float-head"><CircleCheck size={14} />{j[0].result}</div><Row icon={icons[j[0].card.rows[0][0]]} title={j[0].card.rows[0][1]} sub={j[0].card.rows[0][2]} /></Float>}
        {last && <Float className="pp-pos-br">{result(<CircleCheck size={16} />, last.result, last.card.rows[0][2])}</Float>}
        <span className="pp-bubble-logo pp-pos-logo"><ChannelLogo channel={channel} /></span>
      </HeroScene>} />
    {page.hero.channels && <ChannelRow channels={page.hero.channels} />}
    <QuestionMarquee {...page.questions} />
    {page.problems && <Problems data={page.problems} />}
    {page.agents && <Agents data={page.agents} />}
    {page.journey && <><section id="how" className="container pp-head pp-walk-head"><span className="wb-eyebrow">Customer journey</span><h2>{page.journey.title}</h2><p>{page.journey.intro}</p></section>
      <StepBand stages={stages} cta={page.slug === 'ecommerce' ? { label: 'Connect your store', icon: <img src="/brands/integrations/shopify.svg" alt="" /> } : { label: 'Book a demo', icon: <CalendarDays size={18} /> }} onOpen={onOpen} label={page.journey.title} /></>}
    <Capabilities title={page.jobs.title} intro={page.jobs.intro} items={page.jobs.items} icons={capIcons} />
    {stories[page.slug] ?? (j[1] && <PhotoStory id="in-practice" eyebrow="In practice" title={page.journey!.stages[1].title + '.'} body={page.journey!.stages[1].body} points={page.jobs.items.slice(0, 3).map(x => x.title)} photo={'/photos/in-' + key + '-story.jpg'} alt={page.hero.kicker + ' team helping a customer'} overlay={<Card title={j[1].card.title} status={<Chip tone="green"><Check size={11} />{j[1].card.chip}</Chip>}>{j[1].card.rows.map(([icon, title, sub], k) => <Row key={title} icon={icons[icon]} title={title} sub={sub} picked={k === j[1].card.rows.length - 1} delay={200 + k * 220} />)}</Card>} />)}
    <ToolCards title={page.tools.title} intro={page.tools.intro} names={page.tools.names} />
    {page.quotes.map(q => <QuoteBlock key={q.attribution} excerpt={q.excerpt} attribution={q.attribution} />)}
    <GoodToKnow title={page.goodToKnow.title} items={page.goodToKnow.items} />
    <FaqBlock title={page.faq.title} items={page.faq.items} />
    <CtaBlock title={page.cta.title} body={page.cta.body} onOpen={onOpen}
      art={<div className="pp-cta-stack"><Float>{result(<CircleCheck size={15} />, 'Question answered', 'In seconds')}</Float><Float>{result(outcome[0][0], outcome[0][1], outcome[0][2])}</Float></div>}
      artRight={<div className="pp-cta-stack"><Float>{result(outcome[1][0], outcome[1][1], outcome[1][2])}</Float><Float>{result(<Headphones size={15} />, 'Team joined', 'With the full history')}</Float></div>} />
  </div>}</SiteFrame>;
}

