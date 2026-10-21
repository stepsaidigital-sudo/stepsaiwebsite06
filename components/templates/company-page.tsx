'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight, BadgeCheck, Ban, Bot, Briefcase, Building2, CalendarCheck, Check, CircleCheck, Clock, Code2, CreditCard, Database, Download,
  FileText, Globe, GraduationCap, Hand, Handshake, HeadphonesIcon, KeyRound, Landmark, LifeBuoy, Lock, Mail, MessageSquare, PackageCheck,
  PenLine, Rocket, Send, ShieldCheck, ShoppingBag, Sparkles, Stethoscope, Trash2, UserRound, Users, X, Zap,
} from 'lucide-react';
import { ChannelLogo } from '@/app/channel-chat';
import { SiteFrame } from '@/components/site/shell';
import { Reveal } from '@/components/sections';
import { SplitWords } from '@/components/site/motion';
import { CtaBlock, Float } from '@/components/premium/kit';
import { AiImage } from '@/components/premium/ai-image';
import type { ContentPage } from '@/content/types';

// Company and legal pages on the premium look. Copy comes from content/pages/*.json; the visuals
// only restate what that copy says. Photos of real people are never generated: those slots ask
// for a real photo. Mood photos use AI image slots.

type Open = (label: string) => void;
const S = (page: ContentPage, i: number) => page.sections[i] ?? { title: '', paragraphs: [] as string[], items: [] };

function Hero({ page, icon, visual, onOpen, actions, centered = false }: { page: ContentPage; icon: ReactNode; visual?: ReactNode; onOpen: Open; actions?: ReactNode; centered?: boolean }) {
  return <section className={`wb-hero pp-hero co-hero ${centered ? 'is-centered' : ''}`}><div className="container co-hero-inner">
    <div className="co-hero-copy">
      <div className="wb-kicker pp-kicker"><span className="pp-kicker-ico">{icon}</span>{page.hero.kicker}</div>
      <h1>{page.hero.title}</h1>
      <p className="wb-lead">{page.hero.body}</p>
      <div className="wb-actions">{actions ?? <button className="wb-btn" onClick={() => onOpen('Book a demo')}>Book a demo <ArrowRight size={16} /></button>}</div>
    </div>
    {visual && <div className="co-hero-visual">{visual}</div>}
  </div></section>;
}

function Head({ eyebrow, title, intro, center = false }: { eyebrow: string; title: string; intro?: string; center?: boolean }) {
  return <div className={`co-head ${center ? 'is-center' : ''}`}><span className="wb-eyebrow">{eyebrow}</span><h2 aria-label={title}><SplitWords text={title} /></h2>{intro && <p>{intro}</p>}</div>;
}

const result = (icon: ReactNode, title: string, sub: string) => <div className="pp-result"><span>{icon}</span><div><strong>{title}</strong><small>{sub}</small></div></div>;
const stack = (...items: ReactNode[]) => <div className="pp-cta-stack">{items.map((item, i) => <Float key={i}>{item}</Float>)}</div>;

function Partners() {
  return <div className="co-partners">
    <span><BadgeCheck size={16} className="co-ok" />Meta Business Partner</span>
    <span><img src="/brands/integrations/shopify.svg" alt="" width={18} height={18} />Shopify Partner</span>
  </div>;
}

// A real person's photo goes here; it is never generated.
function RealPhoto({ src, alt, note }: { src: string; alt: string; note: string }) {
  // Until the real portrait is added, show the founder's initials in the same frame.
  const initials = alt.split(',')[0].split(' ').map(w => w[0]).join('').slice(0, 2);
  return <AiImage className="co-portrait" src={src} alt={alt} prompt={note} real
    fallback={<div className="co-portrait co-monogram" role="img" aria-label={alt}><span>{initials}</span></div>} />;
}

/* ---------------- About ---------------- */

function ChatCard({ channel, q, a, action, icon, className = '' }: { channel: string; q: string; a: string; action: string; icon: ReactNode; className?: string }) {
  return <div className={`co-chat ${className}`}>
    <div className="co-chat-head"><ChannelLogo channel={channel} /><strong>{channel}</strong><small>now</small></div>
    <p className="co-q">{q}</p><p className="co-a">{a}</p>
    <span className="co-action">{icon}{action}</span>
  </div>;
}

