'use client';
import Link from 'next/link';
import { ArrowRight, Layers, ChartNoAxesCombined, Handshake } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { DEMO_URL } from '@/components/site/routes';
import { asset } from '@/lib/asset';
import type { ContentPage } from '@/content/types';
import styles from './partners-page.module.css';

const icons = [Layers, ChartNoAxesCombined, Handshake];
export function PartnersPage({ page }: { page: ContentPage }) {
  const benefits = page.sections[0], audience = page.sections[1];
  return <SiteFrame>{() => <div className={styles.page}>
    <section className={styles.hero}><div className={`container ${styles.heroGrid}`}>
      <div><span className={styles.eyebrow}>{page.hero.kicker}</span><h1>{page.hero.title}</h1><p className={styles.lead}>{page.hero.body}</p>
        <div className={styles.actions}><Link className={styles.primary} href={DEMO_URL}>Book a demo <ArrowRight size={17} /></Link><a className={styles.secondary} href="#partner-benefits">Explore the program <ArrowRight size={17} /></a></div>
      </div>
      <figure className={styles.visual}><img src={asset('/images/partners/agency-client-planning.webp')} alt="Separate client project folders, website sketches and a laptop arranged on an agency planning desk." width={1440} height={1080} fetchPriority="high" /><figcaption><Layers size={19} aria-hidden="true" /><span>One agent per client</span><span className={styles.captionDetail}>Knowledge · Channels · Reporting</span></figcaption></figure>
    </div></section>
    <section className={`container ${styles.benefits}`} id="partner-benefits"><div className={styles.sectionHead}><span className={styles.eyebrow}>The partner program</span><h2>{benefits.title}</h2>{benefits.paragraphs.map(p => <p key={p}>{p}</p>)}</div>
      <div className={styles.cards}>{benefits.items?.map((item, i) => { const Icon = icons[i % icons.length]; return <article className={styles.card} key={item.title}><div className={styles.cardTop}><span className={styles.icon}><Icon size={24} aria-hidden="true" /></span><span className={styles.number}>0{i + 1}</span></div><h3>{item.title}</h3><p>{item.body}</p></article>; })}</div>
    </section>
    <section className={`container ${styles.audience}`}><div><span className={styles.eyebrow}>Built for agencies</span><h2>{audience.title}</h2>{audience.paragraphs.map(p => <p key={p}>{p}</p>)}<Link className={styles.textLink} href="/affiliate-program/">Explore the affiliate program <ArrowRight size={17} /></Link></div><div className={styles.audienceList}>{['Digital agencies', 'Marketing agencies', 'Ecommerce agencies'].map((name, i) => <div key={name}><span>0{i + 1}</span><h3>{name}</h3><ArrowRight size={18} aria-hidden="true" /></div>)}</div></section>
    <section className={`container ${styles.cta}`}><div><span className={styles.ctaLabel}>Let’s talk</span><h2>{page.cta.title}</h2><p>{page.cta.body}</p></div><Link className={styles.ctaButton} href={DEMO_URL}>{page.cta.action} <ArrowRight size={18} /></Link></section>
  </div>}</SiteFrame>;
}
