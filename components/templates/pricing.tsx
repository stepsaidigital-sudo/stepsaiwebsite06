'use client';
import { useState } from 'react';
import { ArrowRight, Check, Minus, Sparkles } from 'lucide-react';
import { SiteFrame } from '@/components/site/shell';
import { CtaBand, Faq, Reveal } from '@/components/sections';
import type { PricingPage } from '@/content/types';

type Billing = 'monthly' | 'annual';
const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

// Plans, prices and the comparison table follow stepsai.co/pricing exactly (content/pages/pricing.json).
function PlanCard({ plan, billing, onOpen }: { plan: PricingPage['plans'][number]; billing: Billing; onOpen: (l: string) => void }) {
  const price = billing === 'annual' ? plan.annual : plan.monthly;
  return <Reveal className={`pr-plan ${plan.featured ? 'is-featured' : ''}`}>
    <div className="pr-plan-head"><h3>{plan.name}</h3>{plan.badge && <span className="pr-badge">{plan.badge}</span>}</div>
    <p className="pr-plan-for">{plan.for}</p>
    <div className="pr-price" aria-live="polite">
      {billing === 'annual' && plan.monthly && <s>{inr(plan.monthly)}</s>}
      <strong key={billing}>{price ? inr(price) : plan.priceLabel}{price && <small>/mo</small>}</strong>
    </div>
    <span className="pr-credits">{plan.credits}</span>
    <p className="pr-billed">{price ? (billing === 'annual' ? 'per month, billed annually' : 'per month') : 'Talk to sales'}</p>
    <button className="pr-cta" onClick={() => onOpen(plan.cta)}>{plan.cta} <ArrowRight size={16} /></button>
    <ul>{plan.items.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul>
  </Reveal>;
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check size={17} className="pr-yes" aria-label="Included" />;
  if (value === false) return <Minus size={17} className="pr-no" aria-label="Not included" />;
  return <b>{value}</b>;
}

export function PricingTemplate({ page }: { page: PricingPage }) {
  const [billing, setBilling] = useState<Billing>('monthly');
  const featured = page.compare.plans.indexOf(page.plans.find(p => p.featured)?.name ?? '');
  return <SiteFrame>{onOpen => <div className="pr">
    <section className="pr-hero"><div className="container">
      <span className="pr-kicker"><i />{page.hero.kicker}</span>
      <h1>{page.hero.title}</h1>
      <p>{page.hero.body}</p>
      <div className="pr-toggle" role="radiogroup" aria-label="Billing period">
        {(['monthly', 'annual'] as Billing[]).map(b => <button key={b} role="radio" aria-checked={billing === b} className={billing === b ? 'is-on' : ''} onClick={() => setBilling(b)}>
          {b === 'monthly' ? 'Monthly' : <>Annual <em>20% off</em></>}
        </button>)}
      </div>
      <div className="pr-note"><span className="pr-note-ico"><Sparkles size={17} /></span><div><strong>{page.creditNote.title}<span>{page.creditNote.badge}</span></strong><p>{page.creditNote.body}</p></div></div>
    </div></section>

    <section className="container pr-plans">{page.plans.map(plan => <PlanCard key={plan.name} plan={plan} billing={billing} onOpen={onOpen} />)}</section>

    <section className="pr-band"><div className="container">
      <div className="pr-head"><span className="pr-kicker"><i />{page.addons.eyebrow}</span><h2>{page.addons.title}</h2><p>{page.addons.intro}</p></div>
      <div className="pr-packs">{page.addons.packs.map(pack => <Reveal key={pack.credits} className="pr-pack"><strong>{pack.credits}</strong><span>Credits</span><b>{pack.price}</b><small>one-time</small></Reveal>)}</div>
      <p className="pr-foot">{page.addons.note}</p>
      <p className="pr-foot pr-foot-strong">{page.addons.link}</p>
    </div></section>

    <section className="container pr-compare">
      <div className="pr-head"><span className="pr-kicker"><i />{page.compare.eyebrow}</span><h2>{page.compare.title}</h2><p>{page.compare.intro}</p></div>
      <div className="pr-table-wrap" tabIndex={0} aria-label="Plan comparison table, scroll sideways on small screens">
        <table className="pr-table">
          <thead><tr><th scope="col">Feature</th>{page.compare.plans.map((p, i) => <th key={p} scope="col" className={i === featured ? 'is-featured' : ''}>{p}</th>)}</tr></thead>
          {page.compare.groups.map(group => <tbody key={group.title}>
            <tr className="pr-group"><th scope="rowgroup" colSpan={page.compare.plans.length + 1}>{group.title}</th></tr>
            {group.rows.map(([label, values]) => <tr key={label}><th scope="row">{label}</th>{values.map((v, i) => <td key={i} className={i === featured ? 'is-featured' : ''}><Cell value={v} /></td>)}</tr>)}
          </tbody>)}
        </table>
      </div>
    </section>

    <Faq title={page.faq.title} items={page.faq.items} />
    <Reveal><CtaBand cta={page.cta} onOpen={onOpen} /></Reveal>
  </div>}</SiteFrame>;
}
