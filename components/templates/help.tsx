'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle, ArrowLeft, ArrowRight, BarChart3, BookOpen, ChevronDown, Clock, CreditCard, Globe, Headphones, HelpCircle, Inbox, Info,
  Layers, Lightbulb, Link2, LifeBuoy, Megaphone, MousePointerClick, Plug, Rocket, Search, Sparkles, Users, Workflow, Check, Copy,
} from 'lucide-react';
import { ChannelLogo } from '@/app/channel-chat';
import { SiteFrame } from '@/components/site/shell';
import { Reveal } from '@/components/sections';
import help from '@/content/help/articles.json';
import type { HelpLesson, HelpMedia, HelpTopic } from '@/content/types';

// Help centre (learning centre): topics → lessons, rendered from content/help/articles.json.
// To add a lesson, add an entry to that file. Nothing else needs to change.

const topics = help.topics as HelpTopic[];
const lessons = help.lessons as HelpLesson[];
export const topicIcon: Record<string, React.ReactNode> = {
  rocket: <Rocket size={20} />, globe: <Globe size={20} />, whatsapp: <ChannelLogo channel="WhatsApp" />, instagram: <ChannelLogo channel="Instagram" />,
  link: <Link2 size={20} />, plug: <Plug size={20} />, spark: <Sparkles size={20} />, headset: <Headphones size={20} />, megaphone: <Megaphone size={20} />,
  flow: <Workflow size={20} />, inbox: <Inbox size={20} />, users: <Users size={20} />, chart: <BarChart3 size={20} />, card: <CreditCard size={20} />,
};
const readTime = (l: HelpLesson) => Math.max(1, Math.round(([l.summary, ...l.steps.map(s => s.title + ' ' + s.body), ...(l.callouts ?? []).map(c => c.text)].join(' ').split(/\s+/).length + (l.table ? l.table.rows.length * 8 : 0)) / 180));
const ofTopic = (slug: string) => lessons.filter(l => l.topic === slug);

function HelpSearch({ big = false }: { big?: boolean }) {
  const [q, setQ] = useState('');
  const hits = q.trim().length > 1 ? lessons.filter(a => `${a.title} ${a.summary} ${a.steps.map(s => s.title + ' ' + s.body).join(' ')}`.toLowerCase().includes(q.toLowerCase())).slice(0, 6) : [];
  return <label className={`hc-search ${big ? '' : 'is-small'}`}><Search size={big ? 18 : 15} /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search lessons, for example: connect WhatsApp" aria-label="Search the help centre" />
    {hits.length > 0 && <div className="hc-results">{hits.map(a => <Link key={a.slug} href={`/help/${a.slug}/`}>{a.title}<small>{topics.find(t => t.slug === a.topic)?.title} · {a.summary}</small></Link>)}</div>}
  </label>;
}

function HelpTabs({ on }: { on: 'lessons' | 'faqs' }) {
  return <nav className="hc-tabs" aria-label="Help centre sections"><Link className={on === 'lessons' ? 'is-on' : ''} href="/help/"><BookOpen size={15} />Lessons</Link><Link className={on === 'faqs' ? 'is-on' : ''} href="/help/faqs/"><HelpCircle size={15} />FAQs</Link></nav>;
}

export function StillNeedHelp() {
  return <section className="container"><Reveal className="hc-help">
    <span className="hc-help-ico"><LifeBuoy size={24} /></span>
    <div><h2>Still need help?</h2><p>Could not find what you were looking for? Talk to our team and we will walk you through it.</p></div>
    <Link className="wb-btn" href="/book-a-demo/">Talk to our team <ArrowRight size={16} /></Link>
  </Reveal></section>;
}

export function HelpHubTemplate() {
  const start = ofTopic('getting-started');
  return <SiteFrame>{() => <div className="wb pp">
    <section className="wb-hero pp-hero hc-hero"><div className="container">
      <div className="hc-top">
        <div className="wb-kicker pp-kicker"><span className="pp-kicker-ico"><LifeBuoy size={16} /></span>Help centre</div>
        <h1>Learn Steps AI, <span className="wb-accent">step by step</span>.</h1>
        <p className="wb-lead">{lessons.length} short lessons across {topics.length} topics. Each one shows exactly where to click.</p>
        <HelpSearch big />
        <HelpTabs on="lessons" />
      </div>
    </div></section>

    <section className="container hc-start">
      <div className="hc-start-head"><span className="wb-eyebrow">Start here</span><h2>New to Steps AI? Do these first.</h2></div>
      <ol className="hc-path">{start.map((l, i) => <li key={l.slug}><Link href={`/help/${l.slug}/`}>
        <span className="hc-path-n">{i + 1}</span><span><strong>{l.title}</strong><small><Clock size={12} />{readTime(l)} min · {l.steps.length} steps</small></span><ArrowRight size={16} />
      </Link></li>)}</ol>
    </section>

    <section className="container hc-topics">
      <div className="hc-start-head"><span className="wb-eyebrow">Topics</span><h2>Explore by topic.</h2></div>
      <div className="hc-grid">{topics.map(t => {
        const ls = ofTopic(t.slug);
        return <Reveal key={t.slug}><Link className="hc-topic" href={`/help/${ls[0]?.slug ?? ''}/`}>
          <span className={`hc-topic-art ${t.cover ? 'has-cover' : ''}`}>{t.cover ? <img src={t.cover} alt="" loading="lazy" /> : <><span className="hc-topic-ico">{topicIcon[t.icon]}</span><i /><i /></>}</span>
          <strong>{t.title}</strong><small>{t.summary}</small>
          <span className="hc-topic-foot"><Layers size={13} />{ls.length} {ls.length === 1 ? 'lesson' : 'lessons'}<em>Explore <ArrowRight size={13} /></em></span>
        </Link></Reveal>;
      })}</div>
    </section>
    <StillNeedHelp />
  </div>}</SiteFrame>;
}

