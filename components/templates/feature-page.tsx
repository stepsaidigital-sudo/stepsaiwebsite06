'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight, BarChart3, Bot, CalendarDays, Check, CircleCheck, Clock, Flame, Globe, Inbox, MapPin, MessageSquare, Play, Sparkles, Tag,
  Ticket, TrendingUp, UserPlus, Users,
} from 'lucide-react';
import { ChannelLogo } from '@/app/channel-chat';
import { SiteFrame } from '@/components/site/shell';
import { Reveal } from '@/components/sections';
import { SplitWords } from '@/components/site/motion';
import { Accent, Capabilities, Card, Chip, CtaBlock, FaqBlock, Float, GoodToKnow, PhotoStory, Row, StepBand, type Stage } from '@/components/premium/kit';
import { AnalyticsMock, ScaleBox } from '@/components/premium/analytics-mock';
import type { FeaturePage } from '@/content/types';

// Feature pages on the premium template. Copy comes from content/features/*.json; the product
// mockups follow the real Steps AI screens (sample data only).

const result = (icon: ReactNode, title: string, sub: string) => <div className="pp-result"><span>{icon}</span><div><strong>{title}</strong><small>{sub}</small></div></div>;
const stack = (...items: ReactNode[]) => <div className="pp-cta-stack">{items.map((item, i) => <Float key={i}>{item}</Float>)}</div>;

function Heat() {
  // Days x hours activity, darker = busier. Late evenings are busiest (illustrative).
  const rows = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return <div className="pp-heat">{rows.map((d, r) => <div key={d}><small>{d}</small>{Array.from({ length: 12 }, (_, c) => {
    const v = Math.max(0.08, Math.min(1, (c >= 8 ? 0.55 + (c - 8) * 0.12 : 0.15 + c * 0.04) + (r >= 5 ? 0.15 : 0) - ((r * 7 + c * 3) % 5) * 0.05));
    return <i key={c} style={{ opacity: v }} />;
  })}</div>)}<span className="pp-heat-axis"><small>9 AM</small><small>3 PM</small><small>11 PM</small></span></div>;
}

type Design = {
  hero: ReactNode; cards: ReactNode[]; sides: ReactNode[]; bandCta: { label: string; icon: ReactNode };
  capIcons: [ReactNode, string][]; stories: ReactNode[]; ctaArt: [ReactNode, ReactNode];
};

const designs: Record<string, Design> = {
  analytics: {
    hero: <ScaleBox width={1000}><AnalyticsMock /></ScaleBox>,
    cards: [
      <Card key="0" title="Date range" status={<Chip>Last 7 days</Chip>}>
        <div className="pp-slots pp-slots-card"><span>Today</span><span className="is-picked">Last 7 days <Check size={11} /></span><span>Last 30 days</span><span>This month</span><span>Custom</span></div>
      </Card>,
      <Card key="1" title="Agent" status={<Chip>All agents</Chip>}>
        <Row icon={<Users size={15} />} title="All agents" sub="Account view" picked delay={200} />
        <Row icon={<Bot size={15} />} title="Sales assistant" sub="One agent" delay={350} />
        <Row icon={<Bot size={15} />} title="Support desk" sub="One agent" delay={500} />
      </Card>,
      <Card key="2" title="Headline numbers" status={<Chip tone="green"><TrendingUp size={11} />This week</Chip>}>
        <div className="pp-kpi-grid"><div><small>Total chats</small><strong>612</strong></div><div><small>Total messages</small><strong>2,084</strong></div><div><small>Avg AI response</small><strong>2.2 sec</strong></div><div><small>Ticket resolution</small><strong>88%</strong></div></div>
      </Card>,
      <Card key="3" title="Activity heat map" status={<Chip>Days × hours</Chip>}><Heat /></Card>,
    ],
    sides: [
      <div key="0" className="wb-report"><small>Chats per day</small>{[['Mon', 40], ['Tue', 55], ['Wed', 48], ['Thu', 62], ['Fri', 80], ['Sat', 92], ['Sun', 70]].map(([d, w], i) => <div key={d} className="wb-bar"><span>{d}</span><i style={{ ['--w' as string]: `${w}%`, animationDelay: `${200 + i * 120}ms` }} /></div>)}</div>,
      <div key="1" className="wb-report"><small>Compare agents</small>{[['Sales assistant', 78], ['Support desk', 64], ['Lead capture', 41]].map(([d, w], i) => <div key={d} className="wb-bar pp-bar-wide"><span>{d}</span><i style={{ ['--w' as string]: `${w}%`, animationDelay: `${200 + i * 150}ms` }} /></div>)}</div>,
      <div key="2" className="wb-chat"><div className="pp-step-result" style={{ animationDelay: '300ms' }}><Clock size={14} />Average AI response: 2.2 sec</div><div className="pp-step-result" style={{ animationDelay: '800ms' }}><Ticket size={14} />Ticket resolution: 88%</div></div>,
      <div key="3" className="wb-report"><small>What customers ask most</small>{[['Delivery times', 34], ['Sizing', 22], ['Returns', 15], ['COD', 11]].map(([q, w], i) => <div key={q} className="wb-bar pp-bar-wide"><span>{q}</span><i style={{ ['--w' as string]: `${(w as number) * 2.5}%`, animationDelay: `${200 + i * 150}ms` }} /></div>)}</div>,
    ],
    bandCta: { label: 'See analytics in a demo', icon: <BarChart3 size={18} /> },
    capIcons: [[<TrendingUp key="a" size={20} />, 'blue'], [<Globe key="b" size={20} />, 'violet'], [<Flame key="c" size={20} />, 'blue'], [<MessageSquare key="d" size={20} />, 'violet'], [<Users key="e" size={20} />, 'blue'], [<Tag key="f" size={20} />, 'violet'], [<MapPin key="g" size={20} />, 'blue']],
    stories: [
      <PhotoStory key="asks" id="questions" eyebrow="What customers ask" title="Know the questions before your team does."
        body="Analytics ranks the questions customers ask most, so you can improve your answers, your product pages and your policies where it matters."
        points={['A ranked list of the most asked questions', 'Busiest days and hours on a heat map', 'Leads by topic and marketing source']}
        photo="/photos/f-analytics.jpg" alt="Manager reviewing conversation numbers on a laptop"
        overlay={<Card title="Top questions" status={<Chip>Last 30 days</Chip>}>
          {[['Where is my order?', '34%'], ['Which size should I pick?', '22%'], ['How do returns work?', '15%'], ['Is COD available?', '11%']].map(([q, v], i) => <Row key={q} icon={<MessageSquare size={15} />} title={q} end={<Chip tone={i === 0 ? 'soft' : 'plain'}>{v}</Chip>} picked={i === 0} delay={200 + i * 150} />)}
        </Card>} />,
    ],
    ctaArt: [stack(result(<MessageSquare size={15} />, '612 chats', 'This week'), result(<Clock size={15} />, '2.2 sec', 'Average AI response')), stack(result(<Flame size={15} />, 'Busiest at 9 PM', 'From the heat map'), result(<UserPlus size={15} />, '74 leads', 'By topic and source'))],
  },
};

