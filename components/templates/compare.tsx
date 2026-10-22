'use client';
import { Check, Minus } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { CtaBand, Faq, GoodToKnow, PageHero, Reveal, SectionIntro, StepRows } from '@/components/sections';
import type { ComparePage } from '@/content/types';

import { asset } from '@/lib/asset';
import styles from './compare-polish.module.css';
// Preserve official marks: lossless WebP for raster sources, SVG for vector sources.
const WEBP_LOGOS = ['manychat', 'aisensy', 'verifast'];
const competitorLogo = (name: string) => { const slug = name.toLowerCase().replace(/[^a-z]/g, ''); return asset(`/brands/compare/${slug}.${WEBP_LOGOS.includes(slug) ? 'webp' : 'svg'}`); };

function VersusCard({ page }: { page: ComparePage }) {
  return <Reveal className={`vs-card ${styles.card}`} >
    <div className="vs-head">
      <span className="vs-brand is-us"><img src={asset('/brands/compare/steps-ai.webp')} alt="" width={56} height={30} />Steps AI</span>
      <span className="vs-badge">vs</span>
      <span className="vs-brand"><img src={competitorLogo(page.competitor)} alt="" width={30} height={30} />{page.competitor}</span>
    </div>
    {page.glance.rows.slice(0, 3).map((row, i) => <div key={row.label} className="vs-mini" style={{ animationDelay: `${300 + i * 260}ms` }}>
      <small>{row.label}</small>
      <div><span data-brand="Steps AI"><Check size={13} />{row.steps}</span><span data-brand={page.competitor}><Minus size={13} />{row.them}</span></div>
    </div>)}
    <p className="vs-note">Illustration based on public information</p>
  </Reveal>;
}

export function CompareTemplate({ page }: { page: ComparePage }) {
  return <SiteFrame>{onOpen => <>
    <PageHero hero={page.hero} onOpen={onOpen} visual={<VersusCard page={page} />} />

    <section className="sp-section container">
      <SectionIntro eyebrow="Side by side" title={page.glance.title} intro={page.glance.intro} />
      <Reveal className="vs-table"><div role="table" aria-label={page.glance.title}>
        <div className="vs-row vs-row-head" role="row"><span role="columnheader" aria-label="Comparison topic" /><strong role="columnheader" className="is-us">Steps AI</strong><strong role="columnheader">{page.competitor}</strong></div>
        {page.glance.rows.map(row => <div key={row.label} className="vs-row" role="row"><span role="rowheader" className="vs-label">{row.label}</span><p role="cell" className="is-us" data-label="Steps AI">{row.steps}</p><p role="cell" data-label={page.competitor}>{row.them}</p></div>)}
      </div></Reveal>
    </section>

    <section className="sp-section container vs-fit">
      <Reveal className="vs-fit-col is-us"><span className="section-kicker">Steps AI</span><h2>{page.ours.title}</h2><p className="vs-fit-intro">{page.ours.intro}</p><ul>{page.ours.items.map(item => <li key={item.title}><Check size={18} /><div><strong>{item.title}</strong><p>{item.body}</p></div></li>)}</ul></Reveal>
      <Reveal className="vs-fit-col"><span className="section-kicker">{page.competitor}</span><h2>{page.theirs.title}</h2><p className="vs-fit-intro">{page.theirs.intro}</p><ul>{page.theirs.items.map(item => <li key={item.title}><Check size={18} /><div><strong>{item.title}</strong><p>{item.body}</p></div></li>)}</ul></Reveal>
    </section>

    <section className="sp-section container"><SectionIntro eyebrow="Switching" title={page.switching.title} intro={page.switching.intro} /><StepRows items={page.switching.items} /></section>
    <section className="sp-section container"><GoodToKnow title={page.goodToKnow.title} items={page.goodToKnow.items} /></section>
    <Faq title={page.faq.title} items={page.faq.items} />
    <Reveal><CtaBand cta={page.cta} onOpen={onOpen} /></Reveal>
  </>}</SiteFrame>;
}