function CopyLink() {
  const [done, setDone] = useState(false);
  return <button className="hc-copy" onClick={() => { navigator.clipboard?.writeText(location.href).then(() => { setDone(true); setTimeout(() => setDone(false), 1800); }); }}>{done ? <><Check size={14} />Copied</> : <><Copy size={14} />Copy link</>}</button>;
}

// Real media when the team has added it; otherwise an illustrated figure of the step.
const youtubeId = (src: string) => src.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)?.[1];
function Media({ media }: { media: HelpMedia }) {
  return <figure className="hc-media">
    {media.type === 'image' && <img src={media.src} alt={media.alt ?? ''} loading="lazy" decoding="async" />}
    {media.type === 'video' && <video src={media.src} controls playsInline preload="metadata" />}
    {media.type === 'youtube' && youtubeId(media.src) && <iframe src={`https://www.youtube-nocookie.com/embed/${youtubeId(media.src)}`} title={media.alt ?? 'Lesson video'} loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen />}
    {media.caption && <figcaption>{media.caption}</figcaption>}
  </figure>;
}
function StepFigure({ title, path, n }: { title: string; path?: string; n: number }) {
  const crumbs = (path ?? 'Steps AI dashboard').split(' › ');
  return <figure className="hc-figure" aria-hidden="true">
    <div className="hc-fig-bar"><i /><i /><i /><span>app.stepsai.co</span></div>
    <div className="hc-fig-body">
      <div className="hc-fig-side">{['Home', 'Agents', 'Resources', 'Workspace'].map(x => <span key={x} className={crumbs[0] === x ? 'is-on' : ''}>{x}</span>)}</div>
      <div className="hc-fig-main"><small>{crumbs.join('  ›  ')}</small><strong><em>{n}</em>{title}</strong><span className="hc-fig-lines"><i /><i /><i /></span><span className="hc-fig-cta">{crumbs.at(-1)}</span></div>
    </div>
  </figure>;
}

const calloutIcon = { tip: <Lightbulb size={17} />, note: <Info size={17} />, warning: <AlertTriangle size={17} /> };

