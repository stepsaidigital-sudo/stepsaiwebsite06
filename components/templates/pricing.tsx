'use client';
import { Gauge } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { CtaBand, Faq, FeatureList, PageHero, PlanCard, Reveal, SectionIntro } from '@/components/sections';
import type { PricingPage } from '@/content/types';

// The account usage screen, simplified. Illustrative only: no real numbers.
function UsageMock() {
  const meters: [string, number][] = [['Credits', 62], ['Storage', 28], ['Web crawls', 45]];
  return <Reveal className="sp-broadcast sp-usage">
    <div className="mock-window-title"><span className="mock-icon"><Gauge size={19} /></span><div><strong>Usage this month</strong><small>Settings · Illustration</small></div></div>
    <div className="sp-broadcast-body">
      {meters.map(([label, value], i) => <div key={label} className="sp-usage-meter sp-line" style={{ transitionDelay: `${150 + i * 200}ms` }}><span>{label}</span><i style={{ ['--w' as string]: `${value}%` }} /></div>)}
      <div className="sp-usage-models sp-line" style={{ transitionDelay: '800ms' }}>{[['Lighter model', 'Fewer credits per reply'], ['Standard model', 'The default'], ['More capable model', 'More credits per reply']].map(([name, note], i) => <div key={name} className={i === 1 ? 'is-picked' : ''}><strong>{name}</strong><small>{note}</small></div>)}</div>
    </div>
  </Reveal>;
}

export function PricingTemplate({ page }: { page: PricingPage }) {
  return <SiteFrame>{onOpen => <>
    <PageHero hero={page.hero} onOpen={onOpen} />
    <section className="sp-section container"><div className="sp-plans">{page.plans.map(plan => <PlanCard key={plan.name} plan={plan} onOpen={onOpen} />)}</div></section>
    <section className="sp-section container sp-split"><div><SectionIntro eyebrow="Credits" title={page.credits.title} intro={page.credits.intro} /><UsageMock /></div><FeatureList items={page.credits.items} /></section>
    <Faq title={page.faq.title} items={page.faq.items} />
    <Reveal><CtaBand cta={page.cta} onOpen={onOpen} /></Reveal>
  </>}</SiteFrame>;
}
