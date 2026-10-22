import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { asset } from '@/lib/asset';
import type { HubPage } from '@/content/types';
import styles from './industry-image-cards.module.css';

export function IndustryImageCards({ page }: { page: HubPage }) {
  return <section className={`container ${styles.section}`} aria-labelledby="industry-cards-title">
    <h2 id="industry-cards-title">{page.cardsTitle ?? 'Explore industries.'}</h2>
    <div className={styles.grid}>{page.cards.map(item => {
      const slug = item.href.split('/').filter(Boolean).at(-1);
      return <Link key={item.href} href={item.href} className={styles.card}>
        <img className={styles.image} src={asset(`/images/industries/cards/${slug}.webp`)} alt="" width={960} height={720} loading="lazy" decoding="async" />
        <span className={styles.overlay} aria-hidden="true" />
        <span className={styles.arrow} aria-hidden="true"><ArrowUpRight size={22} /></span>
        <div className={styles.copy}><h3>{item.label}</h3><p>{item.body}</p></div>
      </Link>;
    })}</div>
  </section>;
}