export function HelpArticleTemplate({ slug }: { slug: string }) {
  const i = lessons.findIndex(a => a.slug === slug), a = lessons[i];
  const topic = topics.find(t => t.slug === a.topic)!;
  const prev = lessons[i - 1], next = lessons[i + 1];
  const [open, setOpen] = useState<string>(a.topic);
  const related = (a.related ?? []).map(s => lessons.find(l => l.slug === s)).filter(Boolean) as HelpLesson[];
  const toc = ['Steps', a.table && a.table.caption, a.callouts?.length && 'Good to know', a.faq?.length && 'Questions'].filter(Boolean) as string[];
  return <SiteFrame>{() => <div className="wb pp">
    <div className="hc-band"><div className="container hc-band-in"><HelpTabs on="lessons" /><HelpSearch /></div></div>
    <div className="container hc-article">
      <nav className="hc-nav" aria-label="Topics and lessons">
        <small className="hc-nav-title">Topics and lessons</small>
        {topics.map(t => <div key={t.slug} className={`hc-acc ${open === t.slug ? 'is-open' : ''}`}>
          <button onClick={() => setOpen(open === t.slug ? '' : t.slug)} aria-expanded={open === t.slug}><span className="hc-acc-ico">{topicIcon[t.icon]}</span>{t.title}<ChevronDown size={15} /></button>
          {open === t.slug && <div>{ofTopic(t.slug).map(x => <Link key={x.slug} href={`/help/${x.slug}/`} className={x.slug === slug ? 'is-on' : ''}>{x.title}</Link>)}</div>}
        </div>)}
      </nav>

      <article className="hc-body">
        <div className="hc-crumbs"><Link href="/help/">Help centre</Link><span>›</span><span>{topic.title}</span></div>
        <h1>{a.title}</h1>
        <p className="hc-lead">{a.summary}</p>
        <div className="hc-meta"><span><Clock size={14} />{readTime(a)} min</span><span><Layers size={14} />{a.steps.length} steps</span><span className="hc-level">{a.level}</span>{a.plans && <span>{a.plans}</span>}<CopyLink /></div>

        {toc.length > 1 && <div className="hc-toc"><small>In this lesson</small>{toc.map(t => <a key={t} href={`#${t.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{t}</a>)}</div>}

        {a.before && <div className="hc-before"><strong>Before you start</strong><ul>{a.before.map(b => <li key={b}><Check size={14} />{b}</li>)}</ul></div>}

        {a.video && <Media media={a.video} />}

        <h2 id="steps" className="hc-h2">Steps</h2>
        <ol className="hc-steps2">{a.steps.map((s, k) => <li key={s.title}>
          <span className="hc-step-n">{k + 1}</span>
          <div><strong>{s.title}</strong><p>{s.body}</p>{s.media ? <Media media={s.media} /> : s.path && k < 2 ? <StepFigure title={s.title} path={s.path} n={k + 1} /> : null}{s.path && <span className="hc-pathchip"><MousePointerClick size={13} />{s.path.split(' › ').map((p, n, arr) => <b key={p}>{p}{n < arr.length - 1 && <i>›</i>}</b>)}</span>}</div>
        </li>)}</ol>

        {a.table && <><h2 id={a.table.caption.toLowerCase().replace(/[^a-z]+/g, '-')} className="hc-h2">{a.table.caption}</h2>
          <div className="hc-table-wrap"><table className="hc-table"><thead><tr>{a.table.columns.map(c => <th key={c}>{c}</th>)}</tr></thead><tbody>{a.table.rows.map(r => <tr key={r[0]}>{r.map((c, n) => <td key={n}>{c}</td>)}</tr>)}</tbody></table></div></>}

        {a.callouts?.length ? <><h2 id="good-to-know" className="hc-h2">Good to know</h2>{a.callouts.map(c => <p key={c.text} className={`hc-callout is-${c.type}`}>{calloutIcon[c.type]}<span><b>{c.type === 'tip' ? 'Tip' : c.type === 'note' ? 'Note' : 'Watch out'}</b>{c.text}</span></p>)}</> : null}

        {a.faq?.length ? <><h2 id="questions" className="hc-h2">Questions</h2><div className="wb-faq-list">{a.faq.map(f => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div></> : null}

        {related.length > 0 && <div className="hc-related"><small>Related lessons</small><div>{related.map(r => <Link key={r.slug} href={`/help/${r.slug}/`}><strong>{r.title}</strong><span>{r.summary}</span></Link>)}</div></div>}

        <div className="hc-next">{prev ? <Link href={`/help/${prev.slug}/`}><ArrowLeft size={15} /><span><small>Previous</small>{prev.title}</span></Link> : <span />}{next && <Link href={`/help/${next.slug}/`} className="is-next"><span><small>Next</small>{next.title}</span><ArrowRight size={15} /></Link>}</div>
      </article>
    </div>
    <StillNeedHelp />
  </div>}</SiteFrame>;
}

export function HelpFaqsTemplate({ groups }: { groups: { title: string; href: string; items: { q: string; a: string }[] }[] }) {
  const [q, setQ] = useState('');
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const shown = groups.map(g => ({ ...g, items: g.items.filter(f => !q || `${f.q} ${f.a}`.toLowerCase().includes(q.toLowerCase())) })).filter(g => g.items.length);
  return <SiteFrame>{() => <div className="wb pp">
    <section className="wb-hero pp-hero hc-hero"><div className="container"><div className="hc-top">
      <div className="wb-kicker pp-kicker"><span className="pp-kicker-ico"><HelpCircle size={16} /></span>Help centre</div>
      <h1>Frequently asked <span className="wb-accent">questions</span>.</h1>
      <p className="wb-lead">{total} answers about agents, channels, integrations and plans.</p>
      <label className="hc-search"><Search size={18} /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search questions" aria-label="Search questions" /></label>
      <HelpTabs on="faqs" />
    </div></div></section>
    <section className="container hc-faqs">{shown.map(g => <Reveal key={g.title} className="hc-faq-group">
      <div className="hc-faq-head"><h2>{g.title}</h2><Link href={g.href}>Open page <ArrowRight size={13} /></Link></div>
      <div className="wb-faq-list">{g.items.map(f => <details key={f.q}><summary>{f.q}<ChevronDown size={16} /></summary><p>{f.a}</p></details>)}</div>
    </Reveal>)}{!shown.length && <p className="bl-empty">No questions match that search.</p>}</section>
    <StillNeedHelp />
  </div>}</SiteFrame>;
}
