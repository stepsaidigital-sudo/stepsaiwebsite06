import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FeatureTemplate } from '@/components/templates/feature';
import { BroadcastPageTemplate } from '@/components/templates/broadcast-page';
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
  // WhatsApp broadcast has its own composition, built to the approved reference.
  if (page.slug === 'whatsapp-broadcast') return <BroadcastPageTemplate page={page} />;
  return <FeatureTemplate page={page} />;
}
