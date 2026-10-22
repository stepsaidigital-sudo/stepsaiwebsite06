'use client';
import Link from 'next/link';
import { ArrowRight, BookOpen, Link2, Workflow, Send, Share2, Handshake } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { DEMO_URL } from '@/components/site/routes';
import { asset } from '@/lib/asset';
import type { ContentPage } from '@/content/types';
import styles from './partners-page.module.css';

export function PartnerDetailPage({ page, kind }: { page: ContentPage; kind: 'agency' | 'affiliate' }) {
  const agency = kind === 'agency';
  const icons = agency ? [BookOpen, Link2, Workflow] : [Send, Share2, Handshake];
  const destination = agency ? DEMO_URL : '/contact/';
  return <SiteFrame>{() => <div className={styles.page}>
    <section className={styles.hero}><div className={`container ${styles.heroGrid}`}>
      <div><span className={styles.eyebrow}>{page.hero.kicker}</span><h1>{page.hero.title}</h1><p className={styles.lead}>{page.hero.body}</p><div className={styles.actions}><Link className={styles.primary} href={destination}>{page.cta.action}<ArrowRight size={17} /></Link></div></div>
      <figure className={styles.visual}><img src={asset(`/images/partners/${agency ? 'agency-agent-setup' : 'affiliate-content-studio'}.webp`)} alt={agency ? 'A monitor with a workflow diagram, a chat tablet and a setup checklist in a specialist workspace.' : 'A microphone, headphones and a laptop prepared for creating a newsletter and sharing recommendations.'} width={1440} height={1080} fetchPriority="high" /><figcaption>{page.hero.reassurance}</figcaption></figure>
    </div></section>
    {page.sections.map((section, index) => <section className={`container ${index === 0 ? styles.benefits : styles.audience}`} key={section.title}>
      <div className={styles.sectionHead}><h2>{section.title}</h2>{section.paragraphs.map(text => <p key={text}>{text}</p>)}{!agency && index === 1 && <Link className={styles.textLink} href="/partners/">Partner with us <ArrowRight size={17} /></Link>}</div>
      {section.items && <div className={styles.cards}>{section.items.map((item, i) => { const Icon = icons[i % icons.length]; return <article className={styles.card} key={item.title}><div className={styles.cardTop}><span className={styles.icon}><Icon size={24} aria-hidden="true" /></span><span className={styles.number}>0{i + 1}</span></div><h3>{item.title}</h3><p>{item.body}</p></article>; })}</div>}
      {index === 1 && <div className={styles.nextStep}><Handshake size={30} aria-hidden="true" /><h3>{page.cta.title}</h3><Link className={styles.textLink} href={destination}>{page.cta.action}<ArrowRight size={17} /></Link></div>}
    </section>)}
    <section className={`container ${styles.cta}`}><div><h2>{page.cta.title}</h2><p>{page.cta.body}</p></div><Link className={styles.ctaButton} href={destination}>{page.cta.action}<ArrowRight size={18} /></Link></section>
  </div>}</SiteFrame>;
}
