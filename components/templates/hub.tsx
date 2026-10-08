'use client';
import { SiteFrame } from '@/components/site/shell';
import { CtaBand, PageHero, RelatedCards, Reveal } from '@/components/sections';
import type { HubPage } from '@/content/types';

// Section overview, such as /industries/. Cards for pages that are not built
// yet open the preview notice.
export function HubTemplate({ page }: { page: HubPage }) {
  return <SiteFrame>{onOpen => <>
    <PageHero hero={page.hero} onOpen={onOpen} />
    <RelatedCards title={`Explore ${page.seo.title.split(' | ')[0].toLowerCase()}.`} items={page.cards} onOpen={onOpen} />
    <Reveal><CtaBand cta={page.cta} onOpen={onOpen} /></Reveal>
  </>}</SiteFrame>;
}
