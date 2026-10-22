'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import styles from './legal-page.module.css';

type LegalDocument = {
  title: string; heroHtml: string; bodyHtml: string; footerHtml: string;
  navLabel: string; nav: { href: string; label: string }[];
};

export function LegalPage({ document }: { document: LegalDocument }) {
  const article = useRef<HTMLElement>(null);
  const [active, setActive] = useState(document.nav[0]?.href);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(`#${visible[0].target.id}`);
    }, { rootMargin: '-100px 0px -55% 0px', threshold: 0 });
    article.current?.querySelectorAll('[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [document]);

  return <SiteFrame>{() => <div className={styles.page}>
    <section className={`container ${styles.hero}`} aria-label={document.title} dangerouslySetInnerHTML={{ __html: document.heroHtml }} />
    <div className={`container ${styles.layout}`}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.back}><ArrowLeft size={15} aria-hidden="true" />Back to Home</Link>
        <nav aria-label={document.navLabel}>
          <h2>{document.navLabel}</h2>
          {document.nav.map(item => <a key={item.href} href={item.href} aria-current={active === item.href ? 'location' : undefined} onClick={() => setActive(item.href)}>{item.label}</a>)}
        </nav>
      </aside>
      {/* Imported from the saved source; scripts and attributes are removed by the importer. */}
      <article ref={article} className={styles.article} aria-label={`${document.title} full text`} dangerouslySetInnerHTML={{ __html: document.bodyHtml }} />
    </div>
    <section className={`container ${styles.contact}`} dangerouslySetInnerHTML={{ __html: document.footerHtml }} />
  </div>}</SiteFrame>;
}
