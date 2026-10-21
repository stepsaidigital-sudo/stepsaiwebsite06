'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { Reveal } from '@/components/sections';
import type { BlogPost } from '@/lib/blog';

// /blog/<slug>/: one article. The full text still lives on stepsai.co, so the page
// shows the summary and links there, followed by related posts.

export function BlogPostTemplate({ post, related }: { post: BlogPost; related: BlogPost[] }) {
  return <SiteFrame>{() => <div className="wb pp">
    <article className="wb-hero pp-hero bl-hero bl-post"><div className="container">
      <Link className="bl-back" href="/blog/"><ArrowLeft size={15} />All articles</Link>
      <header className="bl-post-head">
        <span className="bl-topic">{post.topic}</span>
        <h1>{post.title}</h1>
        <small>{post.author} · {post.date}</small>
      </header>
      {post.image && <figure className="bl-post-img"><img src={post.image} alt="" /></figure>}
      <div className="bl-post-body">
        <p className="wb-lead">{post.excerpt}</p>
        <a className="wb-btn" href={post.url}>Read the full article <ArrowUpRight size={16} /></a>
      </div>
    </div></article>

    {related.length > 0 && <section className="container bl-list">
      <h2 className="bl-related">Keep reading</h2>
      <div className="bl-grid">{related.map(p => <Reveal key={p.id}><Link className="bl-card" href={`/blog/${p.slug}/`}>
        <figure>{p.image && <img src={p.image} alt="" loading="lazy" decoding="async" />}</figure>
        <div><span className="bl-topic">{p.topic}</span><h3>{p.title}</h3><p>{p.excerpt}</p><small>{p.author} · {p.date}</small></div>
      </Link></Reveal>)}</div>
    </section>}
  </div>}</SiteFrame>;
}