function About({ page, onOpen }: { page: ContentPage; onOpen: Open }) {
  const why = S(page, 0), beliefs = S(page, 1), who = S(page, 2);
  const minis = [
    <div key="0" className="co-mini"><div className="co-mini-src"><span><Globe size={13} />Website</span><span><FileText size={13} />Documents</span><span><img src="/brands/integrations/shopify.svg" alt="" width={13} height={13} />Shopify</span></div><ArrowRight size={16} className="co-mini-arrow" /><p className="co-a">Order 1042 shipped yesterday.</p></div>,
    <div key="1" className="co-mini"><p className="co-a">The linen shirt in M is in stock.</p><span className="co-action"><ShoppingBag size={13} />Checkout link sent</span></div>,
    <div key="2" className="co-mini"><div className="co-toggle"><i />Agent can reply</div><span className="co-action is-team"><Hand size={13} />Ananya took over</span></div>,
  ];
  const tiles: [ReactNode, string][] = [[<ShoppingBag key="a" size={22} />, 'Online stores'], [<Stethoscope key="b" size={22} />, 'Clinics'], [<GraduationCap key="c" size={22} />, 'Schools'], [<Building2 key="d" size={22} />, 'Property teams'], [<Briefcase key="e" size={22} />, 'Service businesses']];
  return <>
    <Hero page={page} icon={<Sparkles size={16} />} onOpen={onOpen} visual={<div className="co-stage">
      <ChatCard className="co-f1" channel="WhatsApp" q="Where is my order 1042?" a="It shipped yesterday and arrives Friday." action="Order checked" icon={<PackageCheck size={13} />} />
      <ChatCard className="co-f2" channel="Instagram" q="Can I book a facial on Saturday?" a="Saturday 11:00 is free. Shall I book it?" action="Booking confirmed" icon={<CalendarCheck size={13} />} />
      <ChatCard className="co-f3" channel="Website" q="Can I speak to someone?" a="Of course. Connecting you to our team now." action="Handed to your team" icon={<Hand size={13} />} />
      <Partners />
    </div>} />

    <section className="container co-why">
      <Reveal className="co-why-copy"><span className="wb-eyebrow">{why.title.replace(/\.$/, '')}</span><blockquote>{why.paragraphs[0]}</blockquote><p>{why.paragraphs[1]}</p></Reveal>
      <Reveal className="co-gap" aria-hidden="true">
        <div className="co-gap-row is-bad"><small>Without an agent</small><div className="co-gap-line"><span className="co-q">Do you ship to Pune?</span><i /><span className="co-gap-tag"><Clock size={12} />No reply for 9 hours</span></div><b><X size={13} />Customer bought elsewhere</b></div>
        <div className="co-gap-row is-good"><small>With Steps AI</small><div className="co-gap-line"><span className="co-q">Do you ship to Pune?</span><i /><span className="co-gap-tag"><Zap size={12} />Answered in seconds</span></div><b><Check size={13} />Order placed</b></div>
      </Reveal>
    </section>

    <section className="co-band"><div className="container">
      <Head eyebrow="What we believe" title={beliefs.title} intro={beliefs.paragraphs[0]} center />
      <div className="co-beliefs">{(beliefs.items ?? []).map((item, i) => <Reveal key={item.title} className="co-belief"><span className="co-num">0{i + 1}</span>{minis[i]}<h3>{item.title}</h3><p>{item.body}</p></Reveal>)}</div>
    </div></section>

    <section className="container co-who">
      <Head eyebrow="Who it is for" title={who.title} intro={who.paragraphs[0]} />
      <div className="co-tiles">{tiles.map(([icon, label]) => <Reveal key={label} className="co-tile"><span>{icon}</span>{label}</Reveal>)}</div>
      <Reveal className="co-who-foot"><span className="co-pill"><Landmark size={14} />Most of our customers are in India</span><Partners /></Reveal>
    </section>
    <CtaBlock title={page.cta.title} body={page.cta.body} action={page.cta.action} onOpen={onOpen} art={stack(result(<MessageSquare size={15} />, 'Real answers', 'From your own information'), result(<Zap size={15} />, 'Real actions', 'Orders, bookings, handovers'))} artRight={stack(result(<Hand size={15} />, 'Your team in control', 'Step in any time'), result(<BadgeCheck size={15} />, 'Meta and Shopify', 'Partner'))} />
  </>;
}

