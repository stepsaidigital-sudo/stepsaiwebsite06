'use client';
import Link from 'next/link';
import {
  ArrowRight, Bot, Calculator, CalendarCheck, CalendarDays, Check, CircleCheck, Globe, Headphones, Mail, MessageSquare, Phone,
  Search, Sparkles, Ticket, UserPlus, Webhook, Wrench, XCircle,
} from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { Reveal } from '@/components/sections';
import { SplitWords } from '@/components/site/motion';
import {
  Bubble, Capabilities, Card, Chip, CtaBlock, FaqBlock, Float, GoodToKnow, HeroScene, LivePhone, PhotoStory, PremiumHero, Row, StepBand,
  type Stage,
} from '@/components/premium/kit';
import { OtherAgents, handoffStory } from '@/components/templates/agent-page';
import type { FeaturePage } from '@/content/types';

import { asset } from '@/lib/asset';
// Agent skills, on the premium template. Copy comes from content/features/skills.json;
// mockups are illustrations with fictional sample data.

const logo = (slug: string, size = 16) => <img src={asset(`/brands/integrations/${slug}.svg`)} alt="" width={size} height={size} />;
const result = (icon: React.ReactNode, title: string, sub: string) => <div className="pp-result"><span>{icon}</span><div><strong>{title}</strong><small>{sub}</small></div></div>;

const cards = [
  <Card key="0" title="Book appointment" status={<Chip tone="soft">When to use</Chip>}>
    <div className="pp-rule"><p>Use when the customer wants to book or move a consultation, or asks which times are free.</p></div>
    <Row icon={<Check size={15} />} title="“Can I come in on Friday?”" sub="Use the skill" delay={200} />
    <Row icon={<XCircle size={15} />} title="“What are your prices?”" sub="Answer instead, do not book" delay={400} />
  </Card>,
  <Card key="1" title="Details to collect" status={<Chip>3 fields</Chip>}>
    <Row icon={<UserPlus size={15} />} title="Name" sub="Required" delay={200} />
    <Row icon={<Mail size={15} />} title="Email" sub="Required" picked delay={400} />
    <Row icon={<Phone size={15} />} title="Phone" sub="Optional" delay={600} />
  </Card>,
  <Card key="2" title="Calendar" status={<Chip tone="green"><Check size={11} />Connected</Chip>}>
    <Row icon={logo('google-calendar')} title="Google Calendar" sub="Used by this skill" picked delay={200} />
    <Row icon={logo('calendly')} title="Calendly" sub="Available" delay={400} />
    <Row icon={logo('cal-com')} title="Cal.com" sub="Available" delay={600} />
  </Card>,
  <Card key="3" title="After the booking" status={<Chip tone="soft">Then</Chip>}>
    <Row icon={<UserPlus size={15} />} title="Save to your CRM" sub="Contact and booking" delay={200} />
    <Row icon={<Mail size={15} />} title="Email the front desk" sub="New booking alert" delay={400} />
    <Row icon={<Webhook size={15} />} title="Send to your own tool" sub="Webhook or HTTP request" picked delay={600} />
  </Card>,
];

const sides = [
  [{ who: 'customer', text: 'Can I book a consultation for Friday?' }, { who: 'agent', text: 'Happy to help you book. Friday has 11:00 or 4:30 free.' }],
  [{ who: 'customer', text: '4:30 works.' }, { who: 'agent', text: 'Lovely. May I have your name and email?' }],
  [{ who: 'customer', text: 'Priya, priya.nair@gmail.com' }, { who: 'agent', text: 'You are booked for Friday at 4:30. See you then.' }],
  [{ who: 'customer', text: 'Thank you!' }, { who: 'agent', text: 'You will get a confirmation shortly.' }],
] as const;
const results = ['Skill matched', 'Details collected', 'Added to Google Calendar', 'Saved and team notified'];

const capIcons: [React.ReactNode, string][] = [
  [<CalendarCheck key="a" size={20} />, 'green'], [<Ticket key="b" size={20} />, 'amber'], [<UserPlus key="c" size={20} />, 'blue'],
  [<Headphones key="d" size={20} />, 'violet'], [<Search key="e" size={20} />, 'teal'], [<Calculator key="f" size={20} />, 'rose'], [<Wrench key="g" size={20} />, 'blue'],
];

