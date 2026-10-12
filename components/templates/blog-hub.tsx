'use client';
import { useMemo, useState } from 'react';
import { ArrowUpRight, BookOpen, Search } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { Reveal } from '@/components/sections';

// /blog/: every article from the Steps AI blog (content/hubs/blog.json, read from stepsai.co/blog/).
// Cards open the full article on stepsai.co.

type Post = { slug: string; url: string; title: string; excerpt: string; image: string; author: string; date: string; topic: string };
const PAGE = 12;

export function BlogHubTemplate({ posts }: { posts: Post[] }) {
  const topics = useMemo(() => ['All', ...[...new Set(posts.map(p => p.topic))].sort()], [posts]);
  const [topic, setTopic] = useState('All'), [query, setQuery] = useState(''), [shown, setShown] = useState(PAGE);
  const [featured, ...rest] = posts;
  const list = rest.filter(p => (topic === 'All' || p.topic === topic) && (!query || `${p.title} ${p.excerpt}`.toLowerCase().includes(query.toLowerCase())));
  return <SiteFrame>{() => <div className="wb pp">
    <section className="wb-hero pp-hero bl-hero"><div className="container">
      <div className="bl-top">
        <div><div className="wb-kicker pp-kicker"><span className="pp-kicker-ico"><BookOpen size={16} /></span>Blog</div>
          <h1>Guides for teams that answer <span className="wb-accent">customers</span>.</h1>
          <p className="wb-lead">WhatsApp, Instagram, ecommerce support and AI agents, explained plainly. {posts.length} articles and counting.</p></div>
      </div>
      <a className="bl-feature" href={featured.url}>
        <figure>{featured.image && <img src={featured.image} alt="" />}</figure>
        <div><span className="bl-topic">Latest · {featured.topic}</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><small>{featured.author} · {featured.date}</small><span className="bl-read">Read the article <ArrowUpRight size={15} /></span></div>
      </a>
    </div></section>

    <section className="container bl-list">
      <div className="bl-tools">
        <div className="bl-topics" role="group" aria-label="Filter by topic">{topics.map(t => <button key={t} className={t === topic ? 'is-on' : ''} aria-pressed={t === topic} onClick={() => { setTopic(t); setShown(PAGE); }}>{t}</button>)}</div>
        <label className="bl-search"><Search size={15} /><input value={query} onChange={e => { setQuery(e.target.value); setShown(PAGE); }} placeholder="Search articles" aria-label="Search articles" /></label>
      </div>
      {list.length ? <div className="bl-grid">{list.slice(0, shown).map(p => <Reveal key={p.slug}><a className="bl-card" href={p.url}>
        <figure>{p.image && <img src={p.image} alt="" loading="lazy" decoding="async" />}</figure>
        <div><span className="bl-topic">{p.topic}</span><h3>{p.title}</h3><p>{p.excerpt}</p><small>{p.author} · {p.date}</small></div>
      </a></Reveal>)}</div> : <p className="bl-empty">No articles match that search.</p>}
      {shown < list.length && <button className="wb-btn-ghost bl-more" onClick={() => setShown(s => s + PAGE)}>Show more articles</button>}
    </section>
  </div>}</SiteFrame>;
}