/* ---------------- Founder's note ---------------- */

function FoundersNote({ page, onOpen }: { page: ContentPage; onOpen: Open }) {
  const why = S(page, 0), never = S(page, 1);
  const icons = [<Database key="a" size={20} />, <Hand key="b" size={20} />, <CreditCard key="c" size={20} />];
  return <>
    <Hero page={page} icon={<PenLine size={16} />} onOpen={onOpen} visual={<div className="co-founder-visual">
      <RealPhoto src="/photos/team/reshmanth.jpg" alt="Reshmanth Jonnalagadda, founder of Steps AI" note="Real photo needed: a warm, natural portrait of Reshmanth Jonnalagadda (4:5, soft daylight, plain light background). Please use a real photo, not an AI image." />
      <Float className="co-sign-card"><strong>Reshmanth Jonnalagadda</strong><small>Founder, Steps AI · 2024</small></Float>
    </div>} />
    <section className="container co-letter-wrap"><Reveal className="co-letter">
      <span className="wb-eyebrow">{why.title.replace(/\.$/, '')}</span>
      {why.paragraphs.map((p, i) => <p key={i} className={i === 0 ? 'co-dropcap' : ''}>{p}</p>)}
      <div className="co-chatbot-vs" aria-hidden="true">
        <div><small>Old chatbot</small><p className="co-q">Where is my parcel?</p><p className="co-a is-bad">Our return policy allows returns within 7 days…</p></div>
        <div><small>Steps AI</small><p className="co-q">Where is my parcel?</p><p className="co-a">It is out for delivery and arrives today.</p><span className="co-action"><PackageCheck size={13} />Order checked</span></div>
      </div>
      <div className="co-signoff"><span>Reshmanth</span><small>Founder, Steps AI</small></div>
    </Reveal></section>
    <section className="co-band"><div className="container">
      <Head eyebrow="Principles" title={never.title} center />
      <div className="co-principles">{(never.items ?? []).map((item, i) => <Reveal key={item.title} className="co-principle"><span className="co-principle-ico">{icons[i]}</span><span className="co-num">0{i + 1}</span><h3>{item.title}</h3><p>{item.body}</p></Reveal>)}</div>
    </div></section>
    <CtaBlock title={page.cta.title} body={page.cta.body} action={page.cta.action} onOpen={onOpen} art={stack(result(<Database size={15} />, 'Real answers', 'Looked up, not guessed'))} artRight={stack(result(<Hand size={15} />, 'Knows when to stop', 'Passes to a person'))} />
  </>;
}

/* ---------------- Careers ---------------- */

function Careers({ page, onOpen }: { page: ContentPage; onOpen: Open }) {
  const roles = S(page, 0), how = S(page, 1);
  const icons = [<Users key="a" size={20} />, <MessageSquare key="b" size={20} />, <Rocket key="c" size={20} />];
  return <>
    <Hero page={page} icon={<Rocket size={16} />} onOpen={onOpen}
      actions={<><button className="wb-btn" onClick={() => onOpen('Send us a note')}>Send us a note <ArrowRight size={16} /></button><a className="wb-btn-ghost" href="#how-we-work">How we work</a></>}
      visual={<div className="co-photo-visual">
        <img className="co-photo" src="/photos/careers-team.jpg" alt="Two colleagues planning work together at a laptop" width={1400} height={933} decoding="async" />
        <Float className="co-float co-float-a">{result(<Sparkles size={15} />, 'Built from a customer request', 'Shipment landed cost calculator')}</Float>
        <Float className="co-float co-float-b">{result(<Rocket size={15} />, 'Everyone ships', 'Work customers use')}</Float>
      </div>} />
    <section className="container co-roles"><Reveal className="co-empty">
      <span className="co-empty-ico"><Briefcase size={26} /></span>
      <div><h2>{roles.title}</h2><p>{roles.paragraphs[0]}</p></div>
      <button className="wb-btn wb-btn-navy" onClick={() => onOpen('Send us a note')}>Send us a note <Send size={15} /></button>
    </Reveal></section>
    <section id="how-we-work" className="co-band"><div className="container">
      <Head eyebrow="Culture" title={how.title} center />
      <div className="co-principles">{(how.items ?? []).map((item, i) => <Reveal key={item.title} className="co-principle"><span className="co-principle-ico">{icons[i]}</span><h3>{item.title}</h3><p>{item.body}</p></Reveal>)}</div>
    </div></section>
    <CtaBlock title={page.cta.title} body={page.cta.body} action={page.cta.action} onOpen={onOpen} art={stack(result(<Users size={15} />, 'Close to customers', 'Ideas start with them'))} artRight={stack(result(<Rocket size={15} />, 'Real ownership', 'Small team'))} />
  </>;
}

