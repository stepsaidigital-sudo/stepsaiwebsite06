'use client';
import { IllustratedFace as Face } from '@/components/site/illustrated-profile';
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight, BadgeCheck, BarChart3, Bot, CalendarDays, Check, CircleCheck, Clock, Copy, Filter, Flame, GitBranch, Globe, Hand, Inbox, LayoutTemplate,
  ListFilter, Mail, MapPin, MessageSquare, Play, RefreshCw, Save, ShoppingCart, Smartphone, Sparkles, Star, StickyNote, Tag, Ticket, TrendingUp,
  UserPlus, UserRound, Users, Webhook, Workflow, Zap,
} from 'lucide-react';
import { ChannelLogo } from '@/app/channel-chat';
import { SiteFrame } from '@/components/site/shell';
import { Reveal } from '@/components/sections';
import { SplitWords } from '@/components/site/motion';
import { Accent, Capabilities, Card, Chip, CtaBlock, FaqBlock, Float, GoodToKnow, PhotoStory, Row, StepBand, type Stage } from '@/components/premium/kit';
import { AnalyticsMock, ScaleBox } from '@/components/premium/analytics-mock';
import { CrmMock, InboxMock, WorkflowMock } from '@/components/premium/app-mocks';
import type { FeaturePage } from '@/content/types';

import { asset } from '@/lib/asset';
import { WorkflowTemplateLibrary } from '@/components/premium/workflow-template-library';
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

const ch = (c: string) => <span className="pp-ch-ico"><ChannelLogo channel={c} /></span>;
const bars = (label: string, rows: [string, number][]) => <div className="wb-report"><small>{label}</small>{rows.map(([d, w], i) => <div key={d} className="wb-bar pp-bar-wide"><span>{d}</span><i style={{ ['--w' as string]: `${w}%`, animationDelay: `${200 + i * 150}ms` }} /></div>)}</div>;
const results = (...items: [ReactNode, string][]) => <div className="wb-chat">{items.map(([icon, text], i) => <div key={text} className="pp-step-result" style={{ animationDelay: `${300 + i * 500}ms` }}>{icon}{text}</div>)}</div>;

type Design = {
  icon: ReactNode; hero: ReactNode; cards: ReactNode[]; sides: ReactNode[]; bandCta: { label: string; icon: ReactNode };
  capIcons: [ReactNode, string][]; stories: ReactNode[]; ctaArt: [ReactNode, ReactNode];
};