export const builtFeaturePages = Object.keys(designs);

const relatedIcon = (href: string) => href.includes('crm') ? <Users size={20} /> : href.includes('inbox') ? <Inbox size={20} /> : href.includes('broadcast') ? <ChannelLogo channel="WhatsApp" /> : href.includes('analytics') ? <BarChart3 size={20} /> : <Sparkles size={20} />;

export function FeaturePageTemplate({ page }: { page: FeaturePage }) {
  const d = designs[page.slug];
  const checks = (page.hero.reassurance ?? '').split('. ').map(s => s.replace(/\.$/, '')).filter(Boolean);
  const stages: Stage[] = page.steps.items.map((step, i) => ({ pill: `Step ${i + 1} · ${step.title.split(' ').slice(0, 2).join(' ')}`, title: step.title, body: step.body, card: d.cards[i], side: d.sides[i] }));
  return <SiteFrame>{onOpen => <div className="wb pp">
    <section className="wb-hero pp-hero pp-hero-wide">
      <div className="container">
        <div className="pp-wide-copy">
          <div className="wb-kicker pp-kicker"><span className="pp-kicker-ico"><BarChart3 size={16} /></span>{page.hero.kicker}</div>
          <h1><Accent text={page.hero.title} accent={page.hero.accent ?? []} /></h1>
          <p className="wb-lead">{page.hero.body}</p>
          <div className="wb-actions">
            <button className="wb-btn" onClick={() => onOpen('Book a demo')}>Book a demo <ArrowRight size={16} /></button>
            <a className="wb-btn-ghost" href="#how"><span><Play size={11} fill="currentColor" /></span>See how it works</a>
          </div>
          <ul className="wb-checks">{checks.map(c => <li key={c}><CircleCheck size={15} />{c}</li>)}</ul>
        </div>
        <div className="pp-wide-visual">{d.hero}<span className="pp-illus">Illustration with sample data</span></div>
      </div>
    </section>
    <section id="how" className="container pp-head pp-walk-head"><span className="wb-eyebrow">How it works</span><h2>{page.steps.title}</h2><p>{page.steps.intro}</p></section>
    <StepBand stages={stages} cta={d.bandCta} onOpen={onOpen} label={page.steps.title} />
    <Capabilities title={page.features.title} intro={page.features.intro} items={page.features.items} icons={d.capIcons} />
    {d.stories}
    <GoodToKnow title={page.goodToKnow.title} items={page.goodToKnow.items} />
    <FaqBlock title={page.faq.title} items={page.faq.items} />
    <section className="container wb-split wb-related">
      <div className="wb-split-copy"><h2 aria-label={page.related.title}><SplitWords text={page.related.title} /></h2>{page.related.intro && <p>{page.related.intro}</p>}</div>
      <div className="wb-related-cards">{page.related.items.map(item => <Reveal key={item.label}><Link className="wb-related-card" href={item.href}>
        <span className="wb-related-logo pp-related-ico">{relatedIcon(item.href)}</span><span><strong>{item.label}</strong><small>{item.body}</small></span><ArrowRight size={15} />
      </Link></Reveal>)}</div>
    </section>
    <CtaBlock title={page.cta.title} body={page.cta.body} onOpen={onOpen} art={d.ctaArt[0]} artRight={d.ctaArt[1]} />
  </div>}</SiteFrame>;
}