/* ---------------- Team ---------------- */

function Team({ page, onOpen }: { page: ContentPage; onOpen: Open }) {
  const founder = (S(page, 0).items ?? [])[0], team = S(page, 1);
  const groups: [ReactNode, string][] = [[<Code2 key="a" size={20} />, 'Product'], [<Bot key="b" size={20} />, 'Engineering'], [<HeadphonesIcon key="c" size={20} />, 'Customer success']];
  return <>
    <Hero page={page} icon={<Users size={16} />} onOpen={onOpen} visual={<div className="co-team-visual">
      <div className="co-avatars">{['R', '', '', '', '', ''].map((l, i) => <span key={i} className={i === 0 ? 'is-lead' : ''}>{l || <UserRound size={20} />}</span>)}</div>
      <Partners />
    </div>} />
    {founder && <section className="container"><Reveal className="co-founder-card">
      <RealPhoto src="/photos/team/reshmanth.jpg" alt={founder.title} note="Real photo needed: a natural portrait of Reshmanth Jonnalagadda (4:5). Please use a real photo, not an AI image." />
      <div><span className="wb-eyebrow">Founder</span><h2>{founder.title}</h2><p>{founder.body}</p><Link className="co-link" href="/founders-note/">Read the founder’s note <ArrowRight size={15} /></Link></div>
    </Reveal></section>}
    <section className="co-band"><div className="container">
      <Head eyebrow="The team" title={team.title} intro={team.paragraphs[0]} center />
      <div className="co-groups">{groups.map(([icon, label]) => <Reveal key={label} className="co-group"><span className="co-principle-ico">{icon}</span><h3>{label}</h3></Reveal>)}</div>
    </div></section>
    <CtaBlock title={page.cta.title} body={page.cta.body} action={page.cta.action} onOpen={onOpen} art={stack(result(<Users size={15} />, 'Founder-led', 'Since 2024'))} artRight={stack(result(<BadgeCheck size={15} />, 'Meta and Shopify', 'Partner'))} />
  </>;
}

/* ---------------- Contact ---------------- */

function Contact({ page, onOpen }: { page: ContentPage; onOpen: Open }) {
  const items = S(page, 0).items ?? [];
  const opts = [
    { icon: <CalendarCheck size={24} />, cta: 'Book a demo', go: () => onOpen('Book a demo'), tone: 'navy' },
    { icon: <LifeBuoy size={24} />, cta: 'Open the help centre', href: '/help/', tone: 'blue' },
    { icon: <Handshake size={24} />, cta: 'See partner programs', href: items[2]?.href ?? '/partners/', tone: 'yellow' },
  ];
  return <>
    <Hero page={page} icon={<Mail size={16} />} onOpen={onOpen} centered={!page.hero.image} actions={<></>}
      visual={page.hero.image && <div className="co-photo-visual"><img className="co-photo" src={page.hero.image.src} alt={page.hero.image.alt} width={page.hero.image.width} height={page.hero.image.height} fetchPriority="high" /></div>} />
    <section className="container co-contact">{items.map((item, i) => { const o = opts[i]; const inner = <>
      <span className={`co-contact-ico is-${o.tone}`}>{o.icon}</span><h3>{item.title}</h3><p>{item.body}</p><span className="co-link">{o.cta} <ArrowRight size={15} /></span></>;
      return <Reveal key={item.title}>{o.href ? <Link className="co-contact-card" href={o.href}>{inner}</Link> : <button className="co-contact-card" onClick={o.go}>{inner}</button>}</Reveal>;
    })}</section>
    <CtaBlock title={page.cta.title} body={page.cta.body} action={page.cta.action} onOpen={onOpen} art={stack(result(<CalendarCheck size={15} />, 'Book a demo', 'With your own questions'))} artRight={stack(result(<LifeBuoy size={15} />, 'Help centre', 'Guides for every step'))} />
  </>;
}

