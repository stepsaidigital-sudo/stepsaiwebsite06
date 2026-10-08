'use client';
import { SiteFrame } from '@/components/site/shell';
import { CtaBand, PageHero, Reveal } from '@/components/sections';
import type { ContentPage } from '@/content/types';

// Simple text pages: About now, later Company, Legal and Resources pages.
export function ContentTemplate({ page }: { page: ContentPage }) {
  return <SiteFrame>{onOpen => <>
    <PageHero hero={page.hero} onOpen={onOpen} />
    <section className="sp-section container">{page.sections.map(section => <Reveal key={section.title} className="sp-prose">
      <h2>{section.title}</h2>
      {section.paragraphs.map(text => <p key={text}>{text}</p>)}
      {section.items && <div className="sp-cards sp-belief-cards">{section.items.map((item, i) => <div key={item.title} className="sp-card"><span className="sp-step-number">0{i + 1}</span><h3>{item.title}</h3><p>{item.body}</p></div>)}</div>}
    </Reveal>)}</section>
    <Reveal><CtaBand cta={page.cta} onOpen={onOpen} /></Reveal>
  </>}</SiteFrame>;
}