export function SkillsPageTemplate({ page }: { page: FeaturePage }) {
  const checks = (page.hero.reassurance ?? '').split('. ').map(s => s.replace(/\.$/, '')).filter(Boolean);
  const stages: Stage[] = page.steps.items.map((step, i) => ({
    pill: `Step ${i + 1} · ${step.title.split(' ').slice(0, 2).join(' ')}`, title: step.title, body: step.body, card: cards[i],
    side: <div className="wb-chat">
      {sides[i].map((line, j) => <Bubble key={j} who={line.who} delay={300 + j * 1000}>{line.text}</Bubble>)}
      <div className="pp-step-result" style={{ animationDelay: '2200ms' }}><CircleCheck size={14} />{results[i]}</div>
    </div>,
  }));
  return <SiteFrame>{onOpen => <div className="wb pp">
    <PremiumHero kicker={page.hero.kicker} icon={<Sparkles size={16} />} title={page.hero.title} accent={['finish the job']} body={page.hero.body} checks={checks} onOpen={onOpen} demoLabel="See how a skill works"
      visual={<HeroScene photo={asset("/images/features/skills/appointment-setup.webp")} alt="A calendar workstation prepared for appointment booking">
        <LivePhone kind="Website" business="City Care Clinic" className="pp-hero-phone" period={13000} lines={[
          { from: 'customer', text: 'Can I book a consultation for Friday?', at: 400 },
          { from: 'agent', text: 'Friday has 11:00 or 4:30 free. Which suits you?', at: 2400 },
          { from: 'customer', text: '4:30, I am Priya.', at: 5000 },
          { from: 'agent', text: 'You are booked for Friday at 4:30, Priya.', at: 7200 },
        ]} />
        <Float className="pp-pos-tr"><div className="pp-float-head"><Sparkles size={14} />Skills on this agent</div>
          <div className="pp-skill-list"><span className="is-on"><CalendarDays size={13} />Book appointment</span><span className="is-on"><Ticket size={13} />Create ticket</span><span className="is-on"><UserPlus size={13} />Save lead</span><span><Globe size={13} />Search the web</span></div>
        </Float>
        <Float className="pp-pos-br">{result(<CalendarCheck size={16} />, 'Skill used: Book appointment', 'Added to Google Calendar')}</Float>
        <span className="pp-bubble-logo pp-pos-logo"><Bot size={26} /></span>
      </HeroScene>} />

    <section id="how" className="container pp-head pp-walk-head"><span className="wb-eyebrow">How it works</span><h2>{page.steps.title}</h2><p>{page.steps.intro}</p></section>
    <StepBand stages={stages} cta={{ label: 'Connect your calendar', icon: logo('google-calendar', 22) }} onOpen={onOpen} label="How a skill works" />
    <Capabilities title={page.features.title} intro={page.features.intro} items={page.features.items} icons={capIcons} />

    <PhotoStory id="custom-skills" eyebrow="Custom skills" title="Teach your agent a job that is yours alone."
      body="When the ready-made skills do not cover it, build your own: an AI skill with your own instructions, or a flow skill that collects details and calls an app or a webhook."
      points={['Write when to use it in plain English', 'Collect exactly the fields you need', 'Send the result to an app, a webhook or an HTTP request']}
      photo={asset("/images/features/skills/warranty-workflow.webp")} alt="Hands preparing a product warranty claim"
      overlay={<Card title="Flow skill · Warranty claim" status={<Chip tone="green"><Check size={11} />Active</Chip>}>
        <Row icon={<MessageSquare size={15} />} title="When to use" sub="Customer reports a fault in warranty" delay={200} />
        <Row icon={<UserPlus size={15} />} title="Collect" sub="Order number, photo, email" delay={400} />
        <Row icon={<Webhook size={15} />} title="Then" sub="Send to your service desk" picked delay={600} />
      </Card>} />
    {handoffStory({ customer: 'Priya Nair', ask: 'I would rather talk to someone, please.', agentLine: 'No problem, I am handing you to our team now.', team: 'Hi Priya, Alex here. How can I help?' }, true, asset('/images/features/skills/specialist-handoff.webp'))}

    <GoodToKnow title={page.goodToKnow.title} items={page.goodToKnow.items} />
    <FaqBlock title={page.faq.title} items={page.faq.items} />

    <section className="container wb-split wb-related">
      <div className="wb-split-copy"><h2 aria-label={page.related.title}><SplitWords text={page.related.title} /></h2>{page.related.intro && <p>{page.related.intro}</p>}</div>
      <div className="wb-related-cards">{page.related.items.map(item => <Reveal key={item.label}><Link className="wb-related-card" href={item.href}>
        <span className="wb-related-logo pp-related-ico">{item.href.includes('integrations') ? <Webhook size={20} /> : item.href.includes('crm') ? <UserPlus size={20} /> : <Sparkles size={20} />}</span>
        <span><strong>{item.label}</strong><small>{item.body}</small></span><ArrowRight size={15} />
      </Link></Reveal>)}</div>
    </section>

    <OtherAgents current="" title="Skills power every agent." />
    <CtaBlock title={page.cta.title} body={page.cta.body} onOpen={onOpen}
      art={<div className="pp-cta-stack"><Float>{result(<MessageSquare size={15} />, 'Skill matched', 'From your rule')}</Float><Float>{result(<UserPlus size={15} />, 'Details collected', 'Name and email')}</Float></div>}
      artRight={<div className="pp-cta-stack"><Float>{result(<CalendarCheck size={15} />, 'Booked', 'Google Calendar')}</Float><Float>{result(<Webhook size={15} />, 'Sent on', 'To your own tool')}</Float></div>} />
  </div>}</SiteFrame>;
}
