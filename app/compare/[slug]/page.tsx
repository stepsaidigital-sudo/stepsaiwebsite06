import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CompareTemplate } from '@/components/templates/compare';
import { getCompare, listCompares } from '@/lib/content';

// Routes read /compare/steps-ai-vs-<competitor>/, content is keyed by competitor.
type Props = { params: Promise<{ slug: string }> };
const competitorOf = (slug: string) => slug.replace(/^steps-ai-vs-/, '');

export function generateStaticParams() {
  return listCompares().map(slug => ({ slug: `steps-ai-vs-${slug}` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getCompare(competitorOf((await params).slug));
  return page ? { title: page.seo.title, description: page.seo.description } : {};
}

export default async function CompareRoute({ params }: Props) {
  const { slug } = await params;
  const page = slug.startsWith('steps-ai-vs-') ? getCompare(competitorOf(slug)) : undefined;
  if (!page) notFound();
  return <CompareTemplate page={page} />;
}