const designs: Record<string, Design> = {
  analytics: {
    icon: <BarChart3 size={16} />,
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
        photo={asset("/images/features/analytics/customer-question-analysis.webp")} alt="A tablet and notes for reviewing customer questions"
        overlay={<Card title="Top questions" status={<Chip>Last 30 days</Chip>}>
          {[['Where is my order?', '34%'], ['Which size should I pick?', '22%'], ['How do returns work?', '15%'], ['Is COD available?', '11%']].map(([q, v], i) => <Row key={q} icon={<MessageSquare size={15} />} title={q} end={<Chip tone={i === 0 ? 'soft' : 'plain'}>{v}</Chip>} picked={i === 0} delay={200 + i * 150} />)}
        </Card>} />,
    ],
    ctaArt: [stack(result(<MessageSquare size={15} />, '612 chats', 'This week'), result(<Clock size={15} />, '2.2 sec', 'Average AI response')), stack(result(<Flame size={15} />, 'Busiest at 9 PM', 'From the heat map'), result(<UserPlus size={15} />, '74 leads', 'By topic and source'))],
  },

  'unified-inbox': {
    icon: <Inbox size={16} />,
    hero: <ScaleBox width={1000}><InboxMock /></ScaleBox>,
    cards: [
      <Card key="0" title="New conversations" status={<Chip tone="green">4 channels</Chip>}>
        <Row icon={ch('WhatsApp')} title="Anu · Damaged order" sub="Support desk" picked delay={200} />
        <Row icon={ch('Instagram')} title="Rahul · Back in stock?" sub="Sales assistant" delay={350} />
        <Row icon={ch('Website')} title="Meera · Bulk order" sub="Sales assistant" delay={500} />
        <Row icon={ch('Messenger')} title="Karan · Shipping to Pune" sub="Support desk" delay={650} />
      </Card>,
      <Card key="1" title="Filters" status={<Chip>1 needs you</Chip>}>
        <div className="pp-slots pp-slots-card"><span>All</span><span>Unread</span><span>Starred</span><span className="is-picked">Live <Check size={11} /></span></div>
        <Row icon={<Filter size={15} />} title="Channel" sub="All channels" delay={300} />
        <Row icon={<Bot size={15} />} title="Agent" sub="Support desk" picked delay={450} />
      </Card>,
      <Card key="2" title="Live request" status={<Chip tone="soft"><Hand size={11} />Wants a person</Chip>}>
        <Row icon={ch('WhatsApp')} title="Anu Sharma" sub="“Can I speak to someone?”" picked delay={200} />
        <div className="pp-step-result" style={{ animationDelay: '600ms' }}><Hand size={14} />Claimed by Ananya</div>
      </Card>,
      <Card key="3" title="Handoff" status={<Chip tone="green"><Check size={11} />Resolved</Chip>}>
        <Row icon={<span className="wb-avatar wb-mini"><Face name="Ananya" initials="A" /></span>} title="Ananya replied" sub="Same WhatsApp thread" delay={200} />
        <Row icon={<CircleCheck size={15} />} title="Handoff resolved" sub="Kept in the inbox" picked delay={400} />
      </Card>,
    ],
    sides: [
      results([ch('WhatsApp'), 'WhatsApp · Support desk'], [ch('Instagram'), 'Instagram · Sales assistant']),
      bars('Needs attention', [['Live', 20], ['Unread', 40], ['Starred', 30]]),
      results([<Hand key="a" size={14} />, 'Customer asked for a person'], [<span key="b" className="wb-avatar wb-mini"><Face name="Ananya" initials="A" /></span>, 'Ananya took over']),
      results([<MessageSquare key="a" size={14} />, 'Replacement ships today'], [<Check key="b" size={14} />, 'Customer said thank you']),
    ],
    bandCta: { label: 'See the inbox in a demo', icon: <Inbox size={18} /> },
    capIcons: [[<Users key="a" size={20} />, 'blue'], [<Filter key="b" size={20} />, 'violet'], [<Star key="c" size={20} />, 'blue'], [<Hand key="d" size={20} />, 'violet'], [<UserRound key="e" size={20} />, 'blue'], [<Smartphone key="f" size={20} />, 'violet']],
    stories: [
      <PhotoStory key="team" id="team" eyebrow="Your team" title="Step in only when it matters."
        body="The agent answers first. Your team sees who needs a person and picks up the thread with the full history."
        points={['Live requests stand out in the list', 'Claim once, so nobody answers twice', 'Customer details beside every chat']}
        photo={asset("/images/features/unified-inbox/support-desk.webp")} alt="An unattended support desk ready to resolve customer conversations"
        overlay={<Card title="Needs a person" status={<Chip tone="soft">Live</Chip>}>
          <Row icon={ch('WhatsApp')} title="Anu Sharma" sub="Damaged order" picked delay={200} />
          <Row icon={ch('Website')} title="Meera Iyer" sub="Bulk order quote" delay={350} />
          <Row icon={ch('Instagram')} title="Rahul Verma" sub="Size exchange" delay={500} />
        </Card>} />,
    ],
    ctaArt: [stack(result(<Inbox size={15} />, 'One inbox', 'Every channel and agent'), result(<Hand size={15} />, 'Live requests', 'Claimed in one click')), stack(result(<UserRound size={15} />, 'Full history', 'Before your team replies'), result(<Smartphone size={15} />, 'On mobile', 'Reply from your phone'))],
  },

  crm: {
    icon: <Users size={16} />,
    hero: <ScaleBox width={1000}><CrmMock /></ScaleBox>,
    cards: [
      <Card key="0" title="Details collected" status={<Chip>In the chat</Chip>}>
        <Row icon={<UserRound size={15} />} title="Name" sub="Anu Sharma" end={<Check size={15} className="pp-ok" />} delay={200} />
        <Row icon={<Mail size={15} />} title="Email" sub="anu.s@mail.com" end={<Check size={15} className="pp-ok" />} delay={400} />
        <Row icon={<Smartphone size={15} />} title="Phone" sub="+91 98••• ••210" end={<Check size={15} className="pp-ok" />} picked delay={600} />
      </Card>,
      <Card key="1" title="Customer record" status={<Chip tone="green"><BadgeCheck size={11} />Phone verified</Chip>}>
        <Row icon={ch('WhatsApp')} title="Source" sub="WhatsApp" delay={200} />
        <Row icon={<Bot size={15} />} title="Agent" sub="Support desk" delay={350} />
        <Row icon={<Copy size={15} />} title="Duplicates" sub="Merged automatically" picked delay={500} />
      </Card>,
      <Card key="2" title="Linked to Anu" status={<Chip>2 items</Chip>}>
        <Row icon={<Ticket size={15} />} title="Ticket #T-208" sub="Damaged item" end={<Chip tone="soft">Open</Chip>} picked delay={200} />
        <Row icon={<Hand size={15} />} title="Live request" sub="Wants a person" end={<Chip>Waiting</Chip>} delay={400} />
      </Card>,
      <Card key="3" title="Saved views" status={<Chip>3 views</Chip>}>
        <Row icon={<Star size={15} />} title="New this week" sub="Sorted by date" picked delay={200} />
        <Row icon={<Star size={15} />} title="WhatsApp leads" sub="Source is WhatsApp" delay={350} />
        <Row icon={<Star size={15} />} title="Open tickets" sub="Status is open" delay={500} />
      </Card>,
    ],
    sides: [
      results([<MessageSquare key="a" size={14} />, 'Agent asked for an email'], [<Check key="b" size={14} />, 'Details saved to the record']),
      results([<UserPlus key="a" size={14} />, 'New customer · Anu Sharma'], [<BadgeCheck key="b" size={14} />, 'Phone verified']),
      bars('Tickets this week', [['Open', 35], ['Pending', 22], ['Solved', 78]]),
      bars('Customers by source', [['WhatsApp', 82], ['Website', 64], ['Instagram', 41], ['Messenger', 12]]),
    ],
    bandCta: { label: 'See the CRM in a demo', icon: <Users size={18} /> },
    capIcons: [[<LayoutTemplate key="a" size={20} />, 'blue'], [<Tag key="b" size={20} />, 'violet'], [<Save key="c" size={20} />, 'blue'], [<StickyNote key="d" size={20} />, 'violet'], [<ListFilter key="e" size={20} />, 'blue'], [<BadgeCheck key="f" size={20} />, 'violet'], [<RefreshCw key="g" size={20} />, 'blue']],
    stories: [
      <PhotoStory key="records" id="records" eyebrow="Records" title="Know who you are talking to."
        body="Every chat can add to a customer record, so the next conversation starts with the full picture."
        points={['Fields you choose, filled from the chat', 'Notes and activity on every record', 'HubSpot if your team already uses it']}
        photo={asset("/images/features/crm/customer-records.webp")} alt="Hands checking customer order records in a clothing studio"
        reverse tint="warm"
        overlay={<Card title="Anu Sharma" status={<Chip tone="green"><BadgeCheck size={11} />Verified</Chip>}>
          <Row icon={ch('WhatsApp')} title="Came from WhatsApp" sub="Support desk" delay={200} />
          <Row icon={<Ticket size={15} />} title="Ticket #T-208" sub="Open" delay={350} />
          <Row icon={<StickyNote size={15} />} title="Note" sub="Send replacement today" picked delay={500} />
        </Card>} />,
    ],
    ctaArt: [stack(result(<UserPlus size={15} />, 'Records build themselves', 'From every chat'), result(<Ticket size={15} />, 'Tickets and live requests', 'Next to the customer')), stack(result(<Save size={15} />, 'Saved views', 'Back to the same list'), result(<BadgeCheck size={15} />, 'No duplicates', 'Merged automatically'))],
  },

  'workflow-builder': {
    icon: <Workflow size={16} />,
    hero: <ScaleBox width={1000}><WorkflowMock /></ScaleBox>,
    cards: [
      <Card key="0" title="Templates" status={<Chip>Ready-made</Chip>}>
        <Row icon={<ShoppingCart size={15} />} title="Cart recovery" sub="Shopify" picked delay={200} />
        <Row icon={<Check size={15} />} title="COD confirmation" sub="Shopify" delay={350} />
        <Row icon={<Star size={15} />} title="Review request" sub="After delivery" delay={500} />
        <Row icon={<RefreshCw size={15} />} title="Win-back" sub="Quiet customers" delay={650} />
      </Card>,
      <Card key="1" title="Trigger" status={<Chip>Starts the workflow</Chip>}>
        <div className="pp-slots pp-slots-card"><span>Message</span><span>Schedule</span><span>Form</span><span>Webhook</span><span className="is-picked">Shopify event <Check size={11} /></span></div>
        <Row icon={<ShoppingCart size={15} />} title="Checkout abandoned" sub="From your Shopify store" picked delay={400} />
      </Card>,
      <Card key="2" title="Steps" status={<Chip>From menus</Chip>}>
        <Row icon={<Clock size={15} />} title="Wait" sub="1 hour" delay={200} />
        <Row icon={<GitBranch size={15} />} title="Condition" sub="Order completed?" delay={350} />
        <Row icon={ch('WhatsApp')} title="WhatsApp message" sub="Approved template" picked delay={500} />
        <Row icon={<Mail size={15} />} title="Email" sub="On error: retry" delay={650} />
      </Card>,
      <Card key="3" title="Cart recovery" status={<Chip tone="green"><Zap size={11} />Active</Chip>}>
        <Row icon={<Play size={15} />} title="Shopper #4412" sub="Running · Step 3" delay={200} />
        <Row icon={<Check size={15} />} title="Shopper #4409" sub="Recovered" picked delay={350} />
        <Row icon={<Check size={15} />} title="Shopper #4405" sub="Recovered" delay={500} />
      </Card>,
    ],
    sides: [
      results([<LayoutTemplate key="a" size={14} />, 'Template loaded'], [<Workflow key="b" size={14} />, 'Steps ready to edit']),
      results([<Webhook key="a" size={14} />, 'Listening for checkouts'], [<ShoppingCart key="b" size={14} />, 'Checkout abandoned · ₹1,480']),
      results([<Clock key="a" size={14} />, 'Waited 1 hour'], [<GitBranch key="b" size={14} />, 'Not ordered · send reminder']),
      bars('Runs this week', [['Recovered', 64], ['Running', 22], ['Skipped', 14]]),
    ],
    bandCta: { label: 'See workflows in a demo', icon: <Workflow size={18} /> },
    capIcons: [[<ShoppingCart key="a" size={20} />, 'blue'], [<Check key="b" size={20} />, 'violet'], [<MessageSquare key="c" size={20} />, 'blue'], [<RefreshCw key="d" size={20} />, 'violet'], [<Zap key="e" size={20} />, 'blue'], [<GitBranch key="f" size={20} />, 'violet'], [<Clock key="g" size={20} />, 'blue'], [<LayoutTemplate key="h" size={20} />, 'violet']],
    stories: [
      <PhotoStory key="followups" id="followups" eyebrow="Follow-ups" title="The follow-ups happen while you pack orders."
        body="Cart reminders, COD checks and review requests go out on time, without anyone on your team remembering to send them."
        points={['Ready-made templates for Shopify stores', 'WhatsApp, website messages and email', 'Run history for every workflow']}
        photo={asset("/images/features/workflow-builder/order-follow-up.webp")} alt="Hands packing an order ready for an automated follow-up"
        overlay={<Card title="This month" status={<Chip tone="green">Automated</Chip>}>
          <Row icon={<ShoppingCart size={15} />} title="14 checkouts recovered" sub="Cart recovery" picked delay={200} />
          <Row icon={<Check size={15} />} title="COD orders confirmed" sub="COD confirmation" delay={350} />
          <Row icon={<Star size={15} />} title="Review requests sent" sub="After delivery" delay={500} />
        </Card>} />,
    ],
    ctaArt: [stack(result(<LayoutTemplate size={15} />, 'Start from a template', 'Cart, COD, reviews'), result(<Workflow size={15} />, 'Menus, not code', 'Wait, check, send')), stack(result(<Zap size={15} />, 'Drafts until you say so', 'Switch on when ready'), result(<Play size={15} />, 'Run history', 'See every run'))],
  },
};