/* ---------------- Security ---------------- */

function Security({ page, onOpen }: { page: ContentPage; onOpen: Open }) {
  const control = S(page, 0), ws = S(page, 1), big = S(page, 2);
  const minis = [
    <div key="0" className="co-mini co-list">{[['Website pages', true], ['Help documents', true], ['Shopify', true], ['Web search', false]].map(([l, on]) => <span key={l as string}>{l}<i className={on ? 'is-on' : ''} /></span>)}</div>,
    <div key="1" className="co-mini co-list">{[['yourstore.com', true], ['shop.yourstore.com', true], ['copycat-site.net', false]].map(([d, ok]) => <span key={d as string}><Globe size={13} />{d}{ok ? <Check size={14} className="co-ok" /> : <Ban size={14} className="co-no" />}</span>)}</div>,
    <div key="2" className="co-mini co-list">{['Never quote prices', 'No medical, legal or financial advice', 'Never share internal details'].map(r => <span key={r}><ShieldCheck size={13} className="co-ok" />{r}</span>)}</div>,
  ];
  const orbit: [ReactNode, string][] = [[<Globe key="a" size={15} />, 'Allowed domains'], [<ShieldCheck key="b" size={15} />, 'Guardrails'], [<Lock key="c" size={15} />, 'Workspace isolation'], [<KeyRound key="d" size={15} />, 'SSO on Enterprise'], [<Clock key="e" size={15} />, 'Uptime SLA on Enterprise'], [<Download key="f" size={15} />, '30-day export']];
  return <>
    <Hero page={page} icon={<ShieldCheck size={16} />} onOpen={onOpen} visual={<div className="co-shield">
      <span className="co-shield-core"><ShieldCheck size={46} /></span>
      {orbit.map(([icon, label], i) => <span key={label} className="co-orbit" style={{ ['--a' as string]: `${(360 / orbit.length) * i - 90}deg` }}><span>{icon}{label}</span></span>)}
    </div>} />
    <section className="container co-sec">
      <Head eyebrow="Control" title={control.title} />
      <div className="co-beliefs">{(control.items ?? []).map((item, i) => <Reveal key={item.title} className="co-belief">{minis[i]}<h3>{item.title}</h3><p>{item.body}</p></Reveal>)}</div>
    </section>
    <section className="co-band"><div className="container co-split">
      <div><Head eyebrow="Protection" title={ws.title} />{ws.paragraphs.map(p => <p key={p} className="co-para">{p}</p>)}</div>
      <Reveal className="co-iso" aria-hidden="true">
        {['Your workspace', 'Another workspace'].map((w, i) => <div key={w} className={`co-iso-box ${i ? 'is-other' : ''}`}><strong><Lock size={14} />{w}</strong><span><Users size={13} />Members only</span><span><KeyRound size={13} />Secrets kept out of logs</span></div>)}
        <span className="co-iso-wall"><Ban size={16} /></span>
      </Reveal>
    </div></section>
    <section className="container co-sec">
      <Head eyebrow="Enterprise" title={big.title} />
      <div className="co-stats">
        <Reveal className="co-stat"><KeyRound size={22} /><strong>SSO and SAML</strong><small>Single sign-on on Enterprise plans</small></Reveal>
        <Reveal className="co-stat"><Clock size={22} /><strong>99.9%</strong><small>Uptime service level agreement</small></Reveal>
        <Reveal className="co-stat"><Download size={22} /><strong>30 days</strong><small>To export your data after your plan ends</small></Reveal>
      </div>
    </section>
    <CtaBlock title={page.cta.title} body={page.cta.body} action={page.cta.action} onOpen={onOpen} art={stack(result(<ShieldCheck size={15} />, 'Guardrails', 'Rules you set'))} artRight={stack(result(<Lock size={15} />, 'Isolated workspaces', 'Members only'))} />
  </>;
}

