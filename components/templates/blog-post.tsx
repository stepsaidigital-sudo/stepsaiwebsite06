'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { Faq, Reveal } from '@/components/sections';
import type { BlogPost } from '@/lib/blog';

// /blog/<slug>/: one article from Sanity. `body` is the article text, rendered on the server by
// BlogBody; FAQs come from the post and are followed by related posts.

export function BlogPostTemplate({ post, imageAlt, body, faqs, related }: {
  post: BlogPost; imageAlt?: string; body: ReactNode; faqs: { q: string; a: string }[]; related: BlogPost[];
}) {
  return <SiteFrame>{() => <div className="wb pp">
    <article className="wb-hero pp-hero bl-hero bl-post"><div className="container">
      <Link className="bl-back" href="/blog/"><ArrowLeft size={15} />All articles</Link>
      <header className="bl-post-head">
        <span className="bl-topic">{post.topic}</span>
        <h1>{post.title}</h1>
        <small>{post.author} · {post.date}</small>
      </header>
      {post.image && <figure className="bl-post-img"><img src={post.image} alt={imageAlt || ''} /></figure>}
      {post.excerpt && <p className="wb-lead bl-post-lead">{post.excerpt}</p>}
      {body}
    </div></article>

    {faqs.length > 0 && <Faq title="Frequently asked questions" items={faqs} />}

    {related.length > 0 && <section className="container bl-list">
      <h2 className="bl-related">Keep reading</h2>
      <div className="bl-grid">{related.map(p => <Reveal key={p.id}><Link className="bl-card" href={`/blog/${p.slug}/`}>
        <figure>{p.image && <img src={p.image} alt="" loading="lazy" decoding="async" />}</figure>
        <div><span className="bl-topic">{p.topic}</span><h3>{p.title}</h3><p>{p.excerpt}</p><small>{p.author} · {p.date}</small></div>
      </Link></Reveal>)}</div>
    </section>}
  </div>}</SiteFrame>;
}
