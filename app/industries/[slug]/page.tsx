import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IndustryTemplate } from '@/components/templates/industry';
import { getIndustry, listIndustries } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listIndustries().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getIndustry((await params).slug);
  return page ? { title: page.seo.title, description: page.seo.description } : {};
}

export default async function IndustryRoute({ params }: Props) {
  const page = getIndustry((await params).slug);
  if (!page) notFound();
  return <IndustryTemplate page={page} />;
}
