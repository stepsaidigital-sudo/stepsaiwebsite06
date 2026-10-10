'use client';
import { Check, Minus } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { CtaBand, Faq, GoodToKnow, PageHero, Reveal, SectionIntro, StepRows } from '@/components/sections';
import type { ComparePage } from '@/content/types';

// Two marks facing each other, with the first table rows ticking in.
function VersusCard({ page }: { page: ComparePage }) {
  return <Reveal className="vs-card" >
    <div className="vs-head">
      <span className="vs-brand is-us"><img src="/brands/steps-original.png" alt="" width={30} height={30} />Steps AI</span>
      <span className="vs-badge">vs</span>
      <span className="vs-brand"><span className="vs-mono" aria-hidden="true">{page.competitor[0]}</span>{page.competitor}</span>
    </div>
    {page.glance.rows.slice(0, 3).map((row, i) => <div key={row.label} className="vs-mini" style={{ animationDelay: `${300 + i * 260}ms` }}>
      <small>{row.label}</small>
      <div><span><Check size={13} />{row.steps}</span><span><Minus size={13} />{row.them}</span></div>
    </div>)}
    <p className="vs-note">Illustration based on public information</p>
  </Reveal>;
}

export function CompareTemplate({ page }: { page: ComparePage }) {
  return <SiteFrame>{onOpen => <>
    <PageHero hero={page.hero} onOpen={onOpen} visual={<VersusCard page={page} />} />

    <section className="sp-section container">
      <SectionIntro eyebrow="Side by side" title={page.glance.title} intro={page.glance.intro} />
      <Reveal className="vs-table" >
        <div className="vs-row vs-row-head" role="row"><span /><strong className="is-us">Steps AI</strong><strong>{page.competitor}</strong></div>
        {page.glance.rows.map(row => <div key={row.label} className="vs-row" role="row"><span className="vs-label">{row.label}</span><p className="is-us" data-label="Steps AI">{row.steps}</p><p data-label={page.competitor}>{row.them}</p></div>)}
      </Reveal>
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
