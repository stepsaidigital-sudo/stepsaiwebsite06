import type { Metadata } from 'next';
import { HelpFaqsTemplate } from '@/components/templates/help';
import copy from '@/app/copy.json';
import { getChannel, getFeature, getIndustry, getIntegration, getUseCase, listChannels, listFeatures, listIndustries, listIntegrations, listUseCases } from '@/lib/content';

export const metadata: Metadata = {
  title: 'FAQs | Steps AI Help',
  description: 'Answers to common questions about Steps AI agents, channels, integrations, industries and plans.',
};

// Every FAQ already published on the site, grouped by the page it belongs to.
type Faq = { q: string; a: string };
type Source = { hero: { kicker: string }; faq?: { items: Faq[] } } | undefined;
const group = (base: string, slugs: string[], get: (s: string) => Source) => slugs.map(slug => {
  const page = get(slug);
  return page?.faq?.items.length ? { title: page.hero.kicker, href: `/${base}/${slug}/`, items: page.faq.items } : null;
}).filter(Boolean) as { title: string; href: string; items: Faq[] }[];

export default function HelpFaqsRoute() {
  const home = { title: 'General', href: '/#faq', items: copy.faq.items.map(i => ({ q: i.title, a: i.paragraphs.join(' ') })) };
  const groups = [
    home,
    ...group('use-cases', listUseCases(), getUseCase as (s: string) => Source),
    ...group('features', listFeatures(), getFeature as (s: string) => Source),
    ...group('channels', listChannels(), getChannel as (s: string) => Source),
    ...group('industries', listIndustries(), getIndustry as (s: string) => Source),
    ...group('integrations', listIntegrations(), getIntegration as (s: string) => Source),
  ];
  return <HelpFaqsTemplate groups={groups} />;
}
