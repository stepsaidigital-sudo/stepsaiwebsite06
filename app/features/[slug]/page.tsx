import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FeatureTemplate } from '@/components/templates/feature';
import { getFeature, listFeatures } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listFeatures().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getFeature((await params).slug);
  return page ? { title: page.seo.title, description: page.seo.description } : {};
}

export default async function FeatureRoute({ params }: Props) {
  const page = getFeature((await params).slug);
  if (!page) notFound();
  return <FeatureTemplate page={page} />;
}
