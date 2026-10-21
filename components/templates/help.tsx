'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Check, ChevronDown, ChevronRight, Copy, LifeBuoy, Search } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { helpLessons, helpTopics } from './help-data';
import type { HelpMedia } from '@/content/types';

// Help centre, laid out like a calm learning centre: topic cards, then lessons written as short
// paragraphs with a screenshot or video under each. Content lives in content/help/articles.json.
// Where the team has not added media yet, an empty frame marks the place for it.

const topics = helpTopics;
const lessons = helpLessons;
const ofTopic = (slug: string) => lessons.filter(l => l.topic === slug);

/* ---------- shared ---------- */

function HelpBar() {
  return <div className="hz-bar"><div className="container hz-bar-in">
    <Link href="/help/" className="hz-bar-home"><LifeBuoy size={16} />Help centre</Link>
    <nav><Link href="/help/faqs/">FAQs</Link><Link href="/help/">Lessons</Link></nav>
    <SearchBox small />
  </div></div>;
}

function SearchBox({ small = false }: { small?: boolean }) {
  const [q, setQ] = useState('');
  const hits = q.trim().length > 1 ? lessons.filter(a => `${a.title} ${a.summary} ${a.steps.map(s => s.title + ' ' + s.body).join(' ')}`.toLowerCase().includes(q.toLowerCase())).slice(0, 6) : [];
  return <label className={`hz-search ${small ? 'is-small' : ''}`}><Search size={small ? 14 : 16} />
    <input value={q} onChange={e => setQ(e.target.value)} placeholder={small ? 'Search' : 'Search the help centre'} aria-label="Search the help centre" />
    {hits.length > 0 && <span className="hz-results">{hits.map(a => <Link key={a.slug} href={`/help/${a.slug}/`}>{a.title}<small>{topics.find(t => t.slug === a.topic)?.title}</small></Link>)}</span>}
  </label>;
}

export function MediaSlot({ media, kind, label }: { media?: HelpMedia; kind: 'image' | 'video'; label: string }) {
  if (media?.type === 'image') return <figure className="hz-media"><img src={media.src} alt={media.alt ?? ''} loading="lazy" decoding="async" />{media.caption && <figcaption>{media.caption}</figcaption>}</figure>;
  if (media?.type === 'video') return <figure className="hz-media"><video src={media.src} controls playsInline preload="metadata" /></figure>;
  const yt = media?.type === 'youtube' ? media.src.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)?.[1] : undefined;
  if (yt) return <figure className="hz-media hz-video"><iframe src={`https://www.youtube-nocookie.com/embed/${yt}`} title={media?.alt ?? label} loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen /></figure>;
  // No media yet: render nothing. Add a screenshot or video through the article's media field.
}

export function StillNeedHelp() {
  return <section className="container hz-need"><h2>Still need help?</h2>
    <div className="hz-need-card"><span className="hz-need-ico"><LifeBuoy size={18} /></span><strong>Talk to our team</strong><p>Could not find what you were looking for? Reach out and we will do our best to help you.</p><Link className="hz-pill" href="/contact/">Contact us</Link></div>
  </section>;
}

/* ---------- lesson ---------- */

function CopyLink() {
  const [done, setDone] = useState(false);
  return <button className="hz-copy" onClick={() => navigator.clipboard?.writeText(location.href).then(() => { setDone(true); setTimeout(() => setDone(false), 1800); })}>{done ? <Check size={14} /> : <Copy size={14} />}{done ? 'Copied' : 'Copy'}</button>;
}

export function HelpArticleTemplate({ slug }: { slug: string }) {
  const a = lessons.find(l => l.slug === slug)!;
  const topic = topics.find(t => t.slug === a.topic)!;
  const [open, setOpen] = useState(a.topic);
  return <SiteFrame>{() => <div className="hz">
    <HelpBar />
    <div className="container hz-article">
      <aside className="hz-side">
        <h2>Topics and articles</h2>
        <div className="hz-side-box">{topics.map(t => <div key={t.slug} className="hz-acc">
          <button onClick={() => setOpen(open === t.slug ? '' : t.slug)} aria-expanded={open === t.slug}>{t.title}{open === t.slug ? <ChevronDown size={15} /> : <ChevronRight size={15} />}</button>
          {open === t.slug && <div>{ofTopic(t.slug).map(x => <Link key={x.slug} href={`/help/${x.slug}/`} className={x.slug === slug ? 'is-on' : ''}>{x.title}</Link>)}</div>}
        </div>)}</div>
      </aside>

      <article className="hz-body">
        <div className="hz-crumbs"><Link href="/help/" className="is-dark">Topics</Link><span>/</span><span className="is-soft">{topic.title}</span></div>
        <h1>{a.title}</h1>
        <p className="hz-sub">{a.summary}</p>
        <div className="hz-share"><CopyLink /></div>

        <MediaSlot media={a.video} kind="video" label="Lesson video" />

        {a.before && <p><b>Before you start:</b> {a.before.join(' · ')}</p>}
        {a.steps.map((s, i) => <div key={s.title} className="hz-step">
          <p><strong>{i + 1}. {s.title}.</strong> {s.body}{s.path && <> Go to <b>{s.path}</b>.</>}</p>
          <MediaSlot media={s.media} kind="image" label={`Screenshot: ${s.title}`} />
        </div>)}

        {a.table && <><h2>{a.table.caption}</h2><div className="hz-table-wrap"><table className="hz-table"><thead><tr>{a.table.columns.map(c => <th key={c}>{c}</th>)}</tr></thead><tbody>{a.table.rows.map(r => <tr key={r[0]}>{r.map((c, n) => <td key={n}>{c}</td>)}</tr>)}</tbody></table></div></>}

        {a.callouts?.map(c => <p key={c.text} className="hz-note"><b>{c.type === 'tip' ? 'Tip' : c.type === 'note' ? 'Note' : 'Important'}:</b> {c.text}</p>)}

        {a.faq?.length ? <><h2>Questions</h2>{a.faq.map(f => <p key={f.q}><b>{f.q}</b> {f.a}</p>)}</> : null}

      </article>
    </div>
    <StillNeedHelp />
  </div>}</SiteFrame>;
}

/* ---------- FAQs ---------- */

export function HelpFaqsTemplate({ groups: faqGroups }: { groups: { title: string; href: string; items: { q: string; a: string }[] }[] }) {
  const [q, setQ] = useState('');
  const shown = faqGroups.map(g => ({ ...g, items: g.items.filter(f => !q || `${f.q} ${f.a}`.toLowerCase().includes(q.toLowerCase())) })).filter(g => g.items.length);
  return <SiteFrame>{() => <div className="hz">
    <HelpBar />
    <section className="hz-hero"><h1>Frequently asked questions</h1><p>Answers about agents, channels, integrations and plans</p>
      <label className="hz-search"><Search size={16} /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search questions" aria-label="Search questions" /></label></section>
    <section className="container hz-faqs">{shown.map(g => <div key={g.title} className="hz-faq-group">
      <h2>{g.title}</h2>
      <div className="hz-faq-list">{g.items.map(f => <details key={f.q}><summary>{f.q}<ChevronDown size={16} /></summary><p>{f.a}</p></details>)}</div>
    </div>)}</section>
    <StillNeedHelp />
  </div>}</SiteFrame>;
}
