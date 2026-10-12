'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CreditCard, Inbox, Lightbulb, LifeBuoy, MessageSquare, Plug, Rocket, Search, Sparkles } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { Reveal } from '@/components/sections';
import help from '@/content/help/articles.json';

// /help/ and /help/[slug]/: setup guides written from the product documentation.

export type HelpArticle = { slug: string; category: string; title: string; summary: string; steps: string[]; tips: string[] };
const icons: Record<string, React.ReactNode> = { rocket: <Rocket size={20} />, chat: <MessageSquare size={20} />, plug: <Plug size={20} />, spark: <Sparkles size={20} />, inbox: <Inbox size={20} />, card: <CreditCard size={20} /> };
const articles = help.articles as HelpArticle[];

export function HelpHubTemplate() {
  const [q, setQ] = useState('');
  const hits = q.trim().length > 1 ? articles.filter(a => `${a.title} ${a.summary} ${a.steps.join(' ')}`.toLowerCase().includes(q.toLowerCase())).slice(0, 6) : [];
  return <SiteFrame>{() => <div className="wb pp">
    <section className="wb-hero pp-hero hc-hero"><div className="container">
      <div className="hc-top">
        <div className="wb-kicker pp-kicker"><span className="pp-kicker-ico"><LifeBuoy size={16} /></span>Help centre</div>
        <h1>How can we <span className="wb-accent">help</span>?</h1>
        <p className="wb-lead">Step-by-step guides for setting up your agent, channels and integrations.</p>
        <label className="hc-search"><Search size={18} /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search, for example: connect WhatsApp" aria-label="Search the help centre" />
          {hits.length > 0 && <div className="hc-results">{hits.map(a => <Link key={a.slug} href={`/help/${a.slug}/`}>{a.title}<small>{a.summary}</small></Link>)}</div>}
        </label>
      </div>
    </div></section>
    <section className="container hc-cats">{help.categories.map(c => <Reveal key={c.slug} className="hc-cat">
      <span className="hc-cat-ico">{icons[c.icon]}</span><h2>{c.title}</h2><p>{c.body}</p>
      <ul>{articles.filter(a => a.category === c.slug).map(a => <li key={a.slug}><Link href={`/help/${a.slug}/`}>{a.title}<ArrowRight size={14} /></Link></li>)}</ul>
    </Reveal>)}</section>
  </div>}</SiteFrame>;
}

export function HelpArticleTemplate({ slug }: { slug: string }) {
  const i = articles.findIndex(a => a.slug === slug), a = articles[i];
  const cat = help.categories.find(c => c.slug === a.category)!;
  const prev = articles[i - 1], next = articles[i + 1];
  return <SiteFrame>{onOpen => <div className="wb pp"><div className="container hc-article">
    <nav className="hc-nav" aria-label="Help articles">{help.categories.map(c => <div key={c.slug} style={{ display: 'contents' }}><small>{c.title}</small>{articles.filter(x => x.category === c.slug).map(x => <Link key={x.slug} href={`/help/${x.slug}/`} className={x.slug === slug ? 'is-on' : ''}>{x.title}</Link>)}</div>)}</nav>
    <article className="hc-body">
      <div className="hc-crumbs"><Link href="/help/"><ArrowLeft size={13} style={{ verticalAlign: '-2px' }} /> Help centre</Link><span>/</span><span>{cat.title}</span></div>
      <h1>{a.title}</h1>
      <p className="hc-lead">{a.summary}</p>
      <ol className="hc-steps">{a.steps.map(s => <li key={s}>{s}</li>)}</ol>
      {a.tips.map(t => <p key={t} className="hc-tip"><Lightbulb size={17} />{t}</p>)}
      <div className="hc-next">{prev ? <Link href={`/help/${prev.slug}/`}><ArrowLeft size={15} />{prev.title}</Link> : <span />}{next && <Link href={`/help/${next.slug}/`}>{next.title}<ArrowRight size={15} /></Link>}</div>
      <p className="hc-tip" style={{ marginTop: 28, background: '#f2f8ff', borderColor: '#d6e8fa', color: '#33475b' }}><MessageSquare size={17} style={{ color: '#1769c2' }} /><span>Still stuck? <button className="text-link" onClick={() => onOpen('Book a demo')} style={{ padding: 0 }}>Talk to our team</button>.</span></p>
    </article>
  </div></div>}</SiteFrame>;
}