/* ---------------- Legal ---------------- */

// Anchor for a legal section heading: "3. Information We Collect" becomes "information-we-collect".
const legalId = (title: string) => title.toLowerCase().replace(/^\d+\.\s*/, '').replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');

function Legal({ page, onOpen, points }: { page: ContentPage; onOpen: Open; points: [ReactNode, string][] }) {
  return <>
    <section className="wb-hero pp-hero co-hero co-legal-hero"><div className="container">
      <div className="wb-kicker pp-kicker"><span className="pp-kicker-ico"><FileText size={16} /></span>{page.hero.kicker}</div>
      <h1>{page.hero.title}</h1>
      {page.status !== 'final' && <span className="co-pill is-amber"><PenLine size={13} />Full text being finalised</span>}
      <p className="wb-lead">{page.hero.body}</p>
      {page.hero.reassurance && <p className="co-legal-date">{page.hero.reassurance}</p>}
    </div></section>
    <section className="container co-legal">
      <aside className="co-toc"><small>On this page</small>{page.sections.map(s => <a key={s.title} href={`#${legalId(s.title)}`}>{s.title.replace(/\.$/, '')}</a>)}<a href="#questions">Questions</a></aside>
      <div>
        <div className="co-points">{points.map(([icon, label]) => <Reveal key={label} className="co-point"><span>{icon}</span>{label}</Reveal>)}</div>
        {page.sections.map(s => <Reveal key={s.title} className="co-legal-block"><h2 id={legalId(s.title)}>{s.title}</h2>{s.body ? s.body.map((b, i) => 'h3' in b ? <h3 key={i}>{b.h3}</h3> : 'ul' in b ? <ul key={i}>{b.ul.map(t => <li key={t}>{t}</li>)}</ul> : <p key={i}>{b.p}</p>) : s.paragraphs.map(p => <p key={p}>{p}</p>)}</Reveal>)}
        <Reveal className="co-legal-block co-legal-ask"><h2 id="questions">{page.cta.title}</h2><p>{page.cta.body}</p><Link className="wb-btn" href="/contact/">Contact us <ArrowRight size={16} /></Link></Reveal>
      </div>
    </section>
  </>;
}

const legalPoints: Record<string, [ReactNode, string][]> = {
  'privacy-policy': [[<Database key="a" size={18} />, 'What we collect'], [<Bot key="b" size={18} />, 'How it runs your agent'], [<Users key="c" size={18} />, 'Who it is shared with'], [<Clock key="d" size={18} />, 'How long it is kept'], [<Trash2 key="e" size={18} />, 'Access or delete it']],
  'terms-of-service': [[<CircleCheck key="a" size={18} />, 'Cancel any time'], [<CreditCard key="b" size={18} />, 'Payments are not refunded'], [<Zap key="c" size={18} />, 'Credits do not carry over'], [<Download key="d" size={18} />, 'Export your data for 30 days']],
};

export function CompanyTemplate({ slug, page }: { slug: string; page: ContentPage }) {
  return <SiteFrame>{onOpen => <div className="wb pp co">
    {slug === 'about' && <About page={page} onOpen={onOpen} />}
    {slug === 'founders-note' && <FoundersNote page={page} onOpen={onOpen} />}
    {slug === 'careers' && <Careers page={page} onOpen={onOpen} />}
    {slug === 'team' && <Team page={page} onOpen={onOpen} />}
    {slug === 'contact' && <Contact page={page} onOpen={onOpen} />}
    {slug === 'security' && <Security page={page} onOpen={onOpen} />}
    {legalPoints[slug] && <Legal page={page} onOpen={onOpen} points={legalPoints[slug]} />}
  </div>}</SiteFrame>;
}
