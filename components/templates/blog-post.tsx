'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { Faq, Reveal } from '@/components/sections';
import type { BlogPost } from '@/lib/blog';
import styles from './blog-reader.module.css';

function ArticleReader({body}:{body:ReactNode}) {
  const root = useRef<HTMLDivElement>(null);
  const [sections,setSections] = useState<{id:string;title:string}[]>([]);
  const [active,setActive] = useState('');
  useEffect(() => {
    // Older posts use H3/H4 sections. Keep their contents navigation useful too.
    const levels = ['h2', 'h3', 'h4'].map(level => Array.from(root.current?.querySelectorAll<HTMLHeadingElement>(`.bl-prose ${level}`) ?? []));
    const headings = levels.find(level => level.length >= 2) ?? levels.find(level => level.length > 0) ?? [];
    const entries = headings.map((heading,index) => {
      if (!heading.id) heading.id = `article-section-${index+1}`;
      return {id:heading.id,title:heading.textContent ?? ''};
    });
    setSections(entries);
    const update = () => {
      const current = headings.filter(heading => heading.getBoundingClientRect().top <= 160).at(-1) ?? headings[0];
      setActive(current?.id ?? '');
    };
    update();
    window.addEventListener('scroll',update,{passive:true});
    return () => window.removeEventListener('scroll',update);
  },[body]);
  const links = <ol>{sections.map(section => <li key={section.id}><a href={`#${section.id}`} aria-current={active===section.id?'location':undefined}>{section.title}</a></li>)}</ol>;
  return <div className={styles.readingGrid}>
    {sections.length>1 && <aside className={styles.contents} aria-label="Article contents">
      <nav className={styles.desktopContents} aria-label="On this page"><strong>On this page</strong>{links}</nav>
      <details className={styles.mobileContents}><summary>On this page · {sections.length} sections</summary><nav aria-label="Article sections">{links}</nav></details>
    </aside>}
    <div ref={root} className={styles.body}>{body}</div>
  </div>;
}

// /blog/<slug>/: one article from Sanity. `body` is the article text, rendered on the server by
// BlogBody; FAQs come from the post and are followed by related posts.

export function BlogPostTemplate({ post, imageAlt, body, faqs, related }: {
  post: BlogPost; imageAlt?: string; body: ReactNode; faqs: { q: string; a: string }[]; related: BlogPost[];
}) {
  return <SiteFrame>{() => <div className={`wb pp ${styles.page}`}>
    <article className={styles.article}><div className={`container ${styles.articleContainer}`}>
      <Link className="bl-back" href="/blog/"><ArrowLeft size={15} />All articles</Link>
      <div className={`${styles.heroRow} ${!post.image ? styles.textOnly : ''}`}>
      <header className={`bl-post-head ${styles.header}`}>
        <span className="bl-topic">{post.topic}</span>
        <h1>{post.title}</h1>
        <small>{post.author} · {post.date}</small>
        {post.excerpt && <p className={styles.intro}>{post.excerpt}</p>}
      </header>
      {post.image && <figure className={`bl-post-img ${styles.heroImage}`}><img src={post.image} alt={imageAlt || ''} /></figure>}
      </div>
      <ArticleReader body={body}/>
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