export const builtFeaturePages = Object.keys(designs);

const relatedIcon = (href: string) => href.includes('crm') ? <Users size={20} /> : href.includes('inbox') ? <Inbox size={20} /> : href.includes('broadcast') ? <ChannelLogo channel="WhatsApp" /> : href.includes('analytics') ? <BarChart3 size={20} /> : <Sparkles size={20} />;

export function FeaturePageTemplate({ page }: { page: FeaturePage }) {
  const d = designs[page.slug];
  const checks = (page.hero.reassurance ?? '').split('. ').map(s => s.replace(/\.$/, '')).filter(Boolean);
  const stages: Stage[] = page.steps.items.map((step, i) => ({ pill: `Step ${i + 1} of ${page.steps.items.length}`, title: step.title, body: step.body, card: d.cards[i], side: d.sides[i] }));
  return <SiteFrame>{onOpen => <div className="wb pp">
    <section className="wb-hero pp-hero pp-hero-wide">
      <div className="container">
        <div className="pp-wide-copy">
          <div className="wb-kicker pp-kicker"><span className="pp-kicker-ico">{d.icon}</span>{page.hero.kicker}</div>
          <h1><Accent text={page.hero.title} accent={page.hero.accent ?? []} /></h1>
          <p className="wb-lead">{page.hero.body}</p>
          <div className="wb-actions">
            <button className="wb-btn" onClick={() => onOpen('Book a demo')}>Book a demo <ArrowRight size={16} /></button>
            <a className="wb-btn-ghost" href="#how"><span><Play size={11} fill="currentColor" /></span>See how it works</a>
            {page.slug === 'workflow-builder' && <a className="wb-btn-ghost" href="#workflow-templates">Browse templates <ArrowRight size={16} /></a>}
          </div>
          <ul className="wb-checks">{checks.map(c => <li key={c}><CircleCheck size={15} />{c}</li>)}</ul>
        </div>
        <div className="pp-wide-visual">{d.hero}</div>
      </div>
    </section>
    <section id="how" className="container pp-head pp-walk-head"><span className="wb-eyebrow">How it works</span><h2>{page.steps.title}</h2><p>{page.steps.intro}</p></section>
    <StepBand stages={stages} cta={d.bandCta} onOpen={onOpen} label={page.steps.title} />
    <Capabilities title={page.features.title} intro={page.features.intro} items={page.features.items} icons={d.capIcons} />
    {page.slug === 'workflow-builder' && <WorkflowTemplateLibrary />}
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
